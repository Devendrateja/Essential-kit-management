import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import DataStrings from '../../../../i18n/strings.json'
import {
   Container,
   ItemTitle,
   AlignLeft,
   AlignRight,
   Sno,
   ItemName
} from './styledComponents'

class ClosedFormItemHeader extends React.Component {
   render() {
      const { sno, name, itemsAdded, itemsRecieved, costIncurred } = DataStrings
      return (
         <Container>
            <Sno>
               <AlignLeft>{sno}</AlignLeft>
            </Sno>
            <ItemName>
               <AlignLeft>{name}</AlignLeft>
            </ItemName>
            <ItemTitle>
               <AlignRight>{itemsAdded}</AlignRight>
            </ItemTitle>
            <ItemTitle>
               <AlignRight>{itemsRecieved}</AlignRight>
            </ItemTitle>
            <ItemTitle>
               <AlignRight>{costIncurred}</AlignRight>
            </ItemTitle>
         </Container>
      )
   }
}

export default ClosedFormItemHeader
