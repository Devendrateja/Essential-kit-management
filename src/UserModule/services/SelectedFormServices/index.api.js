import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'

import getSelectedFormResponse from '../../fixtures/getSelectedFormResponse.json'

class SelectedFormAPI {
   api

   constructor() {
      this.api = create({
         baseURL: 'https://cf152d619551.ngrok.io/api/essentials_kit_management/'
      })
   }
   getSelectedFormAPI(id) {
      return networkCallWithApisauce(this.api, `form/${id}/v1`, {}, apiMethods.get)
   }
   
   setSelectedFormAPI(id,data) {
      return networkCallWithApisauce(this.api, `form/${id}/v1`, data, apiMethods.post)
   }
}

export default SelectedFormAPI
