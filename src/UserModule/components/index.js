import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import NavigationButton from '../../components/common/NavigationButton'
import LoadingWrapperWithFailure from '../../components/common/LoadingWrapperWithFailure'

import Header from '../../components/common/Header'
import TitleBar from './TitleBar'
import TableHeader from './TableHeader'
import ListOfForms from './ListOfForms'
import Pagination from './Pagination'
import {
   Container,
   MiniContainer,
   LoadingWrapperContainer
} from './styledComponents'

import { getLoadingStatus } from "@ib/api-utils"

@observer
class UserDashBoard extends React.Component {
   
   
   
   render() {
      const {
         redirectToSignInPage,
         signOut,
         apiStatus,
         apiError,
         onRetryClick,
         createFormComponent,
         renderSuccessUI,
         goToNextPage,
         goToPreviousPage,
         offset,
         limitedNoOfFormsPerPage,
         initialisePaginationStore,
         goToPayRequestPage,
         goToWalletPage,
         currentPageAndTotalPages
      } = this.props
      
      const newAPIStatus = getLoadingStatus(apiStatus)
      console.log("api statuses", newAPIStatus,apiStatus)
      
      return (
         <Container>
            <Header
               goToPayRequestPage={goToPayRequestPage}
               redirectToSignInPage={redirectToSignInPage}
               signOut={signOut}
               goToWalletPage={goToWalletPage}
            />
            <MiniContainer>
               <TitleBar />
               <TableHeader />
               <LoadingWrapperContainer>
                  <LoadingWrapperWithFailure
                     renderSuccessUI={renderSuccessUI}
                     apiStatus={newAPIStatus}
                     apiError={apiError}
                     onRetryClick={onRetryClick}
                  />
               </LoadingWrapperContainer>
               <Pagination
                  goToNextPage={goToNextPage}
                  goToPreviousPage={goToPreviousPage}
                  currentPageAndTotalPages={currentPageAndTotalPages}
                  initialisePaginationStore={initialisePaginationStore}
               />
            </MiniContainer>
         </Container>
      )
   }
}

export default withRouter(UserDashBoard)
