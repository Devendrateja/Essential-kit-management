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
            buttonText = 
      }
      
   }
   
   
   
   
   
   
   
   saveUserData = () => {
      const { selectedFormData } = this.props
      const data = selectedFormData.updateUserData()
      console.log('updated userData', data)
   }

   render() {
      const {
         ItemsAdded,
         TotalCost,
         ProceedToPay,
         Save
      } = DataStrings.seletedFormFooter

      const { apiStatus, selectedFormData } = this.props
      let savedButtonText = this.getButtonText(apiStatus)
      
      
      return (
         <Footer>
            <ValuationRow>
               <Typo14WhiteHKGroteskSemiBold>
                  {apiStatus === API_SUCCESS
                     ? ` ${ItemsAdded} : ${selectedFormData.userSelectedQuantityAndCost.itemsAdded} `
                     : `${ItemsAdded}`}
               </Typo14WhiteHKGroteskSemiBold>
               <Typo14WhiteHKGroteskSemiBold>
                  {apiStatus === API_SUCCESS
                     ? ` ${TotalCost} : ${selectedFormData.userSelectedQuantityAndCost.totalCost} `
                     : `${ItemsAdded}`}
               </Typo14WhiteHKGroteskSemiBold>
            </ValuationRow>
            <UpdateBlock>
               <SaveButton
                  disabled={apiStatus !== API_SUCCESS ? true : false}
                  onClick={this.saveUserData}
               >
                  {
                     
                  }
               </SaveButton>
               <Button disabled={apiStatus !== API_SUCCESS ? true : false}>
                  {ProceedToPay}
               </Button>
            </UpdateBlock>
         </Footer>
      )
   }
}

export default SelectedFormFooter
// //
// let totalCost
//       if (apiStatus === API_SUCCESS) {
//          let total = selectedFormData.userSelectedQuantityAndCost
//          totalCost = total.totalCost
//       }