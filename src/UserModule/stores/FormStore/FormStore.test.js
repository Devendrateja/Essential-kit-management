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
   })

   it('should test the FormStore fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockLoadingPromise)
      formAPI.getFormsAPI = mockFormAPI

      formStore.getFormsList()
      expect(formStore.getFormsAPIStatus).toBe(API_FETCHING)
   })

   it('should test the FormStore success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve('success')
      })

      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockSuccessPromise)
      formAPI.getFormsAPI = mockFormAPI

      await formStore.getFormsList()
      expect(formStore.getFormsAPIStatus).toBe(API_SUCCESS)
   })

   it('should test the FormStore failure state', async () => {
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

   it('should test to create a new form ', () => {
      const form = {
         form_id: 1,
         form_name: 'snacks',
         form_status: 'Online',
         close_date: '20-7-8',
         expected_delivery_date: '20-05-20',
         items_count: 10,
         estimated_cost: 100,
         items_pending_count: 0,
         cost_incurred_for_delivered_items: 0
      }
      const newForm = formStore.createFormComponent(form)
      expect(newForm).toEqual({
         formId: 1,
         formName: 'snacks',
         formStatus: 'Online',
         ClosingDate: '20-7-8',
         expectedDeliveryDate: '20-05-20',
         totalItems: 10,
         totalEstimatedCost: 100,
         itemsPending: 0,
         costIncurredForDeliveredItems: 0
      })
   })
})
