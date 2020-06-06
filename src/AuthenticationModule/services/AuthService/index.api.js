import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { BaseURL } from '../../../utils/BaseURLUtils/URLUtils.js'
import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'

class AuthAPI {
   api
   constructor() {
      this.api = create({
         baseURL: `${BaseURL}`
      })
   }

   signInAPI(request) {
      console.log('request', request)
      return networkCallWithApisauce(
         this.api,
         'Loginform/v1/',
         request,
         apiMethods.post
      )
   }
}

export default AuthAPI
