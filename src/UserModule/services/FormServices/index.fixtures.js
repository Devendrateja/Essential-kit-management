import getUserResponse from '../../fixtures/getUserResponse.json'

class FormFixturesService {
   async getFormsAPI(limit, offset) {
      const promise = await new Promise(function(resolve, reject) {
         resolve(getUserResponse)
      })

      const formsData = promise.formsList.slice(offset, limit + offset)

      const response = {
         formsList: formsData,
         totalForms: promise.totalForms
      }

      return response
   }
}

export default FormFixturesService
