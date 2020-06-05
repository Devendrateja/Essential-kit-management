import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { API_FETCHING, API_SUCCESS, API_FAILED ,API_INITIAL} from '@ib/api-constants'
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
   
   
   getButtonText = (apiStatus) => {
      let buttonText ;
      switch(apiStatus){
         
         case API_SUCCESS :
            buttonText = "Saved";
            break;
            
         case API_INITIAL:
            buttonText = "Save"
            break;
            
         case API_FETCHING :
            buttonText = "Saving..."
            break;
      }
      return buttonText
      
   }
   
   
   saveUserData = () => {
      const { selectedFormData ,updateUserSelectedFormData} = this.props
      const data = selectedFormData.updateUserData()
      const id = selectedFormData.fromId
      console.log("saved response",id, data)
      updateUserSelectedFormData(id,data)
      
   }

   render() {
      const {
         ItemsAdded,
         TotalCost,
         ProceedToPay,
         Save
      } = DataStrings.seletedFormFooter

      const { getUserSavedDataAPIStatus:apiStatusOfSavedData, apiStatusOfSelectedFormData:apiStatusOfSelectedForm , selectedFormData,updateUserSelectedFormData } = this.props
      let saveButtonText = this.getButtonText(apiStatusOfSavedData)
      
      
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
               <SaveButton
                  
                  onClick={this.saveUserData}
               >
                  {
                    Save
                  }
               </SaveButton>
               <Button disabled={apiStatusOfSavedData !== API_SUCCESS ? true : false}>
                  {ProceedToPay}
               </Button>
            </UpdateBlock>
         </Footer>
      )
   }
}

export default SelectedFormFooter
//disabled={(apiStatusOfSelectedForm === API_SUCCESS) || (apiStatusOfSelectedForm === API_INITIAL) ? false : true}