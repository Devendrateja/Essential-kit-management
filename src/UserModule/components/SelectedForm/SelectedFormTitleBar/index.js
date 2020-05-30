import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"

import { Typo12SteelHKGroteskRegular, Typo32DarkBlueGreyHKGroteskRegular, TextStyle7 } from "../../../../styleGuide/Typos"
import { NavBack } from "../../../../styleGuide/images"

import { Container } from "./styledComponents"

@observer
class SelectedFormTitleBar extends React.Component {
    render(){
        const { formName } = this.props
        return (
            <Container>
            <div className="flex">
                <img src={NavBack.src} alt={NavBack.alt} />
                <Typo12SteelHKGroteskRegular> Back to list</Typo12SteelHKGroteskRegular>
            </div>
            <Typo32DarkBlueGreyHKGroteskRegular>SnacksForm</Typo32DarkBlueGreyHKGroteskRegular>
            <TextStyle7>Close on : 26 may 8pm</TextStyle7>
            </Container>
            )
    }
}



export default SelectedFormTitleBar;