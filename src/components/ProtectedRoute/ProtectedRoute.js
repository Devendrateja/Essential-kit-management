import React from 'react'
import { observer, inject } from 'mobx-react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getAccessToken } from '../../utils/StorageUtils.js'
import { SIGN_IN_PATH } from '../../AuthenticationModule/constants/RouteConstants'


@inject('authStore')
@observer
class ProtectedRoute extends React.Component {
   
   render() {
      
      const { isLoggedIn } = this.props.authStore
      
      const { component: Component, ...props } = this.props
      
      return isLoggedIn() ? (
         <Route component={Component} {...props} />
      ) : (
         <Redirect to={SIGN_IN_PATH} />
      )
   }
}

export default withRouter(ProtectedRoute)







