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

   @observable getUserSavedDataAPIStatus
   @observable getUserSavedDataAPIError

   constructor(APIService) {
      this.SelectedformAPIService = APIService
      this.init()
   }

   @action.bound
   init() {
      this.getSelectedFormAPIStatus = API_INITIAL
      this.getSelectedFormAPIError = null

      this.getUserSavedDataAPIError = null
      this.getUserSavedDataAPIStatus = API_INITIAL
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

   @action.bound
   setUserSavedDataAPIStatus(status) {
      console.log('response of saved data status', status)
      this.getUserSavedDataAPIStatus = status
   }

   @action.bound
   setUserSavedDataAPIError(error) {
      console.log('response of saved data error', error)
      this.getUserSavedDataAPIError = error
   }

   @action.bound
   setUserSavedDataAPIResponse(response) {
      console.log('response of saved data', response)
   }

   @action.bound
   updateUserSelectedFormData(id, data) {
      const promise = this.SelectedformAPIService.setSelectedFormAPI(id, data)
      return bindPromiseWithOnSuccess(promise)
         .to(this.setUserSavedDataAPIStatus, this.setUserSavedDataAPIResponse)
         .catch(this.setUserSavedDataAPIError)
   }
}

export default SelectedFormStore