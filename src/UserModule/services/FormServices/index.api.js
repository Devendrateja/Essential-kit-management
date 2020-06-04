import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'

class FormAPI {
   api

   constructor() {
      this.api = create({
         baseURL: 'https://87f6106585e7.ngrok.io/api/essentials_kit_management/'
      })
   }

   getFormsAPI(limit,offset) {
      return networkCallWithApisauce(this.api, `homepage/v1/?offset=${offset}&limit=${limit}`, {}, apiMethods.get)
   }
}

export default FormAPI
