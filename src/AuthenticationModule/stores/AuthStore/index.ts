import { observable, action } from 'mobx'

import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import AuthFixturesService from '../../services/FixturesService/index.fixtures'

import {
   setAccessToken,
   clearUserSession,
   getAccessToken
} from '../../../utils/StorageUtils'

type userSignInRequestProps = {
   username: string
   password: string
}

interface APIResponseProps {
   access_token: string
}

class AuthStore {
   authAPIService: AuthFixturesService
   @observable getUserSignInAPIStatus!: number
   @observable getUserSignInAPIError!: string | null

   constructor(authAPIService: AuthFixturesService) {
      this.authAPIService = authAPIService
      this.init()
   }

   @action.bound
   init() {
      this.getUserSignInAPIStatus = API_INITIAL
      this.getUserSignInAPIError = null
   }

   @action.bound
   setUserSignInAPIStatus(status: number) {
      this.getUserSignInAPIStatus = status
   }

   @action.bound
   setUserSignInAPIError(error: string) {
      this.getUserSignInAPIError = error
   }
   @action.bound
   setUserSignInAPIResponse(response: any) {
      setAccessToken(response.access_token.length > 0 && response.access_token)
   }

   @action.bound
   userSignIn(
      request: userSignInRequestProps,
      onSuccess: () => void,
      onFailure: () => void
   ) {
      const userSignInAPIPromise = this.authAPIService.signInAPI(request)
      return bindPromiseWithOnSuccess(userSignInAPIPromise)
         .to(this.setUserSignInAPIStatus, response => {
            this.setUserSignInAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setUserSignInAPIError(error)
            onFailure()
         })
   }

   @action.bound
   userSignOut() {
      clearUserSession()
      this.init()
   }

   @action.bound
   isLoggedIn() {
      const access_token = getAccessToken()
      return access_token !== undefined || access_token !== undefined
         ? true
         : false
   }
}

export default AuthStore
