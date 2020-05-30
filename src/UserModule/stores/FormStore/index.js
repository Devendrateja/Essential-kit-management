import { observable, action, computed } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import getUserResponse from '../../fixtures/getUserResponse.json'
import Form from '../models/FormModel'
import { setAccessToken, clearUserSession } from '../../../utils/StorageUtils'

class FormStore {
   formsAPIService
   @observable getFormsAPIStatus
   @observable getFormsAPIError
   @observable listOfForms

   constructor(formAPI) {
      this.formsAPIService = formAPI
      this.init()
   }

   @action.bound
   init() {
      this.getFormsAPIStatus = API_INITIAL
      this.getFormsAPIError = null
      this.listOfForms = []
   }

   @action.bound
   setGetFormsAPIStatus(status) {
      console.log('status', status)
      this.getFormsAPIStatus = status
   }

   @action.bound
   setGetFormsAPIError(error) {
      this.getFormsAPIError = error
   }

   @action.bound
   setFormsAPIResponse(response) {
      console.log('response from fixtures', response)
      this.listOfForms = response
   }

   @action.bound
   getFormsList() {
      const promise = this.formsAPIService.getFormsAPI()
      return bindPromiseWithOnSuccess(promise)
         .to(this.setGetFormsAPIStatus, this.setFormsAPIResponse)
         .catch(this.setGetFormsAPIError)
   }

   @action.bound
   createFormComponent(form) {
      let newForm = new Form(form)
      return newForm
   }
}

export default FormStore