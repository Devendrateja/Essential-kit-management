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

import getUserResponse from '../../fixtures/getUserResponse.json'

import Form from '../models/FormModel'
import TransactionModel from "../models/TransactionModel"

import { setAccessToken, clearUserSession } from '../../../utils/StorageUtils'

class FormStore {
   formsAPIService
   @observable getFormsAPIStatus
   @observable getFormsAPIError
   @observable listOfForms
   @observable totalNoOfForms



   @observable upiStatus
   @observable upiError
   @observable upi
   
   
   
   
   @observable listOfTransactions
   @observable totalAmount
   @observable totalTransactions
   
   
   
   
   constructor(formAPI) {
      this.formsAPIService = formAPI
      this.init()
   }

   @action.bound
   init() {
      this.getFormsAPIStatus = API_INITIAL
      this.getFormsAPIError = null
      this.listOfForms = []
      
      
      
      this.listOfTransactions = []
      this.totalAmount = 0
      this.totalTransactions = 0

   }





   @action.bound
   setGetFormsAPIStatus(status) {
      this.getFormsAPIStatus = status
   }

   @action.bound
   setGetFormsAPIError(error) {
      this.getFormsAPIError = error
   }

   @action.bound
   setFormsAPIResponse(response) {
      this.listOfForms = response.list_of_forms
      this.totalNoOfForms = response.total_forms
   }

   @action.bound
   getFormsList(limit, offset) {
      const promise = this.formsAPIService.getFormsAPI(limit, offset)
      return bindPromiseWithOnSuccess(promise)
         .to(this.setGetFormsAPIStatus, this.setFormsAPIResponse)
         .catch(this.setGetFormsAPIError)
   }

   @action.bound
   createFormComponent(form) {
      let newForm = new Form(form)
      return newForm
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
      console.log("upi_id",response)
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
      console.log(status)
   }


   @action.bound
   setPaymentResponse(response) {
      console.log("rdtfghgfdsdfghfd",response)
   }


   @action.bound
   setPaymentError(error) {
      console.log(error)
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
      console.log(status)
   }
   
   
   @action.bound
   setTransactionsListAPIError(error){
      
      console.log(error)
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









}

export default FormStore
