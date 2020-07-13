import { types } from 'mobx-state-tree'
import { API_INITIAL } from '@ib/api-constants'
import {
   setAccessToken,
   clearUserSession,
   getAccessToken
} from '../../../utils/StorageUtils'
import { noop } from 'mobx/lib/internal'
import { nullType } from 'mobx-state-tree/dist/internal'

const AuthStoreWithMST = types
   .model({
      getUserSignInAPIStatus: types.number,
      getUserSignInAPIError: types.maybeNull(types.string)
   })
   .actions(self => {
      return {
         init() {
            self.getUserSignInAPIStatus = API_INITIAL
            self.getUserSignInAPIError = null
         },
         setUserSignInAPIStatus(status: number) {
            console.log('status...', status)
            self.getUserSignInAPIStatus = status
         },
         setUserSignInAPIError(error: string) {
            console.log('error ...', error)
            self.getUserSignInAPIError = error
         },
         setUserSignInAPIResponse(response: any) {
            console.log('response ......', response)
            setAccessToken(
               response.access_token.length > 0 && response.access_token
            )
         },
         userSignOut() {
            clearUserSession()
            this.init()
         },
         isLoggedIn() {
            const access_token = getAccessToken()
            return access_token !== undefined ? true : false
         }
      }
   })

export default AuthStoreWithMST
