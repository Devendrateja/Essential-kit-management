import React from 'react'
import { Route } from 'react-router-dom'

import { USER_HOME_PATH, SELECTED_FORM_PATH } from '../constants/RouteConstants'

import { UserRoute } from './UserRoute'
import { SelectedFormRoute } from "./SelectedFormRoute"


const EssentialKitUserHomeRoute = [
   <Route key={USER_HOME_PATH} path={USER_HOME_PATH} component={UserRoute} />,
   <Route key={ SELECTED_FORM_PATH } path={ SELECTED_FORM_PATH } component={ SelectedFormRoute } />
]

export default EssentialKitUserHomeRoute
