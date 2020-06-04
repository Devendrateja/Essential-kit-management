import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import dataStrings from '../../../../i18n/strings.json'
import { Typo12BrightBlueRubikRegular } from "../../../../styleGuide/Typos"

import {
   Container,
   Span,
   AlignLeft,
   AlignRight,
   Sno,
   ItemName,
   OutOfStackTag

} from './styledComponents'


class ClosedFormItemBar extends React.Component{
   render() {
      
      const { index , item } = this.props
      const {
         sno,
         name,
         itemsAdded,
         itemsRecieved,
         costIncurred,
         
      } = dataStrings
      return (
         <Container>
            <Sno>
               <AlignLeft>{index}</AlignLeft>
            </Sno>
            <ItemName>
               <AlignLeft>{item.itemName}
               <OutOfStackTag>
               {
                  item.itemsAdded !== item.itemsRecieved && 
                  <Typo12BrightBlueRubikRegular>out of stock</Typo12BrightBlueRubikRegular>
               }
               </OutOfStackTag>
               </AlignLeft>
            </ItemName>
            <Span>
               <AlignRight>{item.itemsAdded}</AlignRight>
            </Span>
            <Span>
               <AlignRight>{item.itemsRecieved}</AlignRight>
            </Span>
            <Span>
               <AlignRight>{item.costIncurred}</AlignRight>
            </Span>

         </Container>
      )
   }
}


export default ClosedFormItemBar;










































