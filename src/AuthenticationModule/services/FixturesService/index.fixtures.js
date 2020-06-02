import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'

class AuthFixturesService {
   signInAPI() {
      const promise = new Promise(function(resolve, reject) {
         resolve(getUserSignInResponse)
      })

      return promise
   }
}

export default AuthFixturesService
