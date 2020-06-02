import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'

import getSelectedFormResponse from '../../fixtures/getSelectedFormResponse.json'

class SelectedFormAPI {
   api

   constructor() {
      this.api = create({
         baseURL: ''
      })
   }
   getSelectedFormAPI() {
      return networkCallWithApisauce(this.api, '', {}, apiMethods.get)
   }
}

export default SelectedFormAPI
