import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { FcNext, FcPrevious } from 'react-icons/fc'

import { Container, Span, Button, Input } from './styledComponents'

@observer
class Pagination extends React.Component {
   pageChanged = true

   onChangeInput(event) {
      const { currentPage } = this.props
      console.log(event.target.value)
      currentPage = event.target.value
   }
   render() {
      const {
         currentPage,
         goToNextPage,
         goToPreviousPage,
         onEnterPageNumber,
         offset,
         limitedNoOfFormsPerPage,
         totalNoOfForms
      } = this.props

      this.pageChanged = true

      const currentPageNo = parseInt(
         (offset + limitedNoOfFormsPerPage) / limitedNoOfFormsPerPage
      )
      let pages = parseInt(totalNoOfForms / limitedNoOfFormsPerPage)
      let remainingPages = parseInt(totalNoOfForms % limitedNoOfFormsPerPage)
      const totalNoOfPages = pages + remainingPages
      console.log('total no', totalNoOfForms)

      return (
         <Container>
            <Button
               onClick={goToPreviousPage}
               disabled={currentPageNo <= 1 ? true : false}
            >
               {'<'}
            </Button>
            <Span border={currentPageNo === 1 ? true : false}>1</Span>
            <span>&nbsp;..&nbsp;</span>
            {currentPageNo !== 1 && currentPageNo !== totalNoOfPages && (
               <span>
                  <Span border={true}>{currentPageNo}</Span>
                  <span>&nbsp;..&nbsp;</span>
               </span>
            )}
            <Span border={currentPageNo === totalNoOfPages ? true : false}>
               {totalNoOfPages}
            </Span>
            <Button
               onClick={goToNextPage}
               disabled={currentPageNo >= totalNoOfPages ? true : false}
            >
               {'>'}
            </Button>
         </Container>
      )
   }
}

export default Pagination
// <Input
//                      border={true}
//                      value={this.pageChanged ? currentPageNo : currentPage}
//                      onKeyDown={onEnterPageNumber}
//                      onChange={this.onChangeInput}
//                   />