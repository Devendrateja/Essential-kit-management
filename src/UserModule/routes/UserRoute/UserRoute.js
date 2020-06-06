import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import UserDashBoard from '../../components'
import { clearUserSession } from '../../../utils/StorageUtils.js'
import NoDataView from '../../../components/common/NoDataView'
import {
   SELECTED_FORM_PATH,
   CLOSED_FORM_PATH,
   PAY_REQUEST_PATH,
   MY_WALLET_PATH
} from '../../constants/RouteConstants'

import ListOfForms from '../../components/ListOfForms'

import {
   OnlineIcon,
   ClosedIcon,
   DoneIcon,
   NavDown
} from '../../../styleGuide/images'

@inject('formStore')
@observer
class UserRoute extends React.Component {
   limit = 8
   @observable currentPage = 0
   @observable offset = 0

   componentDidMount() {
      const { getFormsList, listOfForms } = this.props.formStore

      console.log('user route cdm', listOfForms)

      getFormsList(this.limit, this.offset)
   }

   onEnterPageNumber = event => {
      console.log('event on key down', this.currentPage)
   }

   goToNextPage = () => {
      const { getFormsList } = this.props.formStore
      this.currentPage += 1
      this.offset += this.limit
      getFormsList(this.limit, this.offset)
   }

   goToPreviousPage = () => {
      this.currentPage -= 1
      const { getFormsList } = this.props.formStore
      this.offset -= this.limit
      getFormsList(this.limit, this.offset)
   }

   onSelectForm = (formId, formStatus) => {
      console.log('selected', formId, formStatus)
      const { history } = this.props

      const renderForm =
         formStatus === 'Live'
            ? history.push(`${SELECTED_FORM_PATH}/${formId}/v1`)
            : history.push(`${CLOSED_FORM_PATH}/${formId}/v1`)
      return <div>{renderForm}</div>
   }

   onRetryClick = () => {
      const { getFormsList } = this.props.formStore
      console.log('retry clicked', getFormsList)
      getFormsList(this.limit, this.offset)
   }

   getStatusOfForm(newForm) {
      let statusIcon
      let date

      switch (newForm.formStatus) {
         case 'Live':
            statusIcon = <img src={OnlineIcon.src} alt={newForm.formStatus} />
            date = `Closed on ${newForm.ClosingDate}`
            break

         case 'Closed':
            statusIcon = <img src={ClosedIcon.src} alt={newForm.formStatus} />
            date = `Next Expected Delivery ${newForm.expectedDeliveryDate}`
            break

         case 'Done':
            statusIcon = <img src={DoneIcon.src} alt={newForm.formStatus} />
            date = 'Delivered'
            break
      }

      return {
         statusIcon: statusIcon,
         date: date
      }
   }

   renderSuccessUI = () => {
      const { listOfForms, createFormComponent } = this.props.formStore
      console.log('listofFormsShouldnotbeundefined', listOfForms)
      if (listOfForms.length <= 0) {
         return <NoDataView />
      }
      return (
         <ListOfForms
            onSelectForm={this.onSelectForm}
            getStatusOfForm={this.getStatusOfForm}
            listOfForms={listOfForms}
            createFormComponent={createFormComponent}
         />
      )
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

   goToPayRequestPage = () => {
      const { history } = this.props
      const payRequestPage = history.push(PAY_REQUEST_PATH)
      return <div>{payRequestPage}</div>
   }
   
   goToWalletPage = () => {
      const { history } = this.props
      const walletPage = history.push(MY_WALLET_PATH)
      return <div>{walletPage}</div>
   }
   
   

   render() {
      const {
         getFormsList,
         listOfForms,
         getFormsAPIStatus,
         getFormsAPIError,
         createFormComponent,
         totalNoOfForms
      } = this.props.formStore
      console.log('user route ', listOfForms)
      return (
         <UserDashBoard
            redirectToSignInPage={this.redirectToSignInPage}
            renderSuccessUI={this.renderSuccessUI}
            getFormsList={getFormsList}
            listOfForms={listOfForms}
            getFormsAPIStatus={getFormsAPIStatus}
            getFormsAPIError={getFormsAPIError}
            onRetryClick={this.onRetryClick}
            createFormComponent={createFormComponent}
            getStatusOfForm={this.getStatusOfForm}
            offset={this.offset}
            limitedNoOfFormsPerPage={this.limit}
            totalNoOfForms={totalNoOfForms}
            goToNextPage={this.goToNextPage}
            goToPreviousPage={this.goToPreviousPage}
            onEnterPageNumber={this.onEnterPageNumber}
            currentPage={this.currentPage}
            onSelectForm={this.onSelectForm}
            signOut={this.signOut}
            goToPayRequestPage={this.goToPayRequestPage}
            goToWalletPage={this.goToWalletPage}
         />
      )
   }
}

export default withRouter(UserRoute)
