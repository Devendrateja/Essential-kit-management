import { observable, action } from 'mobx'

class ClosedFormModel {
   itemId
   @observable itemName
   @observable itemsAdded
   @observable itemsRecieved
   @observable costIncurred

   constructor(closedForm) {
      this.itemId = closedForm.item_id
      this.itemName = closedForm.item_name
      this.itemsAdded = closedForm.items_added
      this.itemsRecieved = closedForm.items_recieved
      this.costIncurred = closedForm.cost_incurred
   }
}

export default ClosedFormModel
