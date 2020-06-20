import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'

import Header from '../../../components/common/Header'
import SelectedFormTitleBar from './SelectedFormTitleBar'

import SelectedFormFooter from './SelectedFormFooter'

import getSelectedFormResponse from '../../fixtures/getSelectedFormResponse.json'
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure'

import {
   Container,
   Body,
   InstructionsBar,
   RedText,
   BlackText,
   Note,
   Table
} from './styledComponents'

@observer
class SelectedForm extends React.Component {
   render() {
      const {
         selectedFormSuccessUi,
         selectedFormData,
         apiStatus,
         getSelectedFormAPIError,
         
         onClickRetry,
         signOut,
         updateUserSelectedFormData,
         getUserSavedDataAPIStatus,
         getUserSavedDataAPIError,
         goToPayRequestPage,
         goToHomePage,
         goToWalletPage
      } = this.props
      return (
         <Container>
            <Header signOut={signOut}
                     goToPayRequestPage={goToPayRequestPage} 
                     goToHomePage={goToHomePage} 
                     goToWalletPage = {goToWalletPage}
            />
            <Body>
               <SelectedFormTitleBar selectedFormData={selectedFormData} />
               <LoadingWrapperWithFailure
                  renderSuccessUI={selectedFormSuccessUi}
                  onRetryClick={onClickRetry}
                  apiStatus={apiStatus}
               />
            </Body>
            <SelectedFormFooter
               selectedFormData={selectedFormData}
               updateUserSelectedFormData={updateUserSelectedFormData}
               apiStatusOfSelectedFormData={apiStatus}
               getUserSavedDataAPIStatus={getUserSavedDataAPIStatus}
               getUserSavedDataAPIError={getUserSavedDataAPIError}
               goToPayRequestPage={goToPayRequestPage}
            />
            }
         </Container>
      )
   }
}

export default withRouter(SelectedForm)
