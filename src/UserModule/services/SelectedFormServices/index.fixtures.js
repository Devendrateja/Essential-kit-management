import getSelectedFormResponse from '../../fixtures/getSelectedFormResponse.json'

class SelectedFormFixtures {
   
   async getSelectedFormAPI (id) {
      const promise = await new Promise(function(resolve, reject) {
         resolve(getSelectedFormResponse)
      })
      await console.log("promise in api fixtures", promise)
      return promise
   }
}

export default SelectedFormFixtures
