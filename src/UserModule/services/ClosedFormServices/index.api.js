import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'

class ClosedFormAPI {
   api

   constructor() {
      this.api = create({
         baseURL: ''
      })
   }

   getClosedFormAPI() {
      return networkCallWithApisauce(this.api, '', {}, apiMethods.get)
   }
}

export default ClosedFormAPI
