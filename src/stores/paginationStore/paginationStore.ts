import React from 'react'
import { observable, action, computed } from 'mobx'
import {
   API_INITIAL,
   APIStatus,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import FormFixturesService from '../../UserModule/services/FormServices/index.fixtures'
import Form from '../../UserModule/stores/models/FormModel'

class PaginationStore {
   paginationAPIService: FormFixturesService
   EntitiesModel: typeof Form
   @observable currentPage!: number
   @observable total!: number
   @observable limit!: number
   @observable offset!: number

   @observable paginationStatus!: APIStatus
   @observable paginationError!: Error | null
   @observable listOfForms!: Array<Form>
   @observable pageEntities = new Map()

   constructor(
      APIService: FormFixturesService,
      limit: number,

      EntitiesModel: typeof Form
   ) {
      this.EntitiesModel = EntitiesModel
      this.paginationAPIService = APIService
      this.limit = limit
      this.offset = 0
      this.initialiseThePaginationsEntities()
      this.init()
   }

   @action.bound
   initialiseThePaginationsEntities() {
      this.getPageEntities()
   }

   @action.bound
   init() {
      this.pageEntities.clear()
      this.listOfForms = []
      this.paginationStatus = API_INITIAL
      this.paginationError = null
      this.currentPage = 1
   }

   @action.bound
   setPaginationResponse(response) {
      this.total = response.total_forms
      this.listOfForms = response.list_of_forms.map(eachForm => {
         const newForm = new this.EntitiesModel(
            this.paginationAPIService,
            eachForm
         )
         return newForm
      })
      this.pageEntities.set(this.currentPage, this.listOfForms)
   }

   @action.bound
   setPaginationStatus(status) {
      console.log('api status in pagination store', status)
      this.paginationStatus = status
   }

   @action.bound
   setPaginationError(error) {
      this.paginationError = error
   }

   @action.bound
   getPageEntities() {
      const promise = this.paginationAPIService.getFormsAPI(
         this.limit,
         this.offset
      )
      return bindPromiseWithOnSuccess(promise)
         .to(this.setPaginationStatus, this.setPaginationResponse)
         .catch(this.setPaginationError)
   }

   @action.bound
   goToNextPage() {
      this.currentPage += 1
      this.offset += this.limit
      if (this.pageEntities.has(this.currentPage)) {
         this.listOfForms = this.pageEntities.get(this.currentPage)
      } else {
         this.getPageEntities()
      }
   }

   @action.bound
   goToPreviousPage() {
      this.currentPage -= 1
      this.offset -= this.limit
      if (this.pageEntities.has(this.currentPage)) {
         this.listOfForms = this.pageEntities.get(this.currentPage)
      } else {
         this.getPageEntities()
      }
   }

   @computed
   get currentPageAndTotalPages() {
      let pages: number = Math.ceil(this.total / this.limit)

      const totalNoOfPages = pages

      return {
         currentPage: this.currentPage,
         totalPages: totalNoOfPages
      }
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export default PaginationStore
