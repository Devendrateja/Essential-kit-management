/*global jest*/
/*global expect*/

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import SignInRoute from '../../../AuthenticationModule/routes/SignInRoute'
import Colors from '../../../themes/Colors'
import Button from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('button test', () => {
   const buttonCSS = {
      background: '#0b69ff',
      width: '320px',
      height: '40px',
      borderRadius: '4px'
   }

   const onClickButton = () => {
      return null
   }

   it('should test the that the onClick function is called or not', () => {
      const { getByRole, debug } = render(
         <Router history={createMemoryHistory()}>
            <Button
               buttonCSS={buttonCSS}
               buttonValue={'Login'}
               onClickButton={onClickButton}
               apiStatus={0}
            />
         </Router>
      )
      const signInButton = getByRole('button', { name: 'Login' })
      fireEvent.click(signInButton)
      expect(signInButton.disabled).toBe(false)
   })

   it('should test that the button is disabled while it is in loading state', () => {
      const { getByRole, debug } = render(
         <Router history={createMemoryHistory()}>
            <Button
               buttonCSS={buttonCSS}
               buttonValue={'Login'}
               onClickButton={onClickButton}
               apiStatus={100}
            />
         </Router>
      )

      const signInButton = getByRole('button', { name: 'Login' })
      fireEvent.click(signInButton)
      expect(signInButton.disabled).toBe(true)
   })
})
