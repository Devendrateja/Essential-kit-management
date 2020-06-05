import { observable, action, computed } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import ClosedFormModel from '../models/ClosedFormModel'

import { setAccessToken, clearUserSession } from '../../../utils/StorageUtils'


class ClosedFormStore {
   closedFormAPIService
   @observable closedFormList
   @observable getClosedFormAPIStaus
   @observable getClosedFormAPIError
   
   constructor(closedFormAPI){
      this.closedFormAPIService = closedFormAPI
      this.init()
      
   }
   
   @action.bound
   init(){
      this.getClosedFormAPIStaus = API_INITIAL
      this.getClosedFormAPIError = null
      this.closedFormList = []
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
   getClosedFormData(id){
      const promise = this.closedFormAPIService.getClosedFormAPI(id)
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

      return totalData;
   }
   
}



export default ClosedFormStore;