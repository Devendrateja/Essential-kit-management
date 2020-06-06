import getUserResponse from '../../fixtures/getUserResponse.json'
import getTransactionUPI from '../../fixtures/getTransactionUPI.json'
import getTransactions from "../../fixtures/getTransactions.json"

class FormFixturesService {
   async getFormsAPI(limit, offset) {
      const promise = await new Promise(function(resolve, reject) {
         resolve(getUserResponse)
      })
      console.log('promise.list', promise.list_of_forms)
      const formsData = promise.list_of_forms.slice(offset, limit + offset)

      const response = {
         list_of_forms: formsData,
         total_forms: promise.total_forms
      }

      return response
   }

   getTransactionUPI() {
      const promise = new Promise(function(resolve, reject) {
         resolve(getTransactionUPI)
      })

      return promise
   }
   
   
   sendTransactionDetails(data){
      const promise = new Promise(function(resolve, reject) {
         resolve(data)
      })
      return promise
   }
   
   
   
   
   
   
   getUserTransactionList(){
      const promise = new Promise(function(resolve, reject){
         resolve(getTransactions)
      })
      
      return promise;
   }
   
   
   
}

export default FormFixturesService
