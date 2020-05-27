import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx" 
import { Span,Div } from "./styledComponents.js"

import NavigationButton from "../../../components/common/NavigationButton"
import FormStatusIcon from "../../../components/common/FormStatusIcon"

@observer
class FormsPage extends React.Component {
    render(){
        return(
        <div className="flex items-center border-black border-solid border m-2 p-2 mx-4">
            <NavigationButton />
            <FormStatusIcon />
        </div>
        )
    }
}


export default FormsPage;