import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import UserDashBoard from '../../components'
import { clearUserSession } from '../../../utils/StorageUtils.js'
import NoDataView from '../../../components/common/NoDataView'
import { SELECTED_FORM_PATH } from "../../constants/RouteConstants"


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
   @observable currentPage = 1

   goToNextPage = () => {
      const { getFormsList } = this.props.formStore
      this.currentPage += 1
      getFormsList()
   }

   goToPreviousPage = () => {
      this.currentPage -= 1
      const { getFormsList } = this.props.formStore
      getFormsList()
   }
   
   onSelectForm = (id) => {
      console.log("selected", id)
      const { history } = this.props
      const renderSelectedForm = history.push(SELECTED_FORM_PATH)
      return <div>{renderSelectedForm}</div>
   }

   getStatusOfForm(newForm) {
      let statusIcon
      let date

      switch (newForm.formStatus) {
         case 'Online':
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

   render() {
      const {
         getFormsList,
         listOfForms,
         getFormsAPIStatus,
         getFormsAPIError,
         createFormComponent
      } = this.props.formStore
   
      return (
         <UserDashBoard
            redirectToSignInPage={this.redirectToSignInPage}
            renderSuccessUI={this.renderSuccessUI}
            getFormsList={getFormsList}
            listOfForms={listOfForms}
            getFormsAPIStatus={getFormsAPIStatus}
            getFormsAPIError={getFormsAPIError}
            createFormComponent={createFormComponent}
            getStatusOfForm={this.getStatusOfForm}
            goToNextPage={this.goToNextPage}
            goToPreviousPage={this.goToPreviousPage}
            currentPage={this.currentPage}
            totalPages={10}
            onSelectForm={this.onSelectForm}
            signOut={this.signOut}
         />
      )
   }
}

export default withRouter(UserRoute)
