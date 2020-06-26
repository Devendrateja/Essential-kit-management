import React from 'react'
import { observable, action, computed } from 'mobx'
import BrandModel from '../BrandModel'

import { SelectedFormItemDetails } from '../../../type'

class ItemModel {
   id: number
   @observable name: string
   @observable description: string
   @observable brands: Array<BrandModel>
   @observable selectedBrandId!: number
   @observable totalPriceOfAnItem: number = 0
   @observable selectedQuantityPerItem: number = 0

   constructor(item: SelectedFormItemDetails) {
      this.id = item.item_id
      this.name = item.Item_name
      this.description = item.description
      this.brands = item.brands.map(brand => {
         const newBrand = new BrandModel(brand)
         return newBrand
      })
   }

   @action.bound
   setUserSelectedBrandWithQuantity(
      brandId: number,
      qty: number,
      totalPrice: number
   ) {
      this.brands.forEach(eachBrand => {
         eachBrand.id === brandId
            ? (eachBrand.count = qty)
            : (eachBrand.count = 0)
      })
      this.totalPriceOfAnItem = totalPrice
      this.selectedQuantityPerItem = qty
   }

   @computed
   get userSelectedBrandWithQuantity() {
      let defaultBrand = this.brands.find(brand => {
         if (brand.count >= 1) {
            return brand
         }
      })

      return defaultBrand
   }

   @computed
   get selectedBrandData() {
      return this.brands.find(eachBrand => {
         return eachBrand.id === this.selectedBrandId
      })
   }
}

export default ItemModel
