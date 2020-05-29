/*global jest*/
/*global expect*/

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import AuthAPI from '../../services/AuthService/index.api.js'
import AuthStore from '../../stores/AuthStore'

import { SIGN_IN_PATH } from '../../constants/RouteConstants'
import { USER_HOME_PATH } from '../../../UserModule/constants/RouteConstants'

//import getUserSignInResponse from "../../fixtures/getUserSignInResponse.json"

import SignInRoute from './SignInRoute'

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

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('sign in route tests', () => {
   let authAPI
   let authStore

   beforeEach(() => {
      authAPI = new AuthAPI()
      authStore = new AuthStore(authAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render username an empty error message', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const signInButton = getByRole('button', { name: 'Login' })

      fireEvent.click(signInButton)

      getByText(/please enter username/i)
   })

   it('should render password an empty password error message', () => {
      const { getByText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const username = 'test-user'

      const usernameField = getByPlaceholderText('username')

      const signInButton = getByRole('button', { name: 'Login' })

      fireEvent.change(usernameField, { target: { value: username } })

      fireEvent.click(signInButton)

      getByText(/please enter password/i)
   })

   it('should sign in when on click sign in button', () => {
      const {
         getByLabelText,
         debug,
         getByPlaceholderText,
         getByText,
         getByRole
      } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('username')
      const passwordField = getByPlaceholderText('password')
      const signInButton = getByRole('button', { name: 'Login' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.keyPress(signInButton, { key: 'Enter', code: 'Enter' })
      waitFor(() => getByLabelText('audio-loading'))
   })

   it('should render signin route loading state', async () => {
      const username = 'test-user'
      const password = 'test-password'

      const { getByLabelText, getByRole, getByPlaceholderText } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const usernameField = getByPlaceholderText('username')
      const passwordField = getByPlaceholderText('password')
      const signInButton = getByRole('button', { name: 'Login' })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})

      const mockSigninAPI = jest.fn()

      mockSigninAPI.mockReturnValue(mockLoadingPromise)

      authAPI.signInAPI = mockSigninAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      getByRole('button', { disabled: true })
   })

   it('should render sign in success state', async () => {
      const history = createMemoryHistory()
      const route = SIGN_IN_PATH
      history.push(route)

      const {
         getByRole,
         queryByRole,
         getByPlaceholderText,
         queryByLabelText,
         getByTestId,
         debug
      } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={SIGN_IN_PATH}>
                  <SignInRoute />
               </Route>

               <Route path={USER_HOME_PATH}>
                  <LocationDisplay />
               </Route>
            </Router>
         </Provider>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('username')
      const passwordField = getByPlaceholderText('password')
      const signInButton = getByRole('button', { name: 'Login' })

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve('success')
      })

      const mockSigninAPI = jest.fn()
      mockSigninAPI.mockReturnValue(mockSuccessPromise)

      authAPI.signInAPI = mockSigninAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      waitFor(() => {
         //   debug()
         expect(queryByRole('button', { name: 'Login' })).not.toBeInThDocument()
         expect(getByTestId('location-display')).toHaveTextContent(
            USER_HOME_PATH
         )
      })
   })

   it('should render  signInRoute Failure state', () => {
      const { getByText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('username')
      const passwordField = getByPlaceholderText('password')
      const SignInButton = getByRole('button', { name: 'Login' })

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})

      const mockSigninAPI = jest.fn()

      mockSigninAPI.mockReturnValue(mockFailurePromise)

      authAPI.signInAPI = mockSigninAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(SignInButton)

      waitFor(() => {
         getByText(/server-error/i)
      })
   })
})
