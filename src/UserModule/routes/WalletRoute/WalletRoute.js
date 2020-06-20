import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'


import WalletPage from "../../components/WalletPage"
import { clearUserSession } from '../../../utils/StorageUtils.js'
import NoDataView from '../../../components/common/NoDataView'
import {
   SELECTED_FORM_PATH,
   CLOSED_FORM_PATH,
   PAY_REQUEST_PATH,
   USER_HOME_PATH
} from '../../constants/RouteConstants'

import withNavigation from "../../hocs/withNavigation"


@inject('formStore')
@observer
class WalletRoute extends React.Component{
    
    
    
   signOut = () => {
      const { goToSignInPage } = this.props
      clearUserSession()
      goToSignInPage();
   }
    
    
    render(){
       const { goToPayRequestPage, goToHomePage } = this.props
       const {listOfTransactions} = this.props.formStore
       
        return(
            <WalletPage
               signOut={this.signOut}
               goToPayRequestPage={goToPayRequestPage}
               goToHomePage={goToHomePage}
               NavButtonPath={USER_HOME_PATH}
               listOfTransactions={listOfTransactions}
            />
            )
    }
}


export default withNavigation(WalletRoute);