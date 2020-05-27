import {observable, action} from "mobx" 


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
    
    constructor(form){
        this.formId = form.form_id
        this.formName = form.form_name
        this.formStatus = form.form_status
        this.CloseDate = form.close_date
        this.expectedDeliveryDate = form.expected_delivery_date
        this.itemsCount = form.items_count
        this.estimatedCount = form.estimated_cost
        this.itemsPendingCount = form.items_pending_count
        this.costIncurredForDeliveredItems = form.cost_incurred_for_delivered_items
    }
    
}



export default Form;