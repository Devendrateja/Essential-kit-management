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
   render() {
      const {
         ItemsAdded,
         TotalCost,
         ProceedToPay,
         Save
      } = DataStrings.seletedFormFooter
      
      
      const { apiStatus, selectedFormData } = this.props
      if(apiStatus === API_SUCCESS){
         console.log(selectedFormData.totalItems, "footer")
      }
      else{
         console.log("not reachable")
      }
      
      return (
         <Footer>
            <ValuationRow>
               <Typo14WhiteHKGroteskSemiBold>
               {
                  apiStatus===API_SUCCESS ? ` ${ItemsAdded} : ${selectedFormData.totalItems} ` : `${ItemsAdded}`
               }
                  
               </Typo14WhiteHKGroteskSemiBold>
               <Typo14WhiteHKGroteskSemiBold>
                  {TotalCost} :
               </Typo14WhiteHKGroteskSemiBold>
            </ValuationRow>
            <UpdateBlock>
               <SaveButton>{Save}</SaveButton>
               <Button>{ProceedToPay}</Button>
            </UpdateBlock>
         </Footer>
      )
   }
}


export default SelectedFormFooter
