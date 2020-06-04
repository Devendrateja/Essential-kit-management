import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
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
      let totalCost
      if (apiStatus === API_SUCCESS) {
         let total = selectedFormData.userSelectedQuantityAndCost
         totalCost = total.totalCost
      }

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
                  {Save}
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

