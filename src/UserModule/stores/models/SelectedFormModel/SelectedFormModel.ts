import React from 'react'
import { observable, action, computed } from 'mobx'
import SectionModel from './SectionModel'
import { SelectedFormResponse, SelectedFormSectionDetails } from '../../type'

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

class SelectedFormModel {
   fromId!: number
   @observable formName!: string
   @observable formDescription!: string
   @observable closeDate!: string
   @observable totalItems!: number
   @observable totalCost!: number
   @observable sectionDetails!: Array<SectionModel>
   @observable selectedSectionId!: number

   constructor(form: SelectedFormResponse) {
      this.init(form)
   }

   @action.bound
   init(form: SelectedFormResponse) {
      this.fromId = form.form_id
      this.formName = form.form_name
      this.closeDate = form.close_date
      this.formDescription = form.form_description
      this.totalItems = form.total_items
      this.totalCost = form.total_cost
      this.sectionDetails = form.sections_details.map(eachSection => {
         const newSection = new SectionModel(eachSection)
         return newSection
      })
   }

   @computed
   get selectedSectionData() {
      return this.sectionDetails.find(eachSection => {
         return eachSection.id === this.selectedSectionId
      })
   }

   @computed
   get userSelectedQuantityAndCost() {
      let totalCost = 0
      let totalItems = 0
      this.sectionDetails.forEach(section => {
         section.itemDetails.forEach(eachItem => {
            eachItem.brands.forEach(eachBrand => {
               const totalItemCost = eachBrand.pricePerItem * eachBrand.count

               totalCost = isNaN(totalItemCost)
                  ? totalCost
                  : totalCost + totalItemCost

               totalItems = isNaN(eachBrand.count)
                  ? totalItems
                  : totalItems + eachBrand.count
            })
         })
      })
      console.log('userSelectedQuantityAndCost', totalCost, totalItems)
      return {
         totalCost: totalCost,
         itemsAdded: totalItems
      }
   }

   @action.bound
   updateUserData() {
      let userData: Array<UpdateUserDataType> = []

      this.sectionDetails.forEach(eachSection => {
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

export default SelectedFormModel
