import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'

import getUserResponse from '../../fixtures/getUserResponse.json'

class FormAPI {
   api

   constructor() {
      this.api = create({
         baseURL: ''
      })
   }

   async getFormsAPI() {
      console.log('network call')
      await networkCallWithApisauce(this.api, '', {}, apiMethods.get)
      return getUserResponse
   }
}

export default FormAPI
