/*global jest*/
/*global expect*/
/*global mockSetCookie*/

import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import getSelectedFormResponse from '../../fixtures/getSelectedFormResponse.json'
import SelectedFormAPI from '../../services/SelectedFormServices/index.api.js'
import FormFixturesService from '../../services/SelectedFormServices/index.fixtures.js'

import SelectedFormStore from '.'

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

describe('SelectedForm store tests', () => {
   let selectedFormAPI
   let selectedFormStore

   beforeEach(() => {
      selectedFormAPI = new FormFixturesService()
      selectedFormStore = new SelectedFormStore(selectedFormAPI)
   })

   it('should test the initialising of Selected for store', () => {
      expect(selectedFormStore.getSelectedFormAPIStatus).toBe(API_INITIAL)
      expect(selectedFormStore.getSelectedFormAPIError).toBe(null)
   })

   it('should test the SelectedFormStore fetching state', () => {
      selectedFormStore.getSelectedFormData()
      expect(selectedFormStore.getSelectedFormAPIStatus).toBe(API_FETCHING)
   })

   it('should test the selectedFormStore success  state', async () => {
      await selectedFormStore.getSelectedFormData()
      expect(selectedFormStore.getSelectedFormAPIStatus).toBe(API_SUCCESS)
   })

   it('should test the selectedFormStore failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })

      const mockSelectedFormAPI = jest.fn()
      mockSelectedFormAPI.mockReturnValue(mockFailurePromise)
      selectedFormAPI.getSelectedFormAPI = mockSelectedFormAPI

      await selectedFormStore.getSelectedFormData()
      expect(selectedFormStore.getSelectedFormAPIStatus).toBe(API_FAILED)
      expect(selectedFormStore.getSelectedFormAPIError).toBe('error')
   })
})