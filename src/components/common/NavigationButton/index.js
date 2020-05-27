import React from 'react'
import { observer } from 'mobx-react'
import { MdNavigateNext } from "react-icons/md"

import { NavContainer } from "./styledComponents.js"

@observer
class NavigationButton extends React.Component{
    render(){
        const { path } = this.props
        return (
            <NavContainer><MdNavigateNext /></NavContainer>
            )
    }
}


export default NavigationButton


