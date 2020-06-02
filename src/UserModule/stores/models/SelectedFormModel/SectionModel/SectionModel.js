import React from 'react'
import { observable, action, computed } from 'mobx'
import ItemModel from '../ItemModel'

class SectionModel {
   id
   @observable name
   @observable description
   @observable itemDetails
   @observable selectedItemId
   

   constructor(section) {
      this.id = section.section_id
      this.name = section.section_name
      this.description = section.description
      this.itemDetails = section.item_details.map(eachItem => {
         const newItem = new ItemModel(eachItem)
         return newItem
      })
   }
   
   
   @computed
   get slectedItemData(){
      return this.itemDetails.find(eachItem => {
         return eachItem.id === this.selectedItemId
      })
   }
   
}

export default SectionModel
