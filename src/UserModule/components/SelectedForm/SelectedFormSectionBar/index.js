import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"

import SelectedFormTableHeader from "../SelectedFormTableHeader"
import SelectedFormTableRow from "../SelectedFormTableRow"

import { Typo12DarkBlueGreyHKGroteskSemiBold } from "../../../../styleGuide/Typos"

import getSelectedFormResponse from "../../../fixtures/getSelectedFormResponse.json"
import { Typo16DarkBlueGreyHKGroteskRegular } from "../../../../styleGuide/Typos"

import { Container, Span, Table, InstructionsBar, RedText, BlackText, Note, } from "./styledComponents"


@observer
class SelectedFormSectionBar extends React.Component {
    @observable listOfItems = []

    componentDidMount() {
        const { listOfSections } = this.props
        this.listOfItems = listOfSections[0].itemDetails
    }




    onSelectSection = (id) => {
        const { selectedFormData, listOfSections } = this.props
        selectedFormData.selectedSectionId = id;
        this.listOfItems = selectedFormData.selectedSectionData.itemDetails
    }



    sections = (list) => {
        return list.map((eachSection) => {
            return <Typo12DarkBlueGreyHKGroteskSemiBold key={eachSection.id} id={eachSection.id} onClick={()=>this.onSelectSection(eachSection.id)} ><Span className="">{eachSection.name}</Span></Typo12DarkBlueGreyHKGroteskSemiBold>
        })
    }



    render() {
        const { listOfSections, selectedFormData, sections } = this.props

        return (
            <div>
                {listOfSections.length !==0 &&  this.sections(listOfSections)}
                
                <Note>
                        <Typo16DarkBlueGreyHKGroteskRegular>
                            <RedText>
                                NOTE
                            </RedText>
                        </Typo16DarkBlueGreyHKGroteskRegular>
                        <Typo16DarkBlueGreyHKGroteskRegular>
                            <BlackText> 
                                : Only one set of snacks will be given to one individual .Your snacks will not be given to another person .So ,please collect them directly  
                            </BlackText>
                        </Typo16DarkBlueGreyHKGroteskRegular>
                </Note>
                <Table>
                    <SelectedFormTableHeader />
                    {
                        this.listOfItems.length !==0 &&
                        this.listOfItems.map((eachItem,index) => {
                       
                            return <SelectedFormTableRow key={eachItem.id} sno={index+1} selectedFormData={selectedFormData}  item={eachItem} />
                        })
                    }
                    
                </Table>
            </div>
        )


    }
}


export default SelectedFormSectionBar
