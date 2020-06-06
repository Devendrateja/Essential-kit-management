import getSelectedFormResponse from '../../fixtures/getSelectedFormResponse.json'

class SelectedFormFixtures {
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
}

export default SelectedFormFixtures
