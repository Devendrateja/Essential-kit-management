import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'


import { USER_HOME_PATH } from '../../constants/RouteConstants'
import Header from "../../../components/common/Header"
import ClosedFormFooter from "./ClosedFormFooter"
import NavigationButton from "../../../components/common/NavigationButton"
import ClosedFormItemHeader from "./ClosedFormItemHeader"
import ClosedFormItemBar from "./ClosedFormItemBar"

import NoDataView from "../../../components/common/NoDataView"
import LoadingWrapperWithFailure from "../../../components/common/LoadingWrapperWithFailure"


import { Typo32DarkBlueGreyHKGroteskRegular } from "../../../styleGuide/Typos"
import dataStrings from "../../../i18n/strings.json"
import { ClosedFormContainer, Body ,NavButton, Titile, Items} from "./styledComponents"


@observer
class ClosedForm extends React.Component {
   
   
   renderSuccessUI=()=>{
      const { closedFormList } = this.props
      if(closedFormList.length ===0 ){
         return <NoDataView/>
      }
      return closedFormList.map((eachItem,index) => {
         return <ClosedFormItemBar key={eachItem.itemId} index={index+1} item={eachItem}/>
      })
   }
   
   
   render() {
      const { detailsOfItems } =  dataStrings
      const { signOut, footerData , apiStatus, apiError,onClickRetry} = this.props
      
      return (
         <ClosedFormContainer>
            <Header signOut={signOut}/>
            <Body>
               <NavButton ><NavigationButton path={USER_HOME_PATH}/></NavButton>
               <Titile ><Typo32DarkBlueGreyHKGroteskRegular>{ detailsOfItems }</Typo32DarkBlueGreyHKGroteskRegular></Titile>
               <ClosedFormItemHeader />
               <Items>
                  <LoadingWrapperWithFailure
                  renderSuccessUI={this.renderSuccessUI}
                  apiStatus = {apiStatus}
                  onRetryClick={onClickRetry}
                  apiError={apiError}
                  />
               </Items>
            </Body>
            <ClosedFormFooter
               footerData={footerData}
            />
         </ClosedFormContainer>
         )
   }
}

export default ClosedForm
