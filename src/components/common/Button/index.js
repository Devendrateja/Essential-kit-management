import React from "react" 
import { observer } from "mobx-react"
import { API_INITIAL,API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'


import { ButtonEl } from "./styledComponents.js"



@observer
class Button extends React.Component {
    
    render(){
        const {
            onClickButton,
            buttonValue,
            apiStatus,
            buttonCSS
        } = this.props
        
        return(
            <ButtonEl buttonCSS={buttonCSS} onClick={onClickButton} disabled={(apiStatus=== API_FETCHING) ? true : false}>
            { buttonValue }
            </ButtonEl>
            )
    }
}


export default Button ;

  