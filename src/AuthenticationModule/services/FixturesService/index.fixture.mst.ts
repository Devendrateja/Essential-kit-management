import { types } from 'mobx-state-tree'

import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'

const AuthMSTFixturesService = types.model({}).actions(self => {
   return {
      signInAPI(request) {
         const promise = new Promise(function(resolve, reject) {
            resolve(getUserSignInResponse)
         })
         return promise
      }
   }
})

export default AuthMSTFixturesService
