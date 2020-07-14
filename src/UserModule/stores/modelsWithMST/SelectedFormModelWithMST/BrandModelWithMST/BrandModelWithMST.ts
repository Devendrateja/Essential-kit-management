import { types } from 'mobx-state-tree'
import { SelectedFormBrandDetails } from '../../../type'

const BrandModelWithMST = types.model({
   id: types.number,
   brandName: types.string,
   maxQuantity: types.number,
   pricePerItem: types.number,
   count: types.number
})

export default BrandModelWithMST
