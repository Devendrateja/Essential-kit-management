import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauceWithAccessToken } from '../../../utils/AuthUtils/AuthUtils'
import { BaseURL } from '../../../utils/BaseURLUtils/URLUtils.js'

type userSignInRequestProps = {
   username: string
   password: string
}

class AuthAPI {
   api!: object
   constructor() {
      this.api = create({
         baseURL: `${BaseURL}`
      })
   }

   signInAPI(request: userSignInRequestProps) {
      return networkCallWithApisauceWithAccessToken(
         this.api,
         'Loginform/v1/',
         request,
         apiMethods.post
      )
   }
}

export default AuthAPI
