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
   });

   afterEach(() => {
      jest.resetAllMocks();
   });

   it('should go to next page and prev page', async () => {
      
      formStore.initialisePaginationStore(4,0)
      
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserResponse)
      })
      // await formStore.getFormsList()
      
      // const { debug,getByRole, getByText } = render(
      //    <Router history={createMemoryHistory()}>
      //       <UserRoute formStore={formStore}/>
      //    </Router>
      // )

      // const nextNavButton = getByRole('button', { name: '>' })
      // const prevNavButton = getByRole('button', { name: '<' })
      // expect(prevNavButton.disabled).toBe(true)
      // fireEvent.click(nextNavButton)
      // expect(prevNavButton.disabled).toBe(false)
      // fireEvent.click(prevNavButton)
      // expect(prevNavButton.disabled).toBe(true)
      // debug()
   })
   
   
   it("should test that form is live or close using data testid", async () => {

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserResponse)
      })

      const mockFormAPI = jest.fn()
      mockFormAPI.mockReturnValue(mockSuccessPromise)
      formAPI.getFormsAPI = mockFormAPI
      formStore.getFormsList()
      
      
      const { debug,getByRole, getAllByRole,getAllByText , getByTestId, getAllByTestId} = await render(
         <Router history={createMemoryHistory()}>
            <UserRoute formStore={formStore}/>
         </Router>
      )
      
      const formTitle  = getByTestId("title-form")
      await waitFor(() =>{
         console.log("...rrrrr......", formTitle)
      })
      const form = getAllByTestId("testidform-1")
      
      console.log("list of formms while testing", form)
      
      
      
      
      // const selectedForm = getAllByRole("form", { name : "individual-form" })
      
   })
   
   

   
})
