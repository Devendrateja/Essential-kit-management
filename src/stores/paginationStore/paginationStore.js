import React from 'react'
import { observable, action, computed } from 'mobx'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'


class PaginationStore {
    paginationAPIService
    EntitiesModel
    @observable currentPage
    @observable total
    @observable limit
    @observable offset
    
    
    @observable paginationStatus
    @observable paginationError
    @observable listOfForms
    @observable pageEntities = new Map()
    
    
    
    constructor(APIService, limit, offset, EntitiesModel){
        this.EntitiesModel = EntitiesModel
        this.paginationAPIService = APIService
        this.limit = limit   
        this.offset = offset
        this.initialiseThePaginationsEntities()
        this.init()
    }
    
    
    @action.bound
    initialiseThePaginationsEntities(){
        this.getPageEntities()
    }

    
    
    @action.bound
    init(){
        this.pageEntities.clear()
        this.listOfForms = []
        this.paginationStatus = API_INITIAL
        this.paginationError = null
        this.currentPage = 1
    }
    
    @action.bound
    setPaginationResponse(response){

        this.total = response.total_forms
        this.listOfForms = response.list_of_forms.map(eachForm => {
            const newForm = new this.EntitiesModel(this.paginationAPIService,eachForm)
            return newForm
        })
        this.pageEntities.set(this.currentPage, this.listOfForms)
    }
    
    
    @action.bound
    setPaginationStatus(status){
        this.paginationStatus = status
        
    }
    
    
    
    @action.bound
    setPaginationError(error){
        this.paginationError = error
        
    }
    
    
    
    
    
    @action.bound
    getPageEntities(){
        const promise = this.paginationAPIService.getFormsAPI(this.limit, this.offset)
        return bindPromiseWithOnSuccess(promise)
        .to(this.setPaginationStatus, this.setPaginationResponse)
        .catch(this.setPaginationError)
        
    }
    
    
    
    
    @action.bound
    goToNextPage(){
        this.currentPage += 1
        this.offset += this.limit
        if(this.pageEntities.has(this.currentPage)){
            this.listOfForms = this.pageEntities.get(this.currentPage)
        }
        else{
            this.getPageEntities(this.offset, this.limit)
        }
        
        
    }
    
    
    @action.bound
    goToPreviousPage(){
        this.currentPage -= 1
        this.offset -= this.limit
        if(this.pageEntities.has(this.currentPage)){
            this.listOfForms = this.pageEntities.get(this.currentPage)
        }
        else{
            this.getPageEntities(this.offset, this.limit)
        }
        
    }
    
    @computed
    get currentPageAndTotalPages(){
      let pages = parseInt(this.total / this.limit)
      let remainingPages = parseInt(this.total % this.limit) <= this.limit ? 1 : 0
      
      const totalNoOfPages = pages + remainingPages
      
      return {
          currentPage : this.currentPage,
          totalPages : totalNoOfPages
      }
    }
    
    
    @action.bound
    clearStore(){
        this.init()
    }
    
}




export default PaginationStore;