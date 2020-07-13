/*global jest*/
/*global expect*/
/*global mockSetCookie*/
import { types } from 'mobx-state-tree'
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import AuthStoreWithMST from '.'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import AuthAPI from '../../services/AuthService/index.api'
import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'

import AuthMSTFixturesService from '../../services/FixturesService/index.fixture.mst'

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

describe('AuthStore Tests', () => {
   let authStore
   beforeEach(() => {
      const AuthStoreWithService = types
         .compose(AuthStoreWithMST, AuthMSTFixturesService)
         .actions(self => {
            return {
               userSignIn(request, onSuccess, onFailure) {
                  const userSignInAPIPromise = self.signInAPI(request)
                  return bindPromiseWithOnSuccess(userSignInAPIPromise)
                     .to(self.setUserSignInAPIStatus, response => {
                        self.setUserSignInAPIResponse(response)
                        onSuccess()
                     })
                     .catch(error => {
                        self.setUserSignInAPIError(error)
                        onFailure()
                     })
               }
            }
         })

      const authStoreWithMST = AuthStoreWithService.create({
         getUserSignInAPIStatus: 0,
         getUserSignInAPIError: null
      })

      authStore = authStoreWithMST
   })

   it('should test initialising auth store', () => {
      expect(authStore.getUserSignInAPIStatus).toBe(API_INITIAL)
      expect(authStore.getUserSignInAPIError).toBe(null)
   })

   it('should test userSigninAPI data success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserSignInResponse)
      })
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      authStore.signInAPI = mockSignInAPI
      await authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.getUserSignInAPIStatus).toBe(API_SUCCESS)
      expect(mockSetCookie).toBeCalled()
      expect(onSuccess).toBeCalled()
   })
   it('should test userSignInAPI data fetching state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockLoadingPromise)
      authStore.signInAPI = mockSignInAPI
      authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.getUserSignInAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })
   it('should test usersigninAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockFailurePromise)
      authStore.signInAPI = mockSignInAPI
      await authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.getUserSignInAPIStatus).toBe(API_FAILED)
      expect(authStore.getUserSignInAPIError).toBe('error')
      expect(onFailure).toBeCalled()
   })
   it('should test user signout', () => {
      authStore.userSignOut()
      expect(mockRemoveCookie).toBeCalled()
      expect(authStore.getUserSignInAPIStatus).toBe(API_INITIAL)
      expect(authStore.getUserSignInAPIError).toBe(null)
   })
})
