/*global jest*/
/*global expect*/
/*global mockSetCookie*/

import {
    API_SUCCESS,
    API_FAILED,
    API_FETCHING,
    API_INITIAL
}
from '@ib/api-constants'

import getSelectedFormResponse from "../../../fixtures/getSelectedFormResponse.json"
//import SelectedFormAPI from "../../services/SelectedFormServices/index.api.js"
//import FormFixturesService from "../../services/SelectedFormServices/index.fixtures.js"


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

    // let form = {
    //         "form_id": 0,
    //         "form_name": "string",
    //         "close_date": "2020-1-1",
    //         "form_description": "string",
    //         "total_items": 0,
    //         "total_cost": 0,
    //         "sections_details": [{
    //             "section_id": 0,
    //             "section_name": "string",
    //             "description": "string",
    //             "item_details": [{
    //                 "description": "string",
    //                 "item_id": 0,
    //                 "Item_name": "string",
    //                 "brands": [{
    //                     "brand_id": 0,
    //                     "brand": "string",
    //                     "max_min_quantity": 0,
    //                     "price_per_item": 0,
    //                     "count": 0
    //                 }]
    //             }]
    //         }]
    //     }
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
                        count: 0
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




    it("should create a new model with the given data", () => {


            const newForm = new SelectedFormModel(formData)

            const expectedForm = {
                    fromId: 1,
                    formName: "snacksform",
                    closeDate: "1-2-3",
                    formDescription: "",
                    totalItems: 0,
                    totalCost: 0,
                    sectionDetails: [{
                            description: "description",
                            id: 10,
                            itemDetails: [{
                                    brands: [
                                        {
                                            brandName: "dabour",
                                            count: 0,
                                            id: 1010,
                                            maxQuantity: 2,
                                            pricePerItem: 10,
                                        },
                                        {
                                            brandName: "nestle",
                                            count: 0,
                                            id: 1011,
                                            maxQuantity: 4,
                                            pricePerItem: 20,
                                        },
                                    ],
                                    description: "description",
                                    id: 101,
                                    name: "nut crackers",
                                    selectedBrandId: undefined,
                                    selectedQuantityPerItem: 0,
                                    totalPriceOfAnItem: 0,
                                },
                                {
                                    brands: [
                                        {
                                            brandName: "dabour",
                                            count: 0,
                                            id: 1012,
                                            maxQuantity: 2,
                                            pricePerItem: 10,
                                        },
                                        {
                                            brandName: "nestle",
                                            count: 0,
                                            id: 1013,
                                            maxQuantity: 4,
                                            pricePerItem: 20,
                                        },
                                    ],
                                    description: "description",
                                    id: 102,
                                    name: "nut crackers",
                                    selectedBrandId: undefined,
                                    selectedQuantityPerItem: 0,
                                    totalPriceOfAnItem: 0,
                                },
                            ],
                            name: "snack items",
                            selectedItemId: undefined,
                        },
                        {
                            description: "description",
                            id: 11,
                            itemDetails: [
                                 {
                                    brands: [
                                        {
                                            brandName: "dabour",
                                            count: 0,
                                            id: 1014,
                                            maxQuantity: 2,
                                            pricePerItem: 10,
                                        },
                                        {
                                            brandName: "nestle",
                                            count: 0,
                                            id: 1015,
                                            maxQuantity: 4,
                                            pricePerItem: 20,
                                        },
                                    ],
                                    description: "description",
                                    id: 103,
                                    name: "nut crackers",
                                    selectedBrandId: undefined,
                                    selectedQuantityPerItem: 0,
                                    totalPriceOfAnItem: 0,
                                },
                                {
                                    brands: [
                                        {
                                            brandName: "dabour",
                                            count: 0,
                                            id: 1016,
                                            maxQuantity: 2,
                                            pricePerItem: 10,
                                        },
                                        {
                                            brandName: "nestle",
                                            count: 0,
                                            id: 1017,
                                            maxQuantity: 4,
                                            pricePerItem: 20,
                                        },
                                    ],
                                    description: "description",
                                    id: 104,
                                    name: "nut crackers",
                                    selectedBrandId: undefined,
                                    selectedQuantityPerItem: 0,
                                    totalPriceOfAnItem: 0,
                                },
                            ],
                            name: "biscuits",
                            selectedItemId: undefined,
                        },
                    ],
                selectedSectionId: undefined,
                isSelected: true
        }


        expect(newForm).toEqual(expectedForm)

    })

// it("shoud test the following data ", ()=> {
//     console.log(formData)
// })



})
