import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { clearUserSession } from '../../../utils/StorageUtils.js'
import NoDataView from '../../../components/common/NoDataView'

import SelectedForm from '../../components/SelectedForm'
import SelectedFormSectionBar from '../../components/SelectedForm/SelectedFormSectionBar'

import {
   Typo18DarkBlueGreyHKGroteskBold,
   Typo16DarkBlueGreyHKGroteskRegular,
   Typo12DarkBlueGreyHKGroteskSemiBold
} from '../../../styleGuide/Typos'

import {
   Container,
   Body,
   InstructionsBar,
   RedText,
   BlackText,
   Note,
   Table
} from '../../components/SelectedForm/styledComponents'

@inject('selectedFormStore')
@observer
class SelectedFormRoute extends React.Component {
   componentDidMount() {
      const formId = this.props.match.params.id
      const { getSelectedFormData } = this.props.selectedFormStore
      getSelectedFormData(formId)
   }
   
   setIstructions=(instructions)=>{
      return instructions
      //.replace(/(?:\ r\n|\r|\n)/g, <br/>);
   }
   
   

   selectedFormSuccessUi = () => {
      const {
         selectedFormData,
         changeSection,
         filterSectionDetails
      } = this.props.selectedFormStore

      let sectionDetails = selectedFormData.sectionDetails

      if (sectionDetails.length === 0) {
         return <NoDataView />
      }

      return (
         <div>
            <InstructionsBar>
               <Typo18DarkBlueGreyHKGroteskBold>
                  INSTRUCTIONS
               </Typo18DarkBlueGreyHKGroteskBold>
               <Typo16DarkBlueGreyHKGroteskRegular>
                {this.setIstructions( selectedFormData.formDescription)}
               </Typo16DarkBlueGreyHKGroteskRegular>
            </InstructionsBar>

            <SelectedFormSectionBar
               selectedFormData={selectedFormData}
               listOfSections={sectionDetails}
            />
         </div>
      )
   }
   onClickRetry = () => {
      const { getSelectedFormData } = this.props
      const formId = this.props.match.params.id
      getSelectedFormData(formId)
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
      let selectedFormId = this.props.match.params.id
      
      const {
         selectedFormData,
         getSelectedFormAPIStatus,
         getSelectedFormAPIError,
         changeSection,
         updateUserSelectedFormData,
         getUserSavedDataAPIError,
         getUserSavedDataAPIStatus
      } = this.props.selectedFormStore
      
      
      return (
         <SelectedForm
            selectedFormSuccessUi={this.selectedFormSuccessUi}
            apiStatus={getSelectedFormAPIStatus}
            onClickRetry={this.onClickRetry}
            getSelectedFormAPIError={getSelectedFormAPIError}
            selectedFormData={selectedFormData}
            changeSection={changeSection}
            signOut={this.signOut}
            selectedFormId={selectedFormId}
            updateUserSelectedFormData={updateUserSelectedFormData}
            getUserSavedDataAPIError={getUserSavedDataAPIError}
            getUserSavedDataAPIStatus={getUserSavedDataAPIStatus}
         />
      )
   }
}

export default SelectedFormRoute
//  1. Only one set of nacks will be given to one individual .
//                   Your snacks will not be given to another person . So ,please
//                   collect them directly
//                   <br />
//                   2. If you want to make any changes after submitting the form
//                   (Snacks form and payment confirmation form),you can edit the
//                   submitted form using the link that is send to your email.