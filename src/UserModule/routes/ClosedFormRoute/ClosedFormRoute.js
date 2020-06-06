import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { clearUserSession } from '../../../utils/StorageUtils.js'
import NoDataView from '../../../components/common/NoDataView'
import {USER_HOME_PATH, PAY_REQUEST_PATH} from "../../constants/RouteConstants"
import ClosedForm from '../../components/ClosedForm'

@inject('closedFormStore')
@observer
class ClosedFormRoute extends React.Component {
   componentDidMount() {
      const { getClosedFormData } = this.props.closedFormStore
      let id = this.props.match.params.id
      console.log('component did mount id ', id, this.props)
      getClosedFormData(id)
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

   onClickRetry = () => {
      const { getClosedFormData } = this.props.closedFormStore
      let id = this.props.match.params.id
      console.log('on retry click closed form id', id, this.props)
      getClosedFormData(id)
   }
   
   
   goToHomePage = () => {
      const { history } = this.props
      const homePage = history.push(USER_HOME_PATH)
      return homePage
   }
   
   goToPayRequestPage = () => {
      const { history } = this.props
      const payRequestPage = history.push(PAY_REQUEST_PATH)
      return <div>{payRequestPage}</div>
   }
   

   render() {
      const {
         closedFormList,
         totalItemsDetailsWithCostIncurred,
         getClosedFormAPIStaus,
         getClosedFormAPIError
      } = this.props.closedFormStore

      return (
         <ClosedForm
            closedFormList={closedFormList}
            signOut={this.signOut}
            footerData={totalItemsDetailsWithCostIncurred}
            apiStatus={getClosedFormAPIStaus}
            apiError={getClosedFormAPIError}
            onClickRetry={this.onClickRetry}
            goToHomePage={this.goToHomePage}
            goToPayRequestPage={this.goToPayRequestPage}
         />
      )
   }
}

export default withRouter(ClosedFormRoute)
