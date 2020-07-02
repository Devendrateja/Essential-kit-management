import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { Redirect } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router-dom'

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
import Pagination from '../../components/Pagination'

import {
   OnlineIcon,
   ClosedIcon,
   DoneIcon,
   NavDown
} from '../../../styleGuide/images'

import FormStore from '../../stores/FormStore'

import withNavigation from '../../hocs/withNavigation'
import { goToPayRequestPage } from '../../utils/NavigationUtils/NavigationUtils'

interface UserRouteProps extends RouteComponentProps {
   goToSignInPage: () => void
   goToPayRequestPage: () => void
   goToWalletPage: () => void
}

interface InjectedProps extends UserRouteProps {
   formStore: FormStore
}

@inject('formStore')
@observer
class UserRoute extends React.Component<UserRouteProps> {
   onSelectForm = (formId, formStatus) => {
      const { history } = this.props

      const renderForm: any =
         formStatus === 'Live'
            ? history.push(`${SELECTED_FORM_PATH}/${formId}/v1`)
            : history.push(`${CLOSED_FORM_PATH}/${formId}/v1`)

      return <div>{renderForm}</div>
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   onRetryClick = () => {
      console.log('on retry clicked')
      const {
         getPageEntities
      } = this.getInjectedProps().formStore.paginationStore
      getPageEntities()
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
      const { listOfForms } = this.getInjectedProps().formStore.paginationStore

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
      const { goToPayRequestPage, goToWalletPage } = this.props
      const {
         paginationStatus,
         paginationError,
         currentPageAndTotalPages,
         goToNextPage,
         goToPreviousPage
      } = this.getInjectedProps().formStore.paginationStore
      console.log('api status in route', paginationStatus)
      return (
         <UserDashBoard
            redirectToSignInPage={this.signOut}
            renderSuccessUI={this.renderSuccessUI}
            apiStatus={paginationStatus}
            apiError={paginationError}
            currentPageAndTotalPages={currentPageAndTotalPages}
            onRetryClick={this.onRetryClick}
            getStatusOfForm={this.getStatusOfForm}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            signOut={this.signOut}
            goToPayRequestPage={goToPayRequestPage}
            goToWalletPage={goToWalletPage}
         />
      )
   }
}

export default withRouter(withNavigation(UserRoute))
