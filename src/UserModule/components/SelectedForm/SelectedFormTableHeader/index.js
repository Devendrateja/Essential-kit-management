import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import DataStrings from '../../../../i18n/strings.json'

import {
   Container,
   Span,
   AlignLeft,
   AlignRight,
   S_no,
   LastCol,
   AlignCenter
} from './styledComponents'

@observer
class SelectedFormTableHeader extends React.Component {
   render() {
      const {
         SNO,
         NAME,
         DESCRIPTION,
         BRAND,
         QUANTITY,
         PRICE
      } = DataStrings.UserModule.TitleBar
      return (
         <Container>
            <S_no>
               <AlignLeft>{SNO}</AlignLeft>
            </S_no>
            <Span>
               <AlignLeft>{NAME}</AlignLeft>
            </Span>
            <Span>
               <AlignLeft>{DESCRIPTION}</AlignLeft>
            </Span>
            <Span>
               <AlignLeft>{BRAND}</AlignLeft>
            </Span>
            <Span>
               <AlignCenter>{QUANTITY}</AlignCenter>
            </Span>
            <LastCol>
               <AlignRight>{PRICE}</AlignRight>
            </LastCol>
         </Container>
      )
   }
}

export default SelectedFormTableHeader
