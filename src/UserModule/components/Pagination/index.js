import React from 'react'
import { observer , inject} from 'mobx-react'
import { observable } from 'mobx'
import { FcNext, FcPrevious } from 'react-icons/fc'

import { Container, Span, Button, Input } from './styledComponents'




@observer
class Pagination extends React.Component {
   limit = 4
   @observable currentPage = 0
   @observable offset = 0

   componentDidMount() {
      const {  initialisePaginationStore} = this.props
      initialisePaginationStore(this.limit, this.offset)
   }
   
   
   goToPreviousPage = () => {
      const { goToPreviousPage } = this.props
      goToPreviousPage()
   }
   
   
   goToNextPage = () => {
      const { goToNextPage } = this.props
      goToNextPage()
   }
   

   render() {
      const {
         goToNextPage,
         goToPreviousPage,
         currentPageAndTotalPages
      } = this.props

      

      if( currentPageAndTotalPages !== undefined){
         const currentPageNo = currentPageAndTotalPages.currentPage
         const totalNoOfPages = currentPageAndTotalPages.totalPages
         return (
            <Container>
               <Button
                  onClick={this.goToPreviousPage}
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
               {
                  
                     <Span border={currentPageNo === totalNoOfPages ? true : false}>
                     {totalNoOfPages}
                     </Span>
               }
               
               <Button
                  onClick={this.goToNextPage}
                  disabled={currentPageNo >= totalNoOfPages ? true : false}
               >
                  {'>'}
               </Button>
            </Container>
         )
      }
      
      return <div></div>
   }
}

export default Pagination