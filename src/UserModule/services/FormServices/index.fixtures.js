import getUserResponse from '../../fixtures/getUserResponse.json'
import getTransactionUPI from '../../fixtures/getTransactionUPI.json'

class FormFixturesService {
   
   
   
   async getFormsAPI(limit, offset) {
      const promise =await new Promise(function(resolve, reject) {
         resolve(getUserResponse)
      })
      console.log("promise.list", promise.list_of_forms)
      const formsData = promise.list_of_forms.slice(offset, limit + offset)

      const response = {
         list_of_forms: formsData,
         total_forms: promise.total_forms
      }
      
      return response
   }
   
   
   
   
   getTransactionUPI(){
      const promise = new Promise(function (resolve, reject){
         resolve(getTransactionUPI)
      })
      
      return promise;
   }
   
   
}

export default FormFixturesService
