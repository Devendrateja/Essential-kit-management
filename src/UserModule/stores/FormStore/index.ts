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

import PaginationStore from '../../../stores/paginationStore'

import Form from '../models/FormModel'
import TransactionModel from '../models/TransactionModel'

import FormFixturesService from '../../services/FormServices/index.fixtures'

import { TransactionsResponse, TransactionUPIResponse } from '../type'

interface PaginationStoreObject {
   paginationStatus: APIStatus
   paginationError: Error | null
   paginationResponse: []
}

class FormStore {
   @observable limit: number = 5
   @observable paginationStore!: PaginationStore

   formsAPIService: FormFixturesService

   @observable upiStatus!: APIStatus
   @observable upiError!: Error | null
   @observable upi!: string

   @observable userPaymentDetailsAPIStatus!: APIStatus
   @observable userPaymentDetailsAPIError!: Error | null
   @observable userPaymentDetailsAPIResponse

   @observable listOfTransactions!: Array<TransactionModel>
   @observable totalAmount!: number
   @observable totalTransactions!: number
   @observable transactionListAPIstatus!: APIStatus
   @observable transactionListAPIError!: Error | null

   constructor(formAPI) {
      this.formsAPIService = formAPI
      this.init()
   }

   @action.bound
   init() {
      this.initialisePaginationStore()

      this.upiStatus = API_INITIAL
      this.upiError = null
      this.upi = ''

      this.userPaymentDetailsAPIStatus = API_INITIAL
      this.userPaymentDetailsAPIError = null
      this.userPaymentDetailsAPIResponse = {}

      this.totalAmount = 0
      this.totalTransactions = 0
      this.listOfTransactions = []
      this.transactionListAPIstatus = API_INITIAL
      this.transactionListAPIError = null
   }

   @action.bound
   setUPIStatus(status) {
      this.upiStatus = status
   }

   @action.bound
   setUPIError(error) {
      this.upiError = error
   }

   @action.bound
   setUPIResponse(response: TransactionUPIResponse | any) {
      this.upi = response.upi_id
   }

   @action.bound
   getPayRequestUPI() {
      const promise = this.formsAPIService.getTransactionUPI()
      return bindPromiseWithOnSuccess(promise)
         .to(this.setUPIStatus, this.setUPIResponse)
         .catch(this.setUPIError)
   }

   @action.bound
   setPaymentStatus(status) {
      this.userPaymentDetailsAPIStatus = status
   }

   @action.bound
   setPaymentResponse(response) {
      this.userPaymentDetailsAPIResponse = response
   }

   @action.bound
   setPaymentError(error) {
      this.userPaymentDetailsAPIError = error
   }

   @action.bound
   sendPaymentData(data) {
      console.log(data)
      const promise = this.formsAPIService.sendTransactionDetails(data)
      return bindPromiseWithOnSuccess(promise)
         .to(this.setPaymentStatus, this.setPaymentResponse)
         .catch(this.setPaymentError)
   }

   @action.bound
   setTransactionsListAPIStatus(status) {
      this.transactionListAPIstatus = status
   }

   @action.bound
   setTransactionsListAPIError(error) {
      this.transactionListAPIError = error
   }

   @action.bound
   setTransactionsListAPIResponse(response: TransactionsResponse | any) {
      this.totalTransactions = response.total_transaction
      this.totalAmount = response.total_amount
      response.transactions.forEach(eachTransaction => {
         const newTransaction = new TransactionModel(eachTransaction)
         this.listOfTransactions.push(newTransaction)
      })
   }

   @action.bound
   getUserTransactions() {
      const promise = this.formsAPIService.getUserTransactionList()
      return bindPromiseWithOnSuccess(promise)
         .to(
            this.setTransactionsListAPIStatus,
            this.setTransactionsListAPIResponse
         )
         .catch(this.setTransactionsListAPIError)
   }

   @action.bound
   initialisePaginationStore() {
      this.paginationStore = new PaginationStore(
         this.formsAPIService,
         this.limit,
         Form
      )
   }
}

export default FormStore
