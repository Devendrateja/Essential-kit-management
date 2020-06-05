import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'

class ClosedFormAPI {
   api

   constructor() {
      this.api = create({
         baseURL: 'https://cf152d619551.ngrok.io/api/essentials_kit_management/'
      })
   }

   getClosedFormAPI(id) {
      return networkCallWithApisauce(this.api, `closed/form/${id}/v1/`, {}, apiMethods.get)
   }
}

export default ClosedFormAPI
