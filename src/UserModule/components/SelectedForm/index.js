import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { Redirect} from "react-router-dom"
import { withRouter } from "react-router-dom"

import  Header  from "../Header"
import SelectedFormTitleBar from "./SelectedFormTitleBar"
import SelectedFormSectionBar from "./SelectedFormSectionBar"


import getSelectedFormResponse from "../../fixtures/getSelectedFormResponse.json"
import LoadingWrapperWithFailure from "../../../components/common/LoadingWrapperWithFailure"


import { Typo18DarkBlueGreyHKGroteskBold, Typo16DarkBlueGreyHKGroteskRegular } from "../../../styleGuide/Typos"


import { Container,Body,InstructionsBar,RedText,BlackText,Note,Table } from "./styledComponents"




@observer
class SelectedForm extends React.Component{
    
    selectedFormSuccessUi = () => {
        let sectionDetails = getSelectedFormResponse.sectionDetails
        return( <SelectedFormSectionBar  listOfSections ={ sectionDetails } /> )
    }
    
    
    
    render(){
        const {instructions } = this.props
        return(
            <Container>
                <Header />
                <Body>
                    <SelectedFormTitleBar />
                    <InstructionsBar>
                        <Typo18DarkBlueGreyHKGroteskBold>INSTRUCTIONS</Typo18DarkBlueGreyHKGroteskBold>
                        <Typo16DarkBlueGreyHKGroteskRegular>
                            1. Only one set of nacks will be given to one individual .
                                Your snacks will not be given to another person .
                                So ,please collect them directly  
                                <br/>
                            2. If you want to make any changes after submitting the form 
                                (Snacks form and payment confirmation form),you can edit
                                the submitted form using the link that is send to your email.
                        </Typo16DarkBlueGreyHKGroteskRegular>
                    </InstructionsBar>
                    <LoadingWrapperWithFailure
                    renderSuccessUI = {this.selectedFormSuccessUi}
                    apiStatus={200}
                    
                    />
                    
                    
                </Body>
            </Container>
        )
    }
}

export default withRouter(SelectedForm);