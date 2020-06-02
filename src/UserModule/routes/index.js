import React from 'react'
import { Route } from 'react-router-dom'

import ProtectedRoute from '../../components/ProtectedRoute'
import { USER_HOME_PATH, SELECTED_FORM_PATH } from '../constants/RouteConstants'

import { UserRoute } from './UserRoute'
import { SelectedFormRoute } from './SelectedFormRoute'

const EssentialKitUserHomeRoute = [
   <ProtectedRoute
      key={USER_HOME_PATH}
      path={USER_HOME_PATH}
      component={UserRoute}
   />,
   <ProtectedRoute
      key={SELECTED_FORM_PATH}
      path={`${SELECTED_FORM_PATH}/:id`}
      component={SelectedFormRoute}
   />
]

export default EssentialKitUserHomeRoute

// <Route key={USER_HOME_PATH} path={USER_HOME_PATH} component={UserRoute} />,
//    <Route key={ SELECTED_FORM_PATH } path={ `${SELECTED_FORM_PATH}/:id` } component={ SelectedFormRoute } />
