import { types } from 'mobx-state-tree'
import {
   API_INITIAL,
   APIStatus,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import PaginationStoreWithMST from '../../../stores/PaginationStoreWithMST'

import FormModelWithMST from '../modelsWithMST/FormModelWithMST'
import TransactionModelWithMST from '../FormStoreWithMST'

import FormFixturesServiceWithMST from '../../services/FormServices/index.fixtures.mst'

//import { TransactionsResponse, TransactionUPIResponse } from '../type'

const TransactionModelType = types.model({
   transactionDate: types.string,
   amount: types.number,
   status: types.string,
   remarks: types.string
})

const FormStoreWithMST = types
   .model({
      limit: types.number,
      paginationStore: PaginationStoreWithMST,
      formsAPIService: FormFixturesServiceWithMST,
      upiStatus: types.number,
      upiError: types.maybeNull(types.string),
      upi: types.string,
      userPaymentDetailsAPIStatus: types.number,
      userPaymentDetailsAPIError: types.maybeNull(types.string),
      userPaymentDetailsAPIResponse: types.null,
      listOfTransactions: types.maybeNull(types.array(TransactionModelWithMST)),
      totalAmount: types.number,
      totalTransactions: types.number,
      transactionListAPIstatus: types.number,
      transactionListAPIError: types.maybeNull(types.string)
   })
   .actions(self => ({
      init() {
         self.upiStatus = API_INITIAL
         self.upiError = null
         self.upi = ''
         self.userPaymentDetailsAPIStatus = API_INITIAL
         self.userPaymentDetailsAPIError = null
         self.totalAmount = 0
         self.totalTransactions = 0
         self.listOfTransactions = null
         self.transactionListAPIstatus = API_INITIAL
         self.transactionListAPIError = null
      },
      setUPIStatus(status) {
         self.upiStatus = status
      },
      setUPIError(error) {
         self.upiError = error
      },
      setUPIResponse(response) {
         self.upi = response.upi_id
      },
      getPayRequestUPI() {
         const promise = self.formsAPIService.getTransactionUPI()
         return bindPromiseWithOnSuccess(promise)
            .to(this.setUPIStatus, this.setUPIResponse)
            .catch(this.setUPIError)
      },
      setPaymentStatus(status) {
         self.userPaymentDetailsAPIStatus = status
      },
      setPaymentResponse(response) {
         self.userPaymentDetailsAPIResponse = response
      },
      setPaymentError(error) {
         self.userPaymentDetailsAPIError = error
      },
      sendPaymentData(data) {
         console.log(data)
         const promise = self.formsAPIService.sendTransactionDetails(data)
         return bindPromiseWithOnSuccess(promise)
            .to(this.setPaymentStatus, this.setPaymentResponse)
            .catch(this.setPaymentError)
      },
      setTransactionsListAPIStatus(status) {
         self.transactionListAPIstatus = status
      },
      setTransactionsListAPIError(error) {
         self.transactionListAPIError = error
      },
      setTransactionsListAPIResponse(response) {
         self.totalTransactions = response.total_transaction
         self.totalAmount = response.total_amount
         response.transactions.forEach(eachTransaction => {
            const newTransaction = TransactionModelWithMST.create({
               transactionDate: eachTransaction.transaction_date,
               amount: eachTransaction.amount,
               status: eachTransaction.status,
               remarks: eachTransaction.remarks
            })
            if (self.listOfTransactions)
               self.listOfTransactions.push(newTransaction)
         })
      },
      getUserTransactions() {
         const promise = self.formsAPIService.getUserTransactionList()
         return bindPromiseWithOnSuccess(promise)
            .to(
               this.setTransactionsListAPIStatus,
               this.setTransactionsListAPIResponse
            )
            .catch(this.setTransactionsListAPIError)
      },
      initialisePaginationStore() {
         self.paginationStore = PaginationStoreWithMST.create(
            {
               paginationAPIService: self.formsAPIService,
               limit: self.limit,
               total: 0,
               offset: 0,
               paginationStatus: 0,
               paginationError: null,
               listOfForms: [],
               currentPage: 1,
               pageEntities: {}
            },
            {
               EntitiesModel: FormModelWithMST
            }
         )
      }
   }))

export default FormStoreWithMST
