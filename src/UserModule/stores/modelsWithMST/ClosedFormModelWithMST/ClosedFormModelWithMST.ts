import { types } from 'mobx-state-tree'

//import { ClosedFormItemDetails } from '../../type'

const ClosedFormModelWithMST = types.model({
   itemId: types.number,
   itemName: types.string,
   itemsAdded: types.number,
   itemsRecieved: types.number,
   costIncurred: types.number
})

export default ClosedFormModelWithMST

// class ClosedFormModel {
//    itemId: number
//    @observable itemName: string
//    @observable itemsAdded: number
//    @observable itemsRecieved: number
//    @observable costIncurred: number

//    constructor(closedForm: ClosedFormItemDetails) {
//       this.itemId = closedForm.item_id
//       this.itemName = closedForm.item_name
//       this.itemsAdded = closedForm.items_added
//       this.itemsRecieved = closedForm.items_recieved
//       this.costIncurred = closedForm.cost_incurred
//    }
// }
