import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"


import DataStrings from '../../../../i18n/strings.json'



import {
   Container,
   Span,
   AlignLeft,
   AlignRight,
   S_no,
   LastCol
} from './styledComponents'



@observer
class SelectedFormTableRow extends React.Component{
   @observable brand = []
   @observable qty = []
   
    render(){
        
        const { item } = this.props
        console.log(item.name, item.brands)
       
        const {
         SNO,
         NAME,
         DESCRIPTION,
         BRAND,
         QUANTITY,
         PRICE
      } = DataStrings.UserModule.TitleBar
        return(
             <Container>
            <S_no>
               <AlignLeft>{SNO}</AlignLeft>
            </S_no>
            <Span>
               <AlignLeft>{item.name}</AlignLeft>
            </Span>
            <Span>
               <AlignLeft>{item.description}</AlignLeft>
            </Span>
            <Span>
               <AlignLeft>{BRAND}</AlignLeft>
            </Span>
            <Span>
               <AlignLeft>{QUANTITY}</AlignLeft>
            </Span>
            <LastCol>
               <AlignRight>{PRICE}</AlignRight>
            </LastCol>
         </Container>
        )
    }
}





export default SelectedFormTableRow;