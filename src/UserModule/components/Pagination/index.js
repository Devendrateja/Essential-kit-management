import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { FcNext, FcPrevious } from 'react-icons/fc'

import { Container, Span, Button } from './styledComponents'

@observer
class Pagination extends React.Component {
   render() {
      const {
         currentPage,
         totalPages,
         goToNextPage,
         goToPreviousPage
      } = this.props
      return (
         <Container>
            <Button
               onClick={goToPreviousPage}
               disabled={currentPage <= 1 ? true : false}
            >
               {'<'}
            </Button>
            <Span>1</Span>
            <Span>..</Span>
            {currentPage !== 1 && currentPage !== totalPages && (
               <span>
                  <Span>{currentPage}</Span>
                  <Span>..</Span>
               </span>
            )}
            <Span>{totalPages}</Span>
            <Button
               onClick={goToNextPage}
               disabled={currentPage >= totalPages ? true : false}
            >
               {'>'}
            </Button>
         </Container>
      )
   }
}

export default Pagination
