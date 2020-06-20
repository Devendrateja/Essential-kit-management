import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import {USER_HOME_PATH} from "../../constants/RouteConstants"

import { clearUserSession } from '../../../utils/StorageUtils.js'

import PayRequestPage from '../../components/PayRequestPage'
import withNavigation from "../../hocs/withNavigation"


@inject("formStore")
@observer
class PayRequestRoute extends React.Component {
   
   componentDidMount(){
      const {getPayRequestUPI} = this.props.formStore
      getPayRequestUPI()
   }
   
   signOut = () => {
      const {goToSignInPage} = this.props
      clearUserSession()
      goToSignInPage();
      
   }

   render() {
       const { sendPaymentData, upi } = this.props.formStore
       const { goToHomePage,goToWalletPage } = this.props
       
       
      return (
         <div>
            <PayRequestPage 
            sendPaymentData={sendPaymentData}
            signOut={this.signOut}
            goToHomePage={goToHomePage}
            goToWalletPage={goToWalletPage}
            upi={upi}
            />
         </div>
      )
   }
}

export default withNavigation(PayRequestRoute)
