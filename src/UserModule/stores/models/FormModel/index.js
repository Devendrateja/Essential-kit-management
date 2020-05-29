import { observable, action } from 'mobx'

class Form {
   formId
   @observable formName
   @observable formStatus
   @observable CloseDate
   @observable expectedDeliveryDate
   @observable itemsCount
   @observable estimatedCount
   @observable itemsPendingCount
   @observable costIncurredForDeliveredItems

   constructor(form) {
      this.formId = form.form_id
      this.formName = form.form_name
      this.formStatus = form.form_status
      this.ClosingDate = form.close_date
      this.expectedDeliveryDate = form.expected_delivery_date
      this.totalItems = form.items_count
      this.totalEstimatedCost = form.estimated_cost
      this.itemsPending = form.items_pending_count
      this.costIncurredForDeliveredItems =
         form.cost_incurred_for_delivered_items
   }
}

export default Form
