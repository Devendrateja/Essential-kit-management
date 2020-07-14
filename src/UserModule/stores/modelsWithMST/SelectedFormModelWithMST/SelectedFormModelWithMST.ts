import { types } from 'mobx-state-tree'

// import React from 'react'
// import { observable, action, computed } from 'mobx'

import SectionModelWithMST from './SectionModelWithMST'

import { CreateItems } from './SectionModelWithMST/SectionModelWithMST'

interface UpdateUserDataBrandDetails {
   brand_id: number
   count: number
}

interface UpdateUserDataItemDetailType {
   item_id: number
   brands: Array<UpdateUserDataBrandDetails>
}

interface UpdateUserDataType {
   section_id: number
   item_details: Array<UpdateUserDataItemDetailType>
}

export const CreateSections = (sections: any) => {
   return sections.map(eachSection => {
      return SectionModelWithMST.create({
         id: eachSection.section_id,
         name: eachSection.section_name,
         description: eachSection.description,
         itemDetails: CreateItems(sections.item_details)
      })
   })
}

const SelectedFormModelWithMST = types
   .model({
      fromId: types.number,
      formName: types.string,
      formDescription: types.string,
      closeDate: types.string,
      totalItems: types.number,
      totalCost: types.number,
      sectionDetails: types.array(SectionModelWithMST),
      selectedSectionId: types.number
   })
   .actions(self => {
      return {
         // init() {
         //       // self.fromId = form.form_id
         //       // self.formName = form.form_name
         //       // self.closeDate = form.close_date
         //       // self.formDescription = form.form_description
         //       // self.totalItems = form.total_items
         //       // self.totalCost = form.total_cost
         //       // self.sectionDetails = form.sections_details.map(eachSection => {
         //       //    const newSection = SectionModelWithMST.create()
         //       //    return newSection
         //       // })
         // },
         updateUserData() {
            let userData: Array<UpdateUserDataType> = []

            self.sectionDetails.forEach(eachSection => {
               let itemsData: Array<UpdateUserDataItemDetailType> = []
               eachSection.itemDetails.forEach(eachItem => {
                  const brand = eachItem.userSelectedBrandWithQuantity
                  if (brand !== undefined) {
                     itemsData.push({
                        item_id: eachItem.id,
                        brands: [
                           {
                              brand_id: brand.id,
                              count: brand.count
                           }
                        ]
                     })
                  }
               })

               if (itemsData.length !== 0) {
                  userData.push({
                     section_id: eachSection.id,
                     item_details: itemsData
                  })
               }
            })
            return userData
         }
      }
   })
   .views(self => {
      return {
         get selectedSectionData() {
            return self.sectionDetails.find(eachSection => {
               return eachSection.id === self.selectedSectionId
            })
         },
         get userSelectedQuantityAndCost() {
            let totalCost = 0
            let totalItems = 0
            self.sectionDetails.forEach(section => {
               section.itemDetails.forEach(eachItem => {
                  eachItem.brands.forEach(eachBrand => {
                     const totalItemCost =
                        eachBrand.pricePerItem * eachBrand.count

                     totalCost = isNaN(totalItemCost)
                        ? totalCost
                        : totalCost + totalItemCost

                     totalItems = isNaN(eachBrand.count)
                        ? totalItems
                        : totalItems + eachBrand.count
                  })
               })
            })
            return {
               totalCost: totalCost,
               itemsAdded: totalItems
            }
         }
      }
   })

export default SelectedFormModelWithMST
