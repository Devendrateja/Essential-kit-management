import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'

type userSignInRequestProps = {
   username: string
   password: string
}

class AuthFixturesService {
   signInAPI(request: userSignInRequestProps) {
      const promise = new Promise(function(resolve, reject) {
         resolve(getUserSignInResponse)
      })
      return promise
   }
}

export default AuthFixturesService
