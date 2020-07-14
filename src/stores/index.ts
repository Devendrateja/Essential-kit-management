import { types } from 'mobx-state-tree'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import CounterStore from './CounterStore'
import AuthStore from '../AuthenticationModule/stores/AuthStore'
import AuthAPI from '../AuthenticationModule/services/AuthService/index.api'
import AuthFixturesService from '../AuthenticationModule/services/FixturesService/index.fixtures'
import AuthMSTFixturesService from '../AuthenticationModule/services/FixturesService/index.fixture.mst'
import AuthStoreWithMST from '../AuthenticationModule/stores/AuthStoreWithMST'

import PaginationStoreWithMST from './PaginationStoreWithMST'
import FormFixturesService from '../UserModule/services/FormServices/index.fixtures'
import FormAPI from '../UserModule/services/FormServices/index.api'
import FormStore from '../UserModule/stores/FormStore'
import FormFixturesServiceWithMST from '../UserModule/services/FormServices/index.fixtures.mst'
import FormStoreWithMST from '../UserModule/stores/FormStoreWithMST'
import { API_INITIAL } from '@ib/api-constants'

let isFixtures = true

const counterStore = new CounterStore()

const authAPI: AuthFixturesService = isFixtures
   ? new AuthFixturesService()
   : new AuthAPI()
const authStore = new AuthStore(authAPI)

const formAPI = isFixtures ? new FormFixturesService() : new FormAPI()
const formStore = new FormStore(formAPI)

const formStoreWithMST = FormStoreWithMST.create({
   limit: 5,
   paginationStore: PaginationStoreWithMST,
   formsAPIService: FormFixturesServiceWithMST,
   upiStatus: API_INITIAL,
   upiError: null,
   upi: '',
   userPaymentDetailsAPIStatus: API_INITIAL,
   userPaymentDetailsAPIError: null,
   userPaymentDetailsAPIResponse: null,
   listOfTransactions: null,
   totalAmount: types.number,
   totalTransactions: types.number,
   transactionListAPIstatus: types.number,
   transactionListAPIError: types.maybeNull(types.string)
})

//formStoreWithMST.initialisePaginationStore()

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
   authStoreWithMST,
   formStoreWithMST
}
