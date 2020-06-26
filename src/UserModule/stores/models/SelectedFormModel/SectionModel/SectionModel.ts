import React from 'react'
import { observable, action, computed } from 'mobx'
import ItemModel from '../ItemModel'

import {
   SelectedFormSectionDetails,
   SelectedFormItemDetails
} from '../../../type'

class SectionModel {
   id: number
   @observable name: string
   @observable description: string
   @observable itemDetails: Array<ItemModel>

   constructor(section: SelectedFormSectionDetails) {
      this.id = section.section_id
      this.name = section.section_name
      this.description = section.description
      this.itemDetails = section.item_details.map(eachItem => {
         const newItem = new ItemModel(eachItem)
         return newItem
      })
   }
}

export default SectionModel
