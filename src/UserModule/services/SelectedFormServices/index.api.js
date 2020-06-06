import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { BaseURL } from '../../../utils/BaseURLUtils/URLUtils.js'

class SelectedFormAPI {
   api

   constructor() {
      this.api = create({
         baseURL: `${BaseURL}`
      })
   }
   getSelectedFormAPI(id) {
      return networkCallWithApisauce(
         this.api,
         `form/${id}/v1/`,
         {},
         apiMethods.get
      )
   }

   setSelectedFormAPI(id, data) {
      console.log(data,id)
      return networkCallWithApisauce(
         this.api,
         `form/${id}/v1/`,
         data,
         apiMethods.post
      )
   }
}

export default SelectedFormAPI
