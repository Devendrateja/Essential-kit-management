import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx" 
import { Span,Div } from "./styledComponents.js"
import { BsDot } from "react-icons/bs"


import { IconContainer } from "./styledComponents.js"


@observer
class FormStatusIcon extends React.Component {
    render(){
        const { formStatus } = this.props
        return(
            <IconContainer><BsDot /></IconContainer>
        )
    }
}


export default FormStatusIcon;