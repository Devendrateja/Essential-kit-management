import getUserResponse from '../../fixtures/getUserResponse.json'
import getSelectedFormResponse from '../../fixtures/getSelectedFormResponse.json'
import getClosedFormResponse from "../../fixtures/getClosedFormResponse.json"
import getTransactionUPI from '../../fixtures/getTransactionUPI.json'
import getTransactions from "../../fixtures/getTransactions.json"

class FormFixturesService {
   
   async getFormsAPI(limit, offset) {
      const promise = await new Promise(function(resolve, reject) {
         setTimeout(()=>{
            resolve(getUserResponse)
         },  500)
         
      })
      
      const formsData = promise.list_of_forms.slice(offset, limit + offset)

      const response = {
         list_of_forms: formsData,
         total_forms: promise.total_forms
      }
      console.log("response", response)
      
      return response
   }
   
   
   
   
   
   
   getSelectedFormAPI(id) {
      const promise = new Promise(function(resolve, reject) {
         resolve(getSelectedFormResponse)
      })
      return promise
   }

   setSelectedFormAPI(id, data) {
      const promise = new Promise(function(resolve, reject) {
         resolve(data)
      })
      return promise
   }
   
   
      getClosedFormAPI() {
      const promise = new Promise(function(resolve, reject) {
         resolve(getClosedFormResponse)
      })
      return promise
   }

   
   

   getTransactionUPI() {
      const promise = new Promise(function(resolve, reject) {
         resolve(getTransactionUPI)
      })

      return promise
   }
   
   
   
   sendTransactionDetails(data){
      const promise = new Promise(function(resolve, reject) {
         resolve(null)
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
