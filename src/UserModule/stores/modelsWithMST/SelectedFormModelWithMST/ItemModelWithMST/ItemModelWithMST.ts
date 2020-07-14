import { types } from 'mobx-state-tree'
// import React from 'react'
// import { observable, action, computed } from 'mobx'
import BrandModelWithMST from '../BrandModelWithMST'

import { SelectedFormItemDetails } from '../../../type'

export const CreateBrands = brands => {
   return brands.map(eachBrand => {
      return BrandModelWithMST.create({
         id: eachBrand.brand_id,
         brandName: eachBrand.brand,
         maxQuantity: eachBrand.max_min_quantity,
         pricePerItem: eachBrand.price_per_itemr,
         count: eachBrand.count
      })
   })
}

const ItemModelWithMST = types
   .model({
      id: types.number,
      name: types.string,
      description: types.string,
      brands: types.array(BrandModelWithMST),
      selectedBrandId: types.number,
      totalPriceOfAnItem: types.number,
      selectedQuantityPerItem: types.number
   })
   .actions(self => {
      return {
         setUserSelectedBrandWithQuantity(
            brandId: number,
            qty: number,
            totalPrice: number
         ) {
            self.brands.forEach(eachBrand => {
               eachBrand.id === brandId
                  ? (eachBrand.count = qty)
                  : (eachBrand.count = 0)
            })
            self.totalPriceOfAnItem = totalPrice
            self.selectedQuantityPerItem = qty
         }
      }
   })
   .views(self => {
      return {
         get userSelectedBrandWithQuantity() {
            let defaultBrand = self.brands.find(brand => {
               if (brand.count >= 1) {
                  return brand
               }
            })

            return defaultBrand
         },
         get selectedBrandData() {
            return self.brands.find(eachBrand => {
               return eachBrand.id === self.selectedBrandId
            })
         }
      }
   })

// class ItemModel {
//    id: number
//    @observable name: string
//    @observable description: string
//    @observable brands: Array<BrandModel>
//    @observable selectedBrandId!: number
//    @observable totalPriceOfAnItem: number = 0
//    @observable selectedQuantityPerItem: number = 0

//    constructor(item: SelectedFormItemDetails) {
//       this.id = item.item_id
//       this.name = item.Item_name
//       this.description = item.description
//       this.brands = item.brands.map(brand => {
//          const newBrand = new BrandModel(brand)
//          return newBrand
//       })
//    }

//    @action.bound
//    setUserSelectedBrandWithQuantity(
//       brandId: number,
//       qty: number,
//       totalPrice: number
//    ) {
//       this.brands.forEach(eachBrand => {
//          eachBrand.id === brandId
//             ? (eachBrand.count = qty)
//             : (eachBrand.count = 0)
//       })
//       this.totalPriceOfAnItem = totalPrice
//       this.selectedQuantityPerItem = qty
//    }

//    @computed
//    get userSelectedBrandWithQuantity() {
//       let defaultBrand = this.brands.find(brand => {
//          if (brand.count >= 1) {
//             return brand
//          }
//       })

//       return defaultBrand
//    }

//    @computed
//    get selectedBrandData() {
//       return this.brands.find(eachBrand => {
//          return eachBrand.id === this.selectedBrandId
//       })
//    }
// }

export default ItemModelWithMST
