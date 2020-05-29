import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { NavDown } from '../../../styleGuide/images'
import DataStrings from '../../../i18n/strings.json'

import {
   Container,
   Span,
   AlignLeft,
   AlignRight,
   S_no,
   LastCol
} from './styledComponents'

@observer
class TableHeader extends React.Component {
   render() {
      const {
         SNO,
         NAME,
         STATUS,
         DATE,
         TOTALITEMS,
         PENDINGITEMS,
         ESTIMATEDCOST,
         COSTINCURRED
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
               <AlignLeft>{STATUS}</AlignLeft>
            </Span>
            <Span>
               <AlignLeft>{DATE}</AlignLeft>
            </Span>
            <Span>
               <AlignRight>{TOTALITEMS}</AlignRight>
            </Span>
            <Span>
               <AlignRight>{PENDINGITEMS}</AlignRight>
            </Span>
            <Span>
               <AlignRight>{ESTIMATEDCOST}</AlignRight>
            </Span>
            <LastCol>
               <AlignRight>{COSTINCURRED}</AlignRight>
            </LastCol>
         </Container>
      )
   }
}

export default TableHeader

//<img src={NavDown.src} alt={NavDown.alt}/>
