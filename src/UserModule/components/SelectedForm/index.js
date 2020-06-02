import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import Header from '../Header'
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
}
from './styledComponents'

@observer
class SelectedForm extends React.Component {


   render() {
      const {
         selectedFormSuccessUi,
         selectedFormData,
         apiStatus,
         getSelectedFormAPIError,
         changeSection,
         onClickRetry
      } = this.props
      return (
         <Container>
            <Header />
            <Body>
               <SelectedFormTitleBar selectedFormData={selectedFormData} />
               <LoadingWrapperWithFailure
                  renderSuccessUI={selectedFormSuccessUi}
                  onRetryClick = {onClickRetry}
                  apiStatus={apiStatus}
               />
            </Body>
            <SelectedFormFooter
               apiStatus={apiStatus}
               selectedFormData={selectedFormData}
            />
         </Container>
      )
   }
}

export default withRouter(SelectedForm)
