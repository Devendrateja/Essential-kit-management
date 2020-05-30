import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"

import SelectedFormTableHeader from "../SelectedFormTableHeader"
import SelectedFormTableRow from "../SelectedFormTableRow"

import { Typo12DarkBlueGreyHKGroteskSemiBold } from "../../../../styleGuide/Typos"

import getSelectedFormResponse from "../../../fixtures/getSelectedFormResponse.json"
import {  Typo16DarkBlueGreyHKGroteskRegular } from "../../../../styleGuide/Typos"

import { Container, Span, Table,InstructionsBar,RedText,BlackText,Note, } from "./styledComponents"


@observer
class SelectedFormSectionBar extends React.Component{
    @observable listOfItems = []
    
    // listOfItems = (items) => {
    //     console.log("items in the listOfItems", items)
    //     return items.map((eachItem,index) => {
    //                 return  <SelectedFormTableRow key={index} itemDetails={eachItem}  />
    //     });
    // }
    componentDidMount(){
        const { listOfSections } = this.props
        this.listOfItems = listOfSections[0].itemDetails
    }
    
    
    onSelectSection=(items)=>{
        console.log("onSelectSection", items)
    //     return (
    //         <Table>
    //             <SelectedFormTableHeader />
    //                 {
    //                     this.listOfItems(items)
    //                 }
    //         </Table>
    //         )
            
    }
    
    
    sections = (list) => {
        return list.map((eachSection) => {
            return <Typo12DarkBlueGreyHKGroteskSemiBold key={eachSection.id} onClick={()=>this.onSelectSection(eachSection.itemDetails)} ><Span>{eachSection.name}</Span></Typo12DarkBlueGreyHKGroteskSemiBold>
        })
    }
    
    render(){
        const { listOfSections } = this.props
        
        return(
            <div>
                {this.sections(listOfSections)}
                
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
                        this.listOfItems.map(eachItem => {
                            return <SelectedFormTableRow key={eachItem.id} item={eachItem}/>
                        })
                    }
                    
                </Table>
            </div>
            )
            
            
    }
}


export default SelectedFormSectionBar