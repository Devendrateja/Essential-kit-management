import { observable, action } from 'mobx'

import { ClosedFormItemDetails } from '../../type'

class ClosedFormModel {
   itemId: number
   @observable itemName: string
   @observable itemsAdded: number
   @observable itemsRecieved: number
   @observable costIncurred: number

   constructor(closedForm: ClosedFormItemDetails) {
      this.itemId = closedForm.item_id
      this.itemName = closedForm.item_name
      this.itemsAdded = closedForm.items_added
      this.itemsRecieved = closedForm.items_recieved
      this.costIncurred = closedForm.cost_incurred
   }
}

export default ClosedFormModel
