import React from 'react'
import { Route } from 'react-router-dom'

import ProtectedRoute from '../../components/ProtectedRoute'
import {
   USER_HOME_PATH,
   SELECTED_FORM_PATH,
   CLOSED_FORM_PATH,
   PAY_REQUEST_PATH,
   MY_WALLET_PATH
} from '../constants/RouteConstants'

import { UserRoute } from './UserRoute'
import { SelectedFormRoute } from './SelectedFormRoute'
import { ClosedFormRoute } from './ClosedFormRoute'
import { PayRequestRoute } from './PayRequestRoute'
import { WalletRoute } from "./WalletRoute"


const EssentialKitUserHomeRoute = [
   <ProtectedRoute
      key={USER_HOME_PATH}
      path={USER_HOME_PATH}
      component={UserRoute}
   />,
   <ProtectedRoute
      key={SELECTED_FORM_PATH}
      path={`${SELECTED_FORM_PATH}/:id/v1`}
      component={SelectedFormRoute}
   />,
   <ProtectedRoute
      key={CLOSED_FORM_PATH}
      path={`${CLOSED_FORM_PATH}/:id/v1`}
      component={ClosedFormRoute}
   />,
   <ProtectedRoute
      key={PAY_REQUEST_PATH}
      path={PAY_REQUEST_PATH}
      component={PayRequestRoute}
   />,
   <ProtectedRoute
      key={MY_WALLET_PATH}
      path={MY_WALLET_PATH}
      component={WalletRoute}
   />
   
]

export default EssentialKitUserHomeRoute
