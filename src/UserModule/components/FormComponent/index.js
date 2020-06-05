import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { Typo14SteelHKGroteskRegular } from '../../../styleGuide/Typos'
import {
   Container,
   Span,
   AlignLeft,
   AlignRight,
   S_no,
   LastCol
} from './styledComponents'

@observer
class FormComponent extends React.Component {
   render() {
      const { sno, newForm, getStatusOfForm, onSelectForm } = this.props

      let status = getStatusOfForm(newForm)
      console.log("stats o date", status)
      return (
         <Container
            onClick={() => onSelectForm(newForm.formId, newForm.formStatus)}
         >
            <S_no>
               <AlignLeft>{sno}</AlignLeft>
            </S_no>
            <Span>
               <AlignLeft>{newForm.formName}</AlignLeft>
            </Span>
            <Span>
               <AlignLeft>
                  {status.statusIcon} &nbsp;{newForm.formStatus}
               </AlignLeft>
            </Span>
            <Span>
               <AlignLeft>{status.date}</AlignLeft>
            </Span>
            <Span>
               <AlignRight>{newForm.totalItems}</AlignRight>
            </Span>
            <Span>
               <AlignRight>{newForm.itemsPending}</AlignRight>
            </Span>
            <Span>
               <AlignRight>₹{newForm.totalEstimatedCost}/_</AlignRight>
            </Span>
            <LastCol>
               <AlignRight>
                  ₹{newForm.costIncurredForDeliveredItems}/_
               </AlignRight>
            </LastCol>
         </Container>
      )
   }
}

export default FormComponent
