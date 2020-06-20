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
import Pagination from "../../components/Pagination"

import {
   OnlineIcon,
   ClosedIcon,
   DoneIcon,
   NavDown
} from '../../../styleGuide/images'

import  withNavigation  from "../../hocs/withNavigation.js"
import { goToPayRequestPage } from "../../utils/NavigationUtils/NavigationUtils.js"


@inject('formStore')
@observer
class UserRoute extends React.Component {
   

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
      const { getPageEntities } = this.props.formStore.paginationStore
     
      getPageEntities(this.limit, this.offset)
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

   renderSuccessUI = observer(() => {
      
     
      const {currentPageAndTotalPages, listOfForms} = this.props.formStore.paginationStore
      
      
      
      if (listOfForms.length <= 0) {
         return <NoDataView />
      }
      
      return (
         <ListOfForms
            onSelectForm={this.onSelectForm}
            getStatusOfForm={this.getStatusOfForm}
            listOfForms={listOfForms}
         />
         
      )
   })

   signOut = () => {
      const { goToSignInPage } = this.props
      clearUserSession()
      goToSignInPage()
   }

   
   

   render() {
      const {goToPayRequestPage,goToWalletPage} = this.props
        const { paginationStatus,listOfForms, paginationError ,currentPageAndTotalPages,
           goToNextPage,goToPreviousPage
        } = this.props.formStore.paginationStore
        const { initialisePaginationStore } = this.props.formStore
      
      console.log("userRoute", paginationStatus)
      
      
      return (
         <UserDashBoard
            redirectToSignInPage={this.redirectToSignInPage}
            renderSuccessUI={this.renderSuccessUI}
            initialisePaginationStore={initialisePaginationStore}
            apiStatus={paginationStatus}
            apiError={paginationError}
            currentPageAndTotalPages={currentPageAndTotalPages}
            onRetryClick={this.onRetryClick}
            getStatusOfForm={this.getStatusOfForm}
            offset={this.offset}
            limitedNoOfFormsPerPage={this.limit}
         
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            
            
            signOut={this.signOut}
            goToPayRequestPage={this.props.goToPayRequestPage}
            goToWalletPage={this.props.goToWalletPage}
            
         />
      )
   }
}

export default withNavigation(UserRoute)