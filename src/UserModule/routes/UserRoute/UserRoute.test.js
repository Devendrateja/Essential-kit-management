/*global jest*/
/*global expect*/

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import FormAPI from '../../services/FormServices/index.api.js'
import FormStore from '../../stores/FormStore'

import { SIGN_IN_PATH } from '../../../AuthenticationModule/constants/RouteConstants'
import { USER_HOME_PATH } from '../../constants/RouteConstants'

import getUserResponse from '../../fixtures/getUserResponse.json'

import UserRoute from './UserRoute'

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

describe('UserRoute tests', () => {
   let formAPI
   let formStore

   beforeEach(() => {
      formAPI = new FormAPI()
      formStore = new FormStore(formAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should go to next page and previous page', async () => {
      const { getByRole } = render(
         <Router history={createMemoryHistory()}>
            <UserRoute formStore={formStore} />
         </Router>
      )

      const nextNavButton = getByRole('button', { name: '>' })
      const prevNavButton = getByRole('button', { name: '<' })
      await expect(prevNavButton.disabled).toBe(true)
      fireEvent.click(nextNavButton)
      await expect(prevNavButton.disabled).toBe(false)
   })

   it('should test the status and date from the formComponent', () => {
      const { getByRole, getByText, debug } = render(
         <Router history={createMemoryHistory()}>
            <UserRoute formStore={formStore} />
         </Router>
      )
      const form = {
         formStatus: 'Online',
         ClosingDate: '1-1-1'
      }

      const mockgetStatus = jest.fn()
      mockgetStatus.mockReturnValue(form)
      UserRoute.getStatusOfForm = mockgetStatus
      console.log(mockgetStatus)
   })
})
