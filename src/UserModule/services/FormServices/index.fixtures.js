import getUserResponse from '../../fixtures/getUserResponse.json'

class FormFixturesService {
   async getFormsAPI(limit, offset) {
      const promise = await new Promise(function(resolve, reject) {
         resolve(getUserResponse)
      })

      const formsData = promise.list_of_forms.slice(offset, limit + offset)

      const response = {
         list_of_forms: formsData,
         total_forms: promise.total_forms
      }
      console.log('response in fixtures', response)
      return response
   }
}

export default FormFixturesService
