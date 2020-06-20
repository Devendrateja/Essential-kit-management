/*global jest*/
/*global expect*/
/*global mockSetCookie*/

import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import getUserResponse from '../../fixtures/getUserResponse.json'
import getTransactionUPI from "../../fixtures/getTransactionUPI.json"
import getTransactions from "../../fixtures/getTransactions.json"
import FormAPI from '../../services/FormServices/index.api.js'

import FormStore from '.'

import '@testing-library/jest-dom/extend-expect'

import Cookie from 'js-cookie'

let mockSetCookie = jest.fn()
let mockRemoveCookie = jest.fn()
let mockGetCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie
Cookie.get = mockGetCookie

global.mockSetCookie = mockSetCookie
global.mockRemoveCookie = mockRemoveCookie
global.mockGetCookie = mockGetCookie

describe('Form store tests', () => {
   let formAPI
   let formStore

   beforeEach(() => {
      formAPI = new FormAPI()
      formStore = new FormStore(formAPI)
   })

   it('should test the initialising of the FormStore', () => {
      expect(formStore.getFormsAPIStatus).toBe(API_INITIAL)
      expect(formStore.getFormsAPIError).toBe(null)
      expect(formStore.listOfForms).toEqual([])
      
      expect(formStore.upiStatus).toBe(API_INITIAL)
      expect(formStore.upiError).toBe(null)
      expect(formStore.upi).toBe('')
      
      
      expect(formStore.userPaymentDetailsAPIStatus).toBe(API_INITIAL)
      expect(formStore.userPaymentDetailsAPIError).toBe(null)
      expect(formStore.userPaymentDetailsAPIResponse).toEqual({})
      
      
      
      expect(formStore.listOfTransactions).toEqual([])
      expect(formStore.totalAmount).toBe(0)
      expect(formStore.totalTransactions).toBe(0)
      expect(formStore.transactionListAPIstatus).toBe(API_INITIAL)
      expect(formStore.transactionListAPIError).toBe(null)
   })

   it('should test the FormStore forms API status to be in fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockLoadingPromise)
      formAPI.getFormsAPI = mockFormAPI

      formStore.getFormsList()
      expect(formStore.getFormsAPIStatus).toBe(API_FETCHING)
   })

   it('should test the FormStore forms API status to be in success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserResponse)
      })

      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockSuccessPromise)
      formAPI.getFormsAPI = mockFormAPI

      await formStore.getFormsList()
      expect(formStore.getFormsAPIStatus).toBe(API_SUCCESS)
      expect(formStore.listOfForms.length).toBe(10)
   })

   it('should test the FormStore forms API status to be in  failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })

      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockFailurePromise)
      formAPI.getFormsAPI = mockFormAPI

      await formStore.getFormsList()
      expect(formStore.getFormsAPIStatus).toBe(API_FAILED)
      expect(formStore.getFormsAPIError).toBe('error')
   })
   
   
   it("should test the form store upi status to be in fetching state", () => {
      const mockLoadingPromise = new Promise(function(resolve, reject){})
      
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockLoadingPromise)
      formAPI.getTransactionUPI = mockFormAPI
      
      formStore.getPayRequestUPI()
      expect(formStore.upiStatus).toBe(API_FETCHING)
   })
   
   
   it("should test the formStore upiStatus to be in successState", async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject){
         resolve(getTransactionUPI)
      })
      
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockSuccessPromise)
      formAPI.getTransactionUPI = mockFormAPI
      
      
      await formStore.getPayRequestUPI()
      expect(formStore.upiStatus).toBe(API_SUCCESS)
      expect(formStore.upi).toBe("8978433593@sbi")
   })
   
   it("should test the formStore upiStatus to be in failure state", async() => {
      const mockFailurePromise = new Promise (function(resolve, reject){
         reject(new Error("error"))
      })
      
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockFailurePromise)
      formAPI.getTransactionUPI = mockFormAPI
      
      await formStore.getPayRequestUPI()
      expect(formStore.upiStatus).toBe(API_FAILED)
      expect(formStore.upiError).toBe("error")
   })
   
   
   it("should test that user Payment details API status to be in fetching state", () =>  {
      const mockLoadingPromise = new Promise(function(resolve, reject){})
      
      const data = {
            "amount": 0,
            "transaction_id": 8978433593,
            "transaction_type": "phone pe",
            "screenshot_url": "sampleUrl@jsdj"
        }
      
      
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockLoadingPromise)
      formAPI.sendTransactionDetails = mockFormAPI
      
      formStore.sendPaymentData(data)
      expect(formStore.userPaymentDetailsAPIStatus).toBe(API_FETCHING)
   })
   
   it("should test that user payment details API status to be in success state ", async() => {
      const mockSuccessPromise = new Promise(function(resolve, reject){
         resolve (null)
      })
      
      const data = {
            "amount": 0,
            "transaction_id": 8978433593,
            "transaction_type": "phone pe",
            "screenshot_url": "sampleUrl@jsdj"
      }
      
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockSuccessPromise)
      formAPI.sendTransactionDetails = mockFormAPI
      
      await formStore.sendPaymentData(data)
      expect(formStore.userPaymentDetailsAPIStatus).toBe(API_SUCCESS)
      expect(formStore.userPaymentDetailsAPIResponse).toBe(null)
   })
   
   it("should test that user payment details API status to be in failure state ", async () => {
      const mockFailurePromise = new Promise(function(resolve, reject){
         reject(new Error("error"))
      })
      
      const data = {
            "amount": 0,
            "transaction_id": 8978433593,
            "transaction_type": "phone pe",
            "screenshot_url": "sampleUrl@jsdj"
      }
      
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockFailurePromise)
      
      formAPI.sendTransactionDetails = mockFormAPI
      
      await formStore.sendPaymentData(data)
      
      expect(formStore.userPaymentDetailsAPIStatus).toBe(API_FAILED)
      expect(formStore.userPaymentDetailsAPIError).toBe('error')
      
   })
   
   
   
   it("should test the transactionsList API status is in fetching state", () => {
      const mockLoadingPromise = new Promise(function(resolve, reject){})
      
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockLoadingPromise)
      formAPI.getUserTransactionList = mockFormAPI
      
      formStore.getUserTransactions()
      expect(formStore.transactionListAPIstatus).toBe(API_FETCHING)
      
   })
   
   it("should test the transactionsList Api status to be in successState", async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject){
         resolve(getTransactions)
      })
      
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockSuccessPromise)
      formAPI.getUserTransactionList = mockFormAPI
      
      await formStore.getUserTransactions()
      expect(formStore.transactionListAPIstatus).toBe(API_SUCCESS)
      expect(formStore.listOfTransactions.length).toBe(5)
   })
   
   it("should test the transactionListAPIstatus to be in failure state", async () => {
      const mockFailurePromise = new Promise(function(resolve, reject){
         reject(new Error("error"))
      })
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockFailurePromise)
      formAPI.getUserTransactionList = mockFormAPI
      
      await formStore.getUserTransactions()
      expect(formStore.transactionListAPIstatus).toBe(API_FAILED)
      expect(formStore.transactionListAPIError).toBe("error")
   })
   
   
     
   
   
})
