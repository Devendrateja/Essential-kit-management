/*global jest*/
/*global expect*/
/*global mockSetCookie*/



import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import SelectedFormRoute from "../../../routes/SelectedFormRoute"


import {
    API_SUCCESS,
    API_FAILED,
    API_FETCHING,
    API_INITIAL
}
from '@ib/api-constants'

import getSelectedFormResponse from "../../../fixtures/getSelectedFormResponse.json"
import SelectedFormAPI from "../../../services/SelectedFormServices/index.api.js"
import SelectedFormFixtures from "../../../services/SelectedFormServices/index.fixtures.js"
import SelectedFormStore from "../../SelectedFormStore"


import SelectedFormModel from "."
import SectionModel from "./"
import ItemModel from "./"
import BrandModel from "./"


import '@testing-library/jest-dom/extend-expect'

import Cookie from 'js-cookie'

let mockSetCookie = jest.fn()
let mockRemoveCookie = jest.fn()
let mockGetCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie
Cookie.get = mockGetCookie

global.mockSetCookie = mockSetCookie
global.mockRemoveCookie = mockRemoveCookie
global.mockGetCookie = mockGetCookie







describe("selctedFormModel tests", () => {
    let selectedFormAPI 
    let selectedFormStore

    let formData = {
        form_id: 1,
        form_name: "snacksform",
        close_date: "1-2-3",
        form_description: "",
        total_items: 0,
        total_cost: 0,
        sections_details: [{
            section_id: 10,
            section_name: "snack items",
            description: "description",
            item_details: [{
                description: "description",
                item_id: 101,
                Item_name: "nut crackers",
                brands: [{
                        brand_id: 1010,
                        brand: "dabour",
                        max_min_quantity: 2,
                        price_per_item: 10,
                        count: 1
                    },
                    {
                        brand_id: 1011,
                        brand: "nestle",
                        max_min_quantity: 4,
                        price_per_item: 20,
                        count: 0
                    }
                ]
            }, {
                description: "description",
                item_id: 102,
                Item_name: "nut crackers",
                brands: [{
                        brand_id: 1012,
                        brand: "dabour",
                        max_min_quantity: 2,
                        price_per_item: 10,
                        count: 0
                    },
                    {
                        brand_id: 1013,
                        brand: "nestle",
                        max_min_quantity: 4,
                        price_per_item: 20,
                        count: 0
                    }
                ]
            }]
        }, {
            section_id: 11,
            section_name: "biscuits",
            description: "description",
            item_details: [{
                description: "description",
                item_id: 103,
                Item_name: "nut crackers",
                brands: [{
                        brand_id: 1014,
                        brand: "dabour",
                        max_min_quantity: 2,
                        price_per_item: 10,
                        count: 0
                    },
                    {
                        brand_id: 1015,
                        brand: "nestle",
                        max_min_quantity: 4,
                        price_per_item: 20,
                        count: 0
                    }
                ]
            }, {
                description: "description",
                item_id: 104,
                Item_name: "nut crackers",
                brands: [{
                        brand_id: 1016,
                        brand: "dabour",
                        max_min_quantity: 2,
                        price_per_item: 10,
                        count: 0
                    },
                    {
                        brand_id: 1017,
                        brand: "nestle",
                        max_min_quantity: 4,
                        price_per_item: 20,
                        count: 0
                    }
                ]
            }]
        }]
    }
    
    let newForm ;

    beforeEach(()=>{
        newForm = new SelectedFormModel(formData)
        selectedFormAPI = new SelectedFormFixtures();
        selectedFormStore = new SelectedFormStore(selectedFormAPI)
    })


    it("should create a new model with the given data", () => {


        expect(newForm.sectionDetails.length).toEqual(2)
        expect(newForm.sectionDetails[0].itemDetails.length).toBe(2)
        expect(newForm.sectionDetails[1].itemDetails[1].brands.length).toBe(2)
        expect(newForm.sectionDetails[1].itemDetails[1].brands[1].brandName).toBe("nestle")



    })

    it("shoud test the computed varible is returning the selectedSection ", () => {
        
        newForm.selectedSectionId = 10
        const newSection = newForm.selectedSectionData
        expect(newSection.name).toBe("snack items")
        expect(newSection.itemDetails[0].id).toBe(101)
    })
    
    it("should test the computed variable selectedBrandData returning bselected brand", () => {
        newForm.sectionDetails[0].itemDetails[0].selectedBrandId = 1011
        const brand = newForm.sectionDetails[0].itemDetails[0].selectedBrandData 
        expect(brand.brandName).toBe("nestle")
        expect(brand.maxQuantity).toBe(4)
    })
    
    
    
    
    it("should test is coumputed variable is  setUserSelectedBrandWithQuantity ", () => {
        newForm.sectionDetails[0].itemDetails[0].setUserSelectedBrandWithQuantity(1011,1,40)
        expect(newForm.sectionDetails[0].itemDetails[0].brands[1].count).toBe(1)
        expect(newForm.sectionDetails[0].itemDetails[0].brands[0].count).toBe(0)
        expect(newForm.sectionDetails[0].itemDetails[0].totalPriceOfAnItem).toBe(40)
        expect(newForm.sectionDetails[0].itemDetails[0].selectedQuantityPerItem).toBe(1)
    } )
    
    
    it("should computed variable  get the userSelectedBrandWith Quantity", () => {
        const defaultBrand = newForm.sectionDetails[0].itemDetails[0].userSelectedBrandWithQuantity
        expect(defaultBrand.brandName).toBe("dabour")
        expect(defaultBrand.count).toBe(1)
    })
    
    
    
    
    
    
    
    
    it("should test the computed variable userSelectedQuantityAndCost is returning the previously selected brand",()=>{
        
        newForm.sectionDetails[0].itemDetails[0].brands[0].count = 3
        newForm.sectionDetails[0].itemDetails[0].brands[1].count = 2
        const totalCostAndQty = newForm.userSelectedQuantityAndCost
        
        // expect(newForm.sectionDetails[0].itemDetails[0].brands[0].count).toBe(3)
        // expect(newForm.sectionDetails[0].itemDetails[0].brands[1].count).toBe(2)
        // expect(newForm.userSelectedQuantityAndCost).toEqual(1)
        // expect(totalCostAndQty).toBe(5)
        const { getByRole, getByText, debug } = render(
         <Router history={createMemoryHistory()}>
            <SelectedFormRoute selectedFormStore={selectedFormStore} />
         </Router>
      )
        debug()
    })
    
})



