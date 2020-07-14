import { types } from 'mobx-state-tree'
import getUserResponse from '../../fixtures/getUserResponse.json'
import getSelectedFormResponse from '../../fixtures/getSelectedFormResponse.json'
import getClosedFormResponse from '../../fixtures/getClosedFormResponse.json'
import getTransactionUPI from '../../fixtures/getTransactionUPI.json'
import getTransactions from '../../fixtures/getTransactions.json'
import { FormsResponse } from '../../stores/type'
import { resolveWithTimeout } from '../../utils/TestUtils'
import FormService from './index'

const FormFixturesServiceWithMST = types.model({}).actions(self => ({
   async getFormsAPI(limit, offset) {
      const promise = await resolveWithTimeout(getUserResponse)
      const formsData = promise.list_of_forms.slice(offset, limit + offset)
      const response = {
         list_of_forms: formsData,
         total_forms: promise.total_forms
      }

      return response
   },

   getSelectedFormAPI(id) {
      return resolveWithTimeout(getSelectedFormResponse)
   },
   setSelectedFormAPI(id, data) {
      const promise = new Promise(function(resolve, reject) {
         resolve(null)
      })
      return promise
   },

   getClosedFormAPI(id) {
      return resolveWithTimeout(getClosedFormResponse)
   },
   getTransactionUPI() {
      return resolveWithTimeout(getTransactionUPI)
   },
   sendTransactionDetails(data) {
      return resolveWithTimeout(null)
   },
   getUserTransactionList() {
      return resolveWithTimeout(getTransactions)
   }
}))

export default FormFixturesServiceWithMST
