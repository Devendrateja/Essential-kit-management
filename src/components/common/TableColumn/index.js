import React from 'react'
import { observer } from 'mobx-react'

import { Typo12SteelHKGroteskSemiBold } from "../../../styleGuide/Typos"
import { Container, Span, S_no } from './styledComponents'

@observer
class TableColumn extends React.Component {
   render() {
      const { listOfCells } = this.props
      return (
         <Container>
            {listOfCells.map(eachelement => {
               return <Span key={eachelement}><Typo12SteelHKGroteskSemiBold>{eachelement}</Typo12SteelHKGroteskSemiBold></Span>
            })}
         </Container>
      )
   }
}

// <S_no><AlignLeft></AlignLeft></S_no>
export default TableColumn
