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
import { Container, MiniContainer } from './styledComponents'

@observer
class UserDashBoard extends React.Component {
   render() {
      const {
         redirectToSignInPage,
         signOut,
         getFormsList,
         listOfForms,
         getFormsAPIStatus,
         getFormsAPIError,
         onRetryClick,
         createFormComponent,
         getStatusOfForm,
         renderSuccessUI,
         goToNextPage,
         goToPreviousPage,
         onEnterPageNumber,
         currentPage,
         offset,
         limitedNoOfFormsPerPage,
         totalNoOfForms,
         onSelectForm
      } = this.props

      return (
         <Container>
            <Header
               redirectToSignInPage={redirectToSignInPage}
               signOut={signOut}
            />
            <MiniContainer>
               <TitleBar />
               <TableHeader />
                  <LoadingWrapperWithFailure
                     renderSuccessUI={renderSuccessUI}
                     getFormsList={getFormsList}
                     getStatusOfForm={getStatusOfForm}
                     listOfForms={listOfForms}
                     onSelectForm={onSelectForm}
                     apiStatus={getFormsAPIStatus}
                     apiError={getFormsAPIError}
                     onRetryClick={onRetryClick}
                     createFormComponent={createFormComponent}
                  />
               <Pagination
                  goToNextPage={goToNextPage}
                  currentPage={currentPage}
                  goToPreviousPage={goToPreviousPage}
                  onEnterPageNumber={onEnterPageNumber}
                  offset={offset}
                  limitedNoOfFormsPerPage={limitedNoOfFormsPerPage}
                  totalNoOfForms={totalNoOfForms}
               />
            </MiniContainer>
         </Container>
      )
   }
}

export default withRouter(UserDashBoard)
