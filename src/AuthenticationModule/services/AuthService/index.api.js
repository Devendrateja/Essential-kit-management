import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'

import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'

class AuthAPI {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://cf152d619551.ngrok.io/api/essentials_kit_management/'
      })
   }

   signInAPI(request) {
      return networkCallWithApisauce(
         this.api,
         'Loginform/v1/',
         request,
         apiMethods.post
      )
      
   }
}

export default AuthAPI