//     const expectedForm = {
//             fromId: 1,
//             formName: "snacksform",
//             closeDate: "1-2-3",
//             formDescription: "",
//             totalItems: 0,
//             totalCost: 0,
//             sectionDetails: [{
//                     description: "description",
//                     id: 10,
//                     itemDetails: [{
//                             brands: [
//                                 {
//                                     brandName: "dabour",
//                                     count: 0,
//                                     id: 1010,
//                                     maxQuantity: 2,
//                                     pricePerItem: 10,
//                                 },
//                                 {
//                                     brandName: "nestle",
//                                     count: 0,
//                                     id: 1011,
//                                     maxQuantity: 4,
//                                     pricePerItem: 20,
//                                 },
//                             ],
//                             description: "description",
//                             id: 101,
//                             name: "nut crackers",
//                             selectedBrandId: undefined,
//                             selectedQuantityPerItem: 0,
//                             totalPriceOfAnItem: 0,
//                         },
//                         {
//                             brands: [
//                                 {
//                                     brandName: "dabour",
//                                     count: 0,
//                                     id: 1012,
//                                     maxQuantity: 2,
//                                     pricePerItem: 10,
//                                 },
//                                 {
//                                     brandName: "nestle",
//                                     count: 0,
//                                     id: 1013,
//                                     maxQuantity: 4,
//                                     pricePerItem: 20,
//                                 },
//                             ],
//                             description: "description",
//                             id: 102,
//                             name: "nut crackers",
//                             selectedBrandId: undefined,
//                             selectedQuantityPerItem: 0,
//                             totalPriceOfAnItem: 0,
//                         },
//                     ],
//                     name: "snack items",
//                     selectedItemId: undefined,
//                 },
//                 {
//                     description: "description",
//                     id: 11,
//                     itemDetails: [
//                          {
//                             brands: [
//                                 {
//                                     brandName: "dabour",
//                                     count: 0,
//                                     id: 1014,
//                                     maxQuantity: 2,
//                                     pricePerItem: 10,
//                                 },
//                                 {
//                                     brandName: "nestle",
//                                     count: 0,
//                                     id: 1015,
//                                     maxQuantity: 4,
//                                     pricePerItem: 20,
//                                 },
//                             ],
//                             description: "description",
//                             id: 103,
//                             name: "nut crackers",
//                             selectedBrandId: undefined,
//                             selectedQuantityPerItem: 0,
//                             totalPriceOfAnItem: 0,
//                         },
//                         {
//                             brands: [
//                                 {
//                                     brandName: "dabour",
//                                     count: 0,
//                                     id: 1016,
//                                     maxQuantity: 2,
//                                     pricePerItem: 10,
//                                 },
//                                 {
//                                     brandName: "nestle",
//                                     count: 0,
//                                     id: 1017,
//                                     maxQuantity: 4,
//                                     pricePerItem: 20,
//                                 },
//                             ],
//                             description: "description",
//                             id: 104,
//                             name: "nut crackers",
//                             selectedBrandId: undefined,
//                             selectedQuantityPerItem: 0,
//                             totalPriceOfAnItem: 0,
//                         },
//                     ],
//                     name: "biscuits",
//                     selectedItemId: undefined,
//                 },
//             ],
//         selectedSectionId: undefined,
//         isSelected: true
// }
