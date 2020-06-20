import { observable, action } from 'mobx'

import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { setAccessToken, clearUserSession, getAccessToken } from '../../../utils/StorageUtils'


class AuthStore {
   authAPIService
   @observable getUserSignInAPIStatus
   @observable getUserSignInAPIError
   

   constructor(authAPIService) {
      this.authAPIService = authAPIService
      this.init()
   }

   @action.bound
   init() {
      this.getUserSignInAPIStatus = API_INITIAL
      this.getUserSignInAPIError = null
   }

   @action.bound
   setUserSignInAPIStatus(status) {
      this.getUserSignInAPIStatus = status
   }

   @action.bound
   setUserSignInAPIError(error) {
      this.getUserSignInAPIError = error
   }
   @action.bound
   setUserSignInAPIResponse(response) {
      console.log(response)
      setAccessToken(response.access_token.length > 0 && response.access_token)
   }

   @action.bound
   userSignIn(request, onSuccess, onFailure) {
      const userSignInAPIPromise = this.authAPIService.signInAPI(request)
      return bindPromiseWithOnSuccess(userSignInAPIPromise)
         .to(this.setUserSignInAPIStatus, response => {
            this.setUserSignInAPIResponse(response);
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
   isLoggedIn(){
      const access_token = getAccessToken()
      return access_token !== undefined || access_token !== undefined ? true : false
   }
   
}

export default AuthStore
