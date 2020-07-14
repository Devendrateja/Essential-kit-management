import { types, getEnv } from 'mobx-state-tree'
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

import FormFixturesServiceWithMST from '../../UserModule/services/FormServices/index.fixtures.mst'
import FormModelWithMST from '../../UserModule/stores/modelsWithMST/FormModelWithMST'

const PaginationStoreWithMST = types
   .model({
      paginationAPIService: FormFixturesServiceWithMST,
      currentPage: types.number,
      total: types.number,
      limit: types.number,
      offset: types.number,
      paginationStatus: types.number,
      paginationError: types.maybeNull(types.string),
      listOfForms: types.array(FormModelWithMST),
      pageEntities: types.map(types.array(FormModelWithMST))
   })
   .actions(self => ({
      initialiseThePaginationsEntities() {
         this.getPageEntities()
      },
      init() {
         self.pageEntities.clear()
         //@ts-ignore
         self.listOfForms = []
         self.paginationStatus = API_INITIAL
         self.paginationError = null
         self.currentPage = 1
         self.total = 0
      },
      setPaginationResponse(response) {
         self.total = response.total_forms
         self.listOfForms = response.list_of_forms.map(eachForm => {
            const newForm = getEnv(self).EntitiesModel.create({
               formsAPI: self.paginationAPIService,
               formId: eachForm.form_id,
               formName: eachForm.form_name,
               formStatus: eachForm.form_status,
               ClosingDate: eachForm.close_date,
               expectedDeliveryDate: eachForm.expected_delivery_date,
               totalItems: eachForm.items_count,
               totalEstimatedCost: eachForm.estimated_cost,
               itemsPending: eachForm.items_pending_count,
               costIncurredForDeliveredItems:
                  eachForm.cost_incurred_for_delivered_items,
               getSelectedFormAPIStatus: API_INITIAL,
               getSelectedFormAPIError: null,
               selectedFormData: {},
               getUserSavedDataAPIStatus: API_INITIAL,
               getUserSavedDataAPIError: null,
               closedFormList: [],
               getClosedFormAPIStaus: API_INITIAL,
               getClosedFormAPIError: null
            })
            return newForm
         })
         self.pageEntities.set(`${self.currentPage}`, self.listOfForms)
      },
      setPaginationStatus(status) {
         console.log('api status in pagination store', status)
         self.paginationStatus = status
      },
      setPaginationError(error) {
         self.paginationError = error
      },
      getPageEntities() {
         const promise = self.paginationAPIService.getFormsAPI(
            self.limit,
            self.offset
         )
         return bindPromiseWithOnSuccess(promise)
            .to(this.setPaginationStatus, this.setPaginationResponse)
            .catch(this.setPaginationError)
      },
      goToNextPage() {
         self.currentPage += 1
         self.offset += self.limit
         if (self.pageEntities.has(`${self.currentPage}`)) {
            const entities = self.pageEntities.get(`${self.currentPage}`)
            if (entities) self.listOfForms = entities
         } else {
            this.getPageEntities()
         }
      },
      goToPreviousPage() {
         self.currentPage -= 1
         self.offset -= self.limit
         if (self.pageEntities.has(`${self.currentPage}`)) {
            const entities = self.pageEntities.get(`${self.currentPage}`)
            if (entities) self.listOfForms = entities
         } else {
            this.getPageEntities()
         }
      },
      clearStore() {
         this.init()
      }
   }))
   .views(self => ({
      get currentPageAndTotalPages() {
         let pages: number = Math.ceil(self.total / self.limit)

         const totalNoOfPages = pages

         return {
            currentPage: self.currentPage,
            totalPages: totalNoOfPages
         }
      }
   }))

export default PaginationStoreWithMST
