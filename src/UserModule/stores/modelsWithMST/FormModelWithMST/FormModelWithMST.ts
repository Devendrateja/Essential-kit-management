import { types } from 'mobx-state-tree'

import {
   API_INITIAL,
   APIStatus,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import FormFixturesServiceWithMST from '../../../services/FormServices/index.fixtures.mst'
import ClosedFormModelWithMST from '../ClosedFormModelWithMST'
import SelectedFormModelWithMST from '../SelectedFormModelWithMST'
import { CreateSections } from '../SelectedFormModelWithMST/SelectedFormModelWithMST'
import SectionModelWithMST from '../SelectedFormModelWithMST/SectionModelWithMST'
import ItemModel from '../../models/SelectedFormModel/ItemModel'

const FormModelWithMST = types
   .model({
      formsAPI: FormFixturesServiceWithMST,
      formId: types.number,
      formName: types.string,
      formStatus: types.string,
      ClosingDate: types.string,
      expectedDeliveryDate: types.string,
      totalItems: types.number,
      totalEstimatedCost: types.number,
      itemsPending: types.number,
      costIncurredForDeliveredItems: types.number,

      getSelectedFormAPIStatus: types.number,
      getSelectedFormAPIError: types.maybeNull(types.string),
      selectedFormData: SelectedFormModelWithMST,

      getUserSavedDataAPIStatus: types.number,
      getUserSavedDataAPIError: types.maybeNull(types.string),

      closedFormList: types.array(ClosedFormModelWithMST),
      getClosedFormAPIStaus: types.number,
      getClosedFormAPIError: types.maybeNull(types.string)
   })
   .actions(self => {
      return {
         setGetSelectedFormAPIStatus(status) {
            self.getSelectedFormAPIStatus = status
         },

         setGetSelectedFormAPIError(error) {
            self.getSelectedFormAPIError = error
         },
         setSelectedFormAPIResponse(response) {
            const newSelectedForm = SelectedFormModelWithMST.create({
               fromId: response.form_id,
               formName: response.form_name,
               formDescription: response.form_description,
               closeDate: response.close_date,
               totalItems: response.total_items,
               totalCost: response.total_cost,
               sectionDetails: CreateSections(response.sections_details),
               selectedSectionId: 0
            })
            self.selectedFormData = newSelectedForm
         },
         getSelectedFormData(id) {
            const promise = self.formsAPI.getSelectedFormAPI(id)
            return bindPromiseWithOnSuccess(promise)
               .to(
                  this.setGetSelectedFormAPIStatus,
                  this.setSelectedFormAPIResponse
               )
               .catch(this.setGetSelectedFormAPIError)
         },

         setUserSavedDataAPIStatus(status) {
            self.getUserSavedDataAPIStatus = status
            console.log('get user saved status', status)
         },

         setUserSavedDataAPIError(error) {
            self.getUserSavedDataAPIError = error
            console.log('get user saved error', error)
         },

         setUserSavedDataResponse(response) {
            console.log('userSaved Data ', response)
         },

         updateUserSelectedFormData(id, data) {
            const promise = self.formsAPI.setSelectedFormAPI(id, data)
            return bindPromiseWithOnSuccess(promise)
               .to(
                  this.setUserSavedDataAPIStatus,
                  this.setUserSavedDataResponse
               )
               .catch(this.setUserSavedDataAPIError)
         },

         setGetClosedFormAPIStatus(status) {
            self.getClosedFormAPIStaus = status
         },

         setGetClosedFormAPIError(error) {
            self.getClosedFormAPIError = error
         },

         setClosedFormAPIResponse(response) {
            self.closedFormList = response.list_of_items.map(eachItem => {
               const item = ClosedFormModelWithMST.create({
                  itemId: eachItem.item_id,
                  itemName: eachItem.item_name,
                  itemsAdded: eachItem.items_added,
                  itemsRecieved: eachItem.items_recieved,
                  costIncurred: eachItem.cost_incurred
               })
               return item
            })
         },

         getClosedFormData(id) {
            const promise = self.formsAPI.getClosedFormAPI(id)
            return bindPromiseWithOnSuccess(promise)
               .to(
                  this.setGetClosedFormAPIStatus,
                  this.setClosedFormAPIResponse
               )
               .catch(this.setGetClosedFormAPIError)
         }
      }
   })
   .views(self => {
      return {
         get totalItemsDetailsWithCostIncurred() {
            let totalData = {
               itemsAdded: 0,
               itemsRecieved: 0,
               costIncurred: 0
            }

            self.closedFormList.forEach(eachItem => {
               totalData.itemsAdded += eachItem.itemsAdded
               totalData.itemsRecieved += eachItem.itemsRecieved
               totalData.costIncurred += eachItem.costIncurred
            })
            return totalData
         }
      }
   })

export default FormModelWithMST
