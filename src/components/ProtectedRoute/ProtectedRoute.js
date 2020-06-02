import React from 'react'
import { observer } from 'mobx-react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getAccessToken } from '../../utils/StorageUtils.js'
import { SIGN_IN_PATH } from '../../AuthenticationModule/constants/RouteConstants'

@observer
class ProtectedRoute extends React.Component {
   render() {
      const { component: Component, ...props } = this.props
      return getAccessToken() ? (
         <Route component={Component} {...props} />
      ) : (
         <Redirect to={SIGN_IN_PATH} />
      )
   }
}

export default withRouter(ProtectedRoute)
