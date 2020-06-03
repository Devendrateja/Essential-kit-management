import React from 'react'
import { observable, action, computed } from 'mobx'
import SectionModel from './SectionModel'

class SelectedFormModel {
   fromId
   @observable formName
   @observable formDescription
   @observable closeDate
   @observable totalItems
   @observable totalCost
   @observable sectionDetails
   @observable selectedSectionId

   constructor(form) {
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
   get userSelectedQuantityAndCost(){
      let totalCost = 0
      let totalItems = 0
      this.sectionDetails.forEach(section => {
            section.itemDetails.forEach(eachItem => {
               totalCost = ((isNaN(eachItem.totalPriceOfAnItem)) ? totalCost : totalCost+eachItem.totalPriceOfAnItem)
               totalItems = (isNaN(eachItem.selectedQuantityPerItem)) ? totalItems : totalItems+eachItem.selectedQuantityPerItem
            })
      })
      return {
         totalCost : totalCost,
         itemsAdded : totalItems
      }
   }
   
   updateUserData = () => {
      let userData = []
      
      
      this.sectionDetails.forEach(eachSection => {
         
         let itemsData = []
         eachSection.itemDetails.forEach(eachItem => {
            const brand = eachItem.userSelectedBrandWithQuantity
            if(brand !== undefined){
               itemsData.push({
                  item_id:eachItem.id,
                  brands :[{
                     brand_id:brand.id,
                     count : brand.count
                  }]
               })
            }
         })
         
         if(itemsData.length !== 0){
            userData.push({
               section_id : eachSection.id,
               item_details : itemsData
         })
         }
         
      })
      console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
      return userData
      
   }
   

}

export default SelectedFormModel
// 