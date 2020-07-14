import { types } from 'mobx-state-tree'
//import React from 'react'
//import { observable, action, computed } from 'mobx'
import ItemModelWithMST from '../ItemModelWithMST'
import { CreateBrands } from '../ItemModelWithMST/ItemModelWithMST'
import {
   SelectedFormSectionDetails,
   SelectedFormItemDetails
} from '../../../type'

export const CreateItems = Items => {
   return Items.map(eachItem => {
      return ItemModelWithMST.create({
         id: eachItem.item_id,
         name: eachItem.Item_name,
         description: eachItem.description,
         brands: CreateBrands(Items.brands),
         selectedBrandId: 0,
         totalPriceOfAnItem: 0,
         selectedQuantityPerItem: 0
      })
   })
}

const SectionModelWithMST = types.model({
   id: types.number,
   name: types.string,
   description: types.string,
   itemDetails: types.array(ItemModelWithMST)
})

export default SectionModelWithMST

// class SectionModel {
//    id: number
//    @observable name: string
//    @observable description: string
//    @observable itemDetails: Array<ItemModel>

//    constructor(section: SelectedFormSectionDetails) {
//       this.id = section.section_id
//       this.name = section.section_name
//       this.description = section.description
// this.itemDetails = section.item_details.map(eachItem => {
//    const newItem = new ItemModel(eachItem)
//    return newItem
// })
//    }
// }
