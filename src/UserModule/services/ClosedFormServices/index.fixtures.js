import getClosedFormResponse from '../../fixtures/getClosedFormResponse.json'

class ClosedFormFixturesService {
   getClosedFormAPI() {
      const promise = new Promise(function(resolve, reject) {
         resolve(getClosedFormResponse)
      })

      return promise
   }
}

export default ClosedFormFixturesService
