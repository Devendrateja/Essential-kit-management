import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { BaseURL } from '../../../utils/BaseURLUtils/URLUtils.js'

class FormAPI {
   api

   constructor() {
      this.api = create({
         baseURL: `${BaseURL}`
      })
   }

   getFormsAPI(limit, offset) {
      return networkCallWithApisauce(
         this.api,
         `homepage/v1/?offset=${offset}&limit=${limit}`,
         {},
         apiMethods.get
      )
   }

   getTransactionUPI() {
      return networkCallWithApisauce(this.api, 'getbankdetails/v1/', {}, apiMethods.get)
   }
   
   sendTransactionDetails(data){
      return networkCallWithApisauce(this.api, 'payrequest/v1/', data, apiMethods.post)
   }
   
   
   getUserTransactionList(){
      return networkCallWithApisauce(this.api, 'transactions/v1/', {}, apiMethods.get)
   }
   
   
   
}

export default FormAPI
