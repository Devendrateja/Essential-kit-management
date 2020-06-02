import React from 'react'
import { observable, action, computed } from 'mobx'
import SectionModel from './SectionModel'

class SelectedFormModel {
   fromId
   @observable formName
   @observable formDescription
   @observable totalItems
   @observable totalCost
   @observable sectionDetails
   @observable selectedSectionId

   constructor(form) {
      this.fromId = form.form_id
      this.formName = form.form_name
      this.formDescription = form.form_description
      this.totalItems = form.total_items
      this.totalCost = form.total_cost
      this.sectionDetails = form.section_details.map(eachSection => {
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



}

export default SelectedFormModel
