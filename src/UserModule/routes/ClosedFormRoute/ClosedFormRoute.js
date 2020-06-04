import React from 'react'
import { observer,  inject } from 'mobx-react'
import { observable} from 'mobx'

import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'


import { clearUserSession } from '../../../utils/StorageUtils.js'
import NoDataView from '../../../components/common/NoDataView'



import ClosedForm from "../../components/ClosedForm"


@inject("closedFormStore")
@observer
class ClosedFormRoute extends React.Component {
    
    componentDidMount(){
        const {getClosedFormData} = this.props.closedFormStore
        getClosedFormData()
    }
    
     signOut = () => {
      clearUserSession()
      this.redirectToSignInPage()
   }

   redirectToSignInPage = () => {
      const { history } = this.props
      const signin = history.push('/essential-kit-management/signin')
      return <div>{signin}</div>
   }
   
   onClickRetry=()=>{
       const {getClosedFormData} = this.props.closedFormStore
        getClosedFormData()
   }
   

    

    render() {
        const { closedFormList,totalItemsDetailsWithCostIncurred,getClosedFormAPIStaus,getClosedFormAPIError } = this.props.closedFormStore
        
        return (
            <ClosedForm 
                closedFormList={closedFormList}
                signOut={this.signOut}
                footerData={totalItemsDetailsWithCostIncurred}
                apiStatus={getClosedFormAPIStaus}
                apiError={getClosedFormAPIError}
                onClickRetry={this.onClickRetry}
            />
        )
    }

}



export default ClosedFormRoute;