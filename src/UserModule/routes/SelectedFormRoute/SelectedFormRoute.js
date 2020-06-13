import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { clearUserSession } from '../../../utils/StorageUtils.js'
import NoDataView from '../../../components/common/NoDataView'

import {PAY_REQUEST_PATH, USER_HOME_PATH} from "../../constants/RouteConstants"



import SelectedForm from '../../components/SelectedForm'
import SelectedFormSectionBar from '../../components/SelectedForm/SelectedFormSectionBar'

import withNavigation from "../../hocs/withNavigation"


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

   setIstructions = instructions => {
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
                  {this.setIstructions(selectedFormData.formDescription)}
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
      const { goToSignInPage } = this.props
      clearUserSession()
      goToSignInPage();
   }


   render() {
      let selectedFormId = this.props.match.params.id
      
      const { goToPayRequestPage, goToHomePage,goToWalletPage } = this.props
      
      
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
            goToPayRequestPage={goToPayRequestPage}
            goToHomePage={goToHomePage}
            goToWalletPage={goToWalletPage}
         />
      )
   }
}

export default withNavigation(SelectedFormRoute)
