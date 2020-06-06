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




@inject('formStore')
@observer
class WalletRoute extends React.Component{
    
    
    
   signOut = () => {
      clearUserSession()
      this.redirectToSignInPage()
   }

   redirectToSignInPage = () => {
      const { history } = this.props
      const signin = history.push('/essential-kit-management/signin')
      return <div>{signin}</div>
   }

   goToPayRequestPage = () => {
      const { history } = this.props
      const payRequestPage = history.push(PAY_REQUEST_PATH)
      return <div>{payRequestPage}</div>
   }
   
   goToHomePage = () => {
      const { history } = this.props
      const homePage = history.push(USER_HOME_PATH)
      return <div>{homePage}</div>
   }
   
    
    
    render(){
       
       const {listOfTransactions} = this.props.formStore
       
        return(
            <WalletPage
               signOut={this.signOut}
               goToPayRequestPage={this.goToPayRequestPage}
               goToHomePage={this.goToHomePage}
               NavButtonPath={USER_HOME_PATH}
               listOfTransactions={listOfTransactions}
            />
            )
    }
}


export default WalletRoute;