import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import Select from 'react-select'
import ReadMoreReact from 'read-more-react'

import DataStrings from '../../../../i18n/strings.json'

import {
   Container,
   Span,
   AlignLeft,
   AlignRight,
   AlignCenter,
   S_no,
   LastCol,
   DescEl
}
from './styledComponents'

@observer
class SelectedFormTableRow extends React.Component {
   @observable selectedBrand = null
   @observable selectedQuantity = null
   @observable pricePerItem = 0
   @observable totalPriceOfAnItem = 0
   @observable quantityOptions = []

   componentDidMount() {
      const { item } = this.props
      let defaultBrand = item.userSelectedBrandWithQuantity
      console.log(defaultBrand, "componentDidMoun defaultBrand")

      if (defaultBrand !== undefined) {
         this.selectedBrand = {
            value: defaultBrand.brandName,
            label: defaultBrand.brandName
         }


         for (let i = 0; i <= defaultBrand.maxQuantity; i++) {
            const obj = {
               value: i,
               label: i.toString()
            }
            this.quantityOptions.push(obj)
         }


         this.selectedQuantity = {
            value: defaultBrand.count,
            label: defaultBrand.count
         }

         this.totalPriceOfAnItem = defaultBrand.count * defaultBrand.pricePerItem
         this.pricePerItem = defaultBrand.pricePerItem
      }
   }



   handleChangeBrands = selectedOption => {
      const { item } = this.props
      this.selectedBrand = selectedOption
      item.selectedBrandId = selectedOption.id

      this.quantityOptions = []

      let max = item.selectedBrandData.maxQuantity
      this.pricePerItem = item.selectedBrandData.pricePerItem
      for (let i = 0; i <= max; i++) {
         const eachQuantityOption = {
            value: i,
            label: i
         }
         this.quantityOptions.push(eachQuantityOption)
      }
   }

   handleQuantity = qty => {
      const { item } = this.props
      this.selectedQuantity = qty
      item.setUserSelectedBrandWithQuantity(this.selectedBrand.id, qty.value)
      this.totalPriceOfAnItem = qty.value * this.pricePerItem
   }



   setItemDetails = () => {
      const { item } = this.props

      let listOfBrandOptions = []

      item.brands.forEach(eachBrand => {
         const eachBrandOption = {
            value: eachBrand.brandName,
            label: eachBrand.brandName,
            id: eachBrand.id
         }
         listOfBrandOptions.push(eachBrandOption)
      })

      return listOfBrandOptions
   }

   render() {
      const { sno, item } = this.props

      let brandOptions = this.setItemDetails()

      let selectBrand = (
         <Select
            className='w-full'
            value={this.selectedBrand}
            onChange={this.handleChangeBrands}
            options={brandOptions}
         />
      )

      let description = (
         <ReadMoreReact
            className='flex w-full'
            text={item.description}
            min={20}
            ideal={30}
            max={40}
            readMoreText='...'
         />
      )

      let quantity = (
         <Select
            className='w-1/2 '
            value={this.selectedQuantity}
            onChange={this.handleQuantity}
            options={this.quantityOptions}
         />
      )
      return (
         <Container>
            <S_no>
               <AlignLeft>{sno}.</AlignLeft>
            </S_no>
            <Span>
               <AlignLeft>{item.name}</AlignLeft>
            </Span>
            <Span>
               <AlignLeft>{description}</AlignLeft>
            </Span>
            <Span>
               <AlignLeft>{selectBrand}</AlignLeft>
            </Span>
            <Span>
               <AlignCenter>{quantity}</AlignCenter>
            </Span>
            <LastCol>
               <AlignRight>{this.totalPriceOfAnItem}</AlignRight>
            </LastCol>
         </Container>
      )
   }
}

export default SelectedFormTableRow
