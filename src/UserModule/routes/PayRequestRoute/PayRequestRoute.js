import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import {USER_HOME_PATH} from "../../constants/RouteConstants"

import { clearUserSession } from '../../../utils/StorageUtils.js'

import PayRequestPage from '../../components/PayRequestPage'


@inject("formStore")
@observer
class PayRequestRoute extends React.Component {
   
   componentDidMount(){
      const {getPayRequestUPI} = this.props.formStore
      getPayRequestUPI()
   }
   
   signOut = () => {
      clearUserSession()
      this.redirectToSignInPage()
   }

   redirectToSignInPage = () => {
      const { history } = this.props
      const signin = history.push('/essential-kit-management/signin')
      return <div>{signin}</div>
   }
   
   goToHomePage = () => {
      const { history } = this.props
      const homePage = history.push(USER_HOME_PATH)
      return homePage
   }
   
   render() {
       const { sendPaymentData, upi } = this.props.formStore
       
      return (
         <div>
            <PayRequestPage 
            sendPaymentData={sendPaymentData}
            signOut={this.signOut}
            goToHomePage={this.goToHomePage}
            upi={upi}
            />
         </div>
      )
   }
}

export default withRouter(PayRequestRoute)
