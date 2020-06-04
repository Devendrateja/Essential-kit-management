import React from 'react'
import { observable, action, computed } from 'mobx'
import BrandModel from '../BrandModel'

class ItemModel {
   id
   @observable description
   @observable name
   @observable brands
   @observable selectedBrandId
   @observable totalPriceOfAnItem = 0
   @observable selectedQuantityPerItem = 0

   constructor(item) {
      this.id = item.item_id
      this.name = item.Item_name
      this.description = item.description
      this.brands = item.brands.map(brand => {
         const newBrand = new BrandModel(brand)
         return newBrand
      })
   }

   @action.bound
   setUserSelectedBrandWithQuantity(brandId, qty, totalPrice) {
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
            console.log(
               'userSelectedBrandWithQuantity in item model',
               this.brands,
               brand.count,
               brand
            )
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
