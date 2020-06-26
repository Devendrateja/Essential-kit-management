import React from 'react'
import { observable, action } from 'mobx'

import { SelectedFormBrandDetails } from '../../../type'

class BrandModel {
   id: number
   @observable brandName: string
   @observable maxQuantity: number
   @observable pricePerItem: number
   @observable count: number

   constructor(brand: SelectedFormBrandDetails) {
      this.id = brand.brand_id
      this.brandName = brand.brand
      this.maxQuantity = brand.max_min_quantity
      this.pricePerItem = brand.price_per_item
      this.count = brand.count
   }
}

export default BrandModel
