import { observable, action, computed } from 'mobx'

import {
   API_INITIAL,
   APIStatus,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { FormObject } from '../../type'

import FormFixturesService from '../../../services/FormServices/index.fixtures'

import SelectedFormModel from '../SelectedFormModel'
import ClosedFormModel from '../ClosedFormModel'

class Form {
   formsAPI: FormFixturesService
   formId: number
   @observable formName: string
   @observable formStatus: string
   @observable ClosingDate: string
   @observable expectedDeliveryDate: string
   @observable totalItems: number
   @observable totalEstimatedCost: number
   @observable itemsPending: number
   @observable costIncurredForDeliveredItems: number

   @observable getSelectedFormAPIStatus: APIStatus
   @observable getSelectedFormAPIError: Error | null
   @observable selectedFormData!: SelectedFormModel

   @observable getUserSavedDataAPIStatus: APIStatus
   @observable getUserSavedDataAPIError: Error | null

   @observable closedFormList: Array<ClosedFormModel>
   @observable getClosedFormAPIStaus: APIStatus
   @observable getClosedFormAPIError: Error | null

   constructor(formsAPIService: FormFixturesService, form: FormObject) {
      this.formsAPI = formsAPIService
      this.formId = form.form_id
      this.formName = form.form_name
      this.formStatus = form.form_status
      this.ClosingDate = form.close_date
      this.expectedDeliveryDate = form.expected_delivery_date
      this.totalItems = form.items_count
      this.totalEstimatedCost = form.estimated_cost
      this.itemsPending = form.items_pending_count
      this.costIncurredForDeliveredItems =
         form.cost_incurred_for_delivered_items

      this.getSelectedFormAPIStatus = API_INITIAL
      this.getSelectedFormAPIError = null
      this.getUserSavedDataAPIError = null
      this.getUserSavedDataAPIStatus = API_INITIAL

      this.getClosedFormAPIStaus = API_INITIAL
      this.getClosedFormAPIError = null
      this.closedFormList = []
   }

   @action.bound
   setGetSelectedFormAPIStatus(status) {
      this.getSelectedFormAPIStatus = status
   }

   @action.bound
   setGetSelectedFormAPIError(error) {
      this.getSelectedFormAPIError = error
   }

   @action.bound
   setSelectedFormAPIResponse(response) {
      const newSelectedForm = new SelectedFormModel(response)
      this.selectedFormData = newSelectedForm
   }

   @action.bound
   getSelectedFormData(id) {
      const promise = this.formsAPI.getSelectedFormAPI(id)
      return bindPromiseWithOnSuccess(promise)
         .to(this.setGetSelectedFormAPIStatus, this.setSelectedFormAPIResponse)
         .catch(this.setGetSelectedFormAPIError)
   }

   @action.bound
   setUserSavedDataAPIStatus(status) {
      this.getUserSavedDataAPIStatus = status
      console.log('get user saved status', status)
   }

   @action.bound
   setUserSavedDataAPIError(error) {
      this.getUserSavedDataAPIError = error
      console.log('get user saved error', error)
   }

   @action.bound
   setUserSavedDataResponse(response) {
      console.log('userSaved Data ', response)
   }

   @action.bound
   updateUserSelectedFormData(id, data) {
      const promise = this.formsAPI.setSelectedFormAPI(id, data)
      return bindPromiseWithOnSuccess(promise)
         .to(this.setUserSavedDataAPIStatus, this.setUserSavedDataResponse)
         .catch(this.setUserSavedDataAPIError)
   }

   @action.bound
   setGetClosedFormAPIStatus(status) {
      this.getClosedFormAPIStaus = status
   }

   @action.bound
   setGetClosedFormAPIError(error) {
      this.getClosedFormAPIError = error
   }

   @action.bound
   setClosedFormAPIResponse(response) {
      this.closedFormList = response.list_of_items.map(eachItem => {
         const item = new ClosedFormModel(eachItem)
         return item
      })
   }

   @action.bound
   getClosedFormData(id) {
      const promise = this.formsAPI.getClosedFormAPI(id)
      return bindPromiseWithOnSuccess(promise)
         .to(this.setGetClosedFormAPIStatus, this.setClosedFormAPIResponse)
         .catch(this.setGetClosedFormAPIError)
   }

   @computed
   get totalItemsDetailsWithCostIncurred() {
      let totalData = {
         itemsAdded: 0,
         itemsRecieved: 0,
         costIncurred: 0
      }

      this.closedFormList.forEach(eachItem => {
         totalData.itemsAdded += eachItem.itemsAdded
         totalData.itemsRecieved += eachItem.itemsRecieved
         totalData.costIncurred += eachItem.costIncurred
      })
      return totalData
   }
}

export default Form
