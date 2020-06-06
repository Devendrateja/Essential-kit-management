import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import {
   API_FETCHING,
   API_SUCCESS,
   API_FAILED,
   API_INITIAL
} from '@ib/api-constants'
import { Typo14WhiteHKGroteskSemiBold } from '../../../../styleGuide/Typos'
import DataStrings from '../../../../i18n/strings.json'

import {
   Footer,
   Button,
   SaveButton,
   ValuationRow,
   UpdateBlock
} from './styledComponents'

@observer
class SelectedFormFooter extends React.Component {
   
   
   getButtonText = apiStatus => {
      let buttonText= {
         saveButtonText:"",
         proceedButtonText:"Proceed To Pay"
      }
      
      
      switch (apiStatus) {
         case API_SUCCESS:
            buttonText.saveButtonText = 'Saved'
            break;

         case API_INITIAL:
            buttonText.saveButtonText = 'Save'
            break;

         case API_FETCHING:
            buttonText.saveButtonText = 'Saving...'
            buttonText.proceedButtonText = "proceeding..."
            break;
            
         case API_FAILED:
            buttonText.saveButtonText = "Try Again" 
            buttonText.proceedButtonText ="Proceed To Pay"
      }
      return buttonText
   }

   saveUserData = () => {
      const { selectedFormData, updateUserSelectedFormData } = this.props
      const data = selectedFormData.updateUserData()
      const id = selectedFormData.fromId
      console.log('saved response', id, data)
      updateUserSelectedFormData(id, data)
   }
   
   updateUserDataBeforeProceedToPay = () => {
      this.saveUserData()
      const {goToPayRequestPage} = this.props
      goToPayRequestPage();
   }
   
   

   render() {
      const {
         ItemsAdded,
         TotalCost,
         ProceedToPay,
         Save
      } = DataStrings.seletedFormFooter

      const {
         getUserSavedDataAPIStatus: apiStatusOfSavedData,
         apiStatusOfSelectedFormData: apiStatusOfSelectedForm,
         selectedFormData,
         updateUserSelectedFormData,
         goToPayRequestPage
      } = this.props
      let buttonText = this.getButtonText(apiStatusOfSavedData)

      return (
         <Footer>
            <ValuationRow>
               <Typo14WhiteHKGroteskSemiBold>
                  {apiStatusOfSelectedForm === API_SUCCESS
                     ? ` ${ItemsAdded} : ${selectedFormData.userSelectedQuantityAndCost.itemsAdded} `
                     : `${ItemsAdded}`}
               </Typo14WhiteHKGroteskSemiBold>
               <Typo14WhiteHKGroteskSemiBold>
                  {apiStatusOfSelectedForm === API_SUCCESS
                     ? ` ${TotalCost} : ${selectedFormData.userSelectedQuantityAndCost.totalCost} `
                     : `${ItemsAdded}`}
               </Typo14WhiteHKGroteskSemiBold>
            </ValuationRow>
            <UpdateBlock>
               <SaveButton  onClick={this.saveUserData}>{buttonText.saveButtonText}</SaveButton>
               <Button
                 onClick={this.updateUserDataBeforeProceedToPay}
               >
                  {buttonText.proceedButtonText}
               </Button>
            </UpdateBlock>
         </Footer>
      )
   }
}

export default SelectedFormFooter
