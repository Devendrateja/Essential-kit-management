import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauceWithAccessToken } from '../../../utils/AuthUtils/AuthUtils'
import { BaseURL } from '../../../utils/BaseURLUtils/URLUtils.js'

class AuthAPI {
   api
   constructor() {
      this.api = create({
         baseURL: `${BaseURL}`
      })
   }

   signInAPI(request) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         'Loginform/v1/',
         request,
         apiMethods.post
      )
   }
}

export default AuthAPI
