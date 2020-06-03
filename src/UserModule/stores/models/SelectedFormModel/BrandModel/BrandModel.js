import React from 'react'
import { observable, action } from 'mobx'

class BrandModel {
   id
   @observable brandName
   @observable maxQuantity
   @observable pricePerItem
   @observable count

   constructor(brand) {
      this.id = brand.brand_id
      this.brandName = brand.brand
      this.maxQuantity = brand.max_min_quantity
      this.pricePerItem = brand.price_per_item
      this.count = brand.count
   }
}

export default BrandModel
