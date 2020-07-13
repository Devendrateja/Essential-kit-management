import { types } from 'mobx-state-tree'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import CounterStore from './CounterStore'
import AuthStore from '../AuthenticationModule/stores/AuthStore'
import AuthAPI from '../AuthenticationModule/services/AuthService/index.api'
import AuthFixturesService from '../AuthenticationModule/services/FixturesService/index.fixtures'
import AuthMSTFixturesService from '../AuthenticationModule/services/FixturesService/index.fixture.mst'
import AuthStoreWithMST from '../AuthenticationModule/stores/AuthStoreWithMST'

import FormFixturesService from '../UserModule/services/FormServices/index.fixtures'
import FormAPI from '../UserModule/services/FormServices/index.api'
import FormStore from '../UserModule/stores/FormStore'

let isFixtures = true

const counterStore = new CounterStore()

const authAPI: AuthFixturesService = isFixtures
   ? new AuthFixturesService()
   : new AuthAPI()
const authStore = new AuthStore(authAPI)

const formAPI = isFixtures ? new FormFixturesService() : new FormAPI()
const formStore = new FormStore(formAPI)

const AuthStoreWithService = types
   .compose(AuthStoreWithMST, AuthMSTFixturesService)
   .actions(self => {
      return {
         userSignIn(request, onSuccess, onFailure) {
            const userSignInAPIPromise = self.signInAPI(request)
            return bindPromiseWithOnSuccess(userSignInAPIPromise)
               .to(self.setUserSignInAPIStatus, response => {
                  self.setUserSignInAPIResponse(response)
                  onSuccess()
               })
               .catch(error => {
                  self.setUserSignInAPIError(error)
                  onFailure()
               })
         }
      }
   })

const authStoreWithMST = AuthStoreWithService.create({
   getUserSignInAPIStatus: 0,
   getUserSignInAPIError: null
})

export default {
   counterStore,
   authStore,
   formStore,
   authStoreWithMST
}
