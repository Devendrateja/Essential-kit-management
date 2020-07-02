import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { clearUserSession } from '../../../utils/StorageUtils.js'
import NoDataView from '../../../components/common/NoDataView'
import {
   USER_HOME_PATH,
   PAY_REQUEST_PATH
} from '../../constants/RouteConstants'
import ClosedForm from '../../components/ClosedForm'

import withNavigation from '../../hocs/withNavigation'

@inject('formStore')
@observer
class ClosedFormRoute extends React.Component {
   @observable closedForm = {}

   componentDidMount() {
      const { listOfForms } = this.props.formStore.paginationStore
      let id = this.props.match.params.id

      this.closedForm = listOfForms.find(form => {
         return form.formId.toString() === id
      })
      this.closedForm.getClosedFormData(id)
   }

   signOut = () => {
      const { goToSignInPage } = this.props
      clearUserSession()
      goToSignInPage()
   }

   onClickRetry = () => {
      const { getClosedFormData } = this.closedForm
      let id = this.props.match.params.id
      getClosedFormData(id)
   }

   render() {
      const { goToHomePage, goToPayRequestPage, goToWalletPage } = this.props

      const {
         closedFormList,
         totalItemsDetailsWithCostIncurred,
         getClosedFormAPIStaus,
         getClosedFormAPIError
      } = this.closedForm

      return (
         <ClosedForm
            closedFormList={closedFormList}
            signOut={this.signOut}
            footerData={totalItemsDetailsWithCostIncurred}
            apiStatus={getClosedFormAPIStaus}
            apiError={getClosedFormAPIError}
            onClickRetry={this.onClickRetry}
            goToHomePage={goToHomePage}
            goToPayRequestPage={goToPayRequestPage}
            goToWalletPage={goToWalletPage}
         />
      )
   }
}

export default withNavigation(ClosedFormRoute)
