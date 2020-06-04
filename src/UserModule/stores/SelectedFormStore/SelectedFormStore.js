import { observable, action, computed } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import getSelectedFormResponse from '../../fixtures/getSelectedFormResponse.json'

import SelectedFormModel from '../models/SelectedFormModel'

import { setAccessToken, clearUserSession } from '../../../utils/StorageUtils'

class SelectedFormStore {
   SelectedformAPIService
   @observable getSelectedFormAPIStatus
   @observable getSelectedFormAPIError
   @observable selectedFormData

   constructor(APIService) {
      this.SelectedformAPIService = APIService
      this.init()
   }

   @action.bound
   init() {
      this.getSelectedFormAPIStatus = API_INITIAL
      this.getSelectedFormAPIError = null
   }

   @action.bound
   setGetSelectedFormAPIStatus(status) {
      this.getSelectedFormAPIStatus = status
      console.log('selectedform api status', status)
   }

   @action.bound
   setGetSelectedFormAPIError(error) {
      this.getSelectedFormAPIError = error
      console.log('selectedform api error', error)
   }

   @action.bound
   setSelectedFormAPIResponse(response) {
      const newSelectedForm = new SelectedFormModel(response)
      this.selectedFormData = newSelectedForm
      console.log(
         'selectedform api response',
         newSelectedForm,
         this.selectedFormData
      )
   }

   @action.bound
   getSelectedFormData(id) {
      const promise = this.SelectedformAPIService.getSelectedFormAPI(id)
      return bindPromiseWithOnSuccess(promise)
         .to(this.setGetSelectedFormAPIStatus, this.setSelectedFormAPIResponse)
         .catch(this.setGetSelectedFormAPIError)
   }
}

export default SelectedFormStore
