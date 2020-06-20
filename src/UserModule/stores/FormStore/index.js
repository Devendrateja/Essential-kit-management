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
import { Redirect } from 'react-router-dom'

import PaginationStore from "../../../stores/paginationStore"

import getUserResponse from '../../fixtures/getUserResponse.json'

import Form from '../models/FormModel'
import TransactionModel from "../models/TransactionModel"

import { setAccessToken, clearUserSession } from '../../../utils/StorageUtils'

class FormStore {
   @observable paginationStore
   
   formsAPIService
   
   @observable getFormsAPIStatus
   @observable getFormsAPIError
   @observable listOfForms
   @observable totalNoOfForms



   @observable upiStatus
   @observable upiError
   @observable upi
   
   @observable userPaymentDetailsAPIStatus
   @observable userPaymentDetailsAPIError
   @observable userPaymentDetailsAPIResponse
   
   
   
   
   
   @observable listOfTransactions
   @observable totalAmount
   @observable totalTransactions
   @observable transactionListAPIstatus
   @observable transactionListAPIError
   
   
   
   
   constructor(formAPI) {
      this.formsAPIService = formAPI
      this.init()
   }

   @action.bound
   init() {
      this.paginationStore = {
         paginationStatus : API_INITIAL,
         paginationError : null,
         paginationResponse : []
      }
      
      this.getFormsAPIStatus = API_INITIAL
      this.getFormsAPIError = null
      this.listOfForms = []
      
      
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
   setUPIResponse(response) {
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
   setTransactionsListAPIStatus(status){
      this.transactionListAPIstatus = status
   }
   
   
   @action.bound
   setTransactionsListAPIError(error){
      this.transactionListAPIError = error
   }
   
   
   
   
   @action.bound
   setTransactionsListAPIResponse(response){
      this.totalTransactions = response.total_transaction
      this.totalAmount = response.total_amount
      response.transactions.forEach(eachTransaction => {
         const newTransaction = new TransactionModel(eachTransaction)
         this.listOfTransactions.push(newTransaction)  
      })
      
   }
   
   

   

   @action.bound
   getUserTransactions(){
      const promise = this.formsAPIService.getUserTransactionList()
      return bindPromiseWithOnSuccess(promise)
         .to(this.setTransactionsListAPIStatus, this.setTransactionsListAPIResponse)
         .catch(this.setTransactionsListAPIError)
   }
   
   
   
   
   
   
   
   
   
   
   
   
   @action.bound
   initialisePaginationStore(limit, offset){
            this.paginationStore = new PaginationStore(this.formsAPIService, limit, offset, Form )
   }


}

export default FormStore
