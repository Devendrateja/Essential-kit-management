import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { Redirect} from "react-router-dom"
import { withRouter } from "react-router-dom"

import  Header  from "../Header"



@observer
class SelectedForm extends React.Component{
    render(){
        return(
            <div>
                <Header />
            </div>
            )
    }
}

export default withRouter(SelectedForm);