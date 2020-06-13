import React from 'react'
import { observer } from 'mobx-react'
import {
   Typo14WhiteHKGroteskSemiBold,
   TextStyle4
} from '../../../../styleGuide/Typos'
import dataStrings from '../../../../i18n/strings.json'

import { FooterContainer, FooterColumn } from './styledComponents.js'

@observer
class ClosedFormFooter extends React.Component {
   render() {
      const {
         ItemsAdded,
         ItemsRecieved,
         CostIncurred
      } = dataStrings.seletedFormFooter
      const { footerData } = this.props
      return (
         <FooterContainer>
            <FooterColumn>
               <Typo14WhiteHKGroteskSemiBold>{`${ItemsAdded} : ${footerData.itemsAdded}`}</Typo14WhiteHKGroteskSemiBold>
               <Typo14WhiteHKGroteskSemiBold>{`${ItemsRecieved} : ${footerData.itemsRecieved}`}</Typo14WhiteHKGroteskSemiBold>
            </FooterColumn>
            <FooterColumn>
               <TextStyle4>{`${CostIncurred} : ${footerData.costIncurred}`}</TextStyle4>
            </FooterColumn>
         </FooterContainer>
      )
   }
}

export default ClosedFormFooter
