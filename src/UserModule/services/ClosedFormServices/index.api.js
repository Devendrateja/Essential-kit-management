import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { BaseURL } from '../../../utils/BaseURLUtils/URLUtils.js'

class ClosedFormAPI {
   api

   constructor() {
      this.api = create({
         baseURL: `${BaseURL}`
      })
   }

   getClosedFormAPI(id) {
      return networkCallWithApisauce(
         this.api,
         `closed/form/${id}/v1/`,
         {},
         apiMethods.get
      )
   }
}

export default ClosedFormAPI
