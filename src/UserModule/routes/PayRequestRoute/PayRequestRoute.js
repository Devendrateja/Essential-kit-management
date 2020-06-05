import React from 'react'
import { observer,  inject } from 'mobx-react'
import { observable} from 'mobx'

import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'


import PayRequestPage from "../../components/PayRequestPage"

@observer
class PayRequestRoute extends React.Component{
    render(){
        return(
            <div>
                <PayRequestPage />
            </div>
            )
    }
}




export default withRouter(PayRequestRoute);