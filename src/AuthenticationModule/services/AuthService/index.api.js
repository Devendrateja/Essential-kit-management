import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'

import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'

class AuthAPI {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
      })
   }

   async signInAPI(request) {
      await networkCallWithApisauce(
         this.api,
         'v1/signin/',
         request,
         apiMethods.get
      )
      return getUserSignInResponse
   }
}

export default AuthAPI
