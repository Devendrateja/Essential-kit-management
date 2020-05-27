import { observable, action } from "mobx";

import { API_INITIAL } from "@ib/api-constants";
import { bindPromiseWithOnSuccess } from "@ib/mobx-promise";

import { setAccessToken, clearUserSession } from "../../../utils/StorageUtils";


class AuthStore {
    authAPIService;
    @observable getUserSignInAPIStatus;
    @observable getUserSignInAPIError;
    
    constructor(authAPIService) {
        this.authAPIService = authAPIService;
        this.init();
    }
    
    @action.bound
    init() {
        this.getUserSignInAPIStatus = API_INITIAL;
        this.getUserSignInAPIError = null;
    }
     
    @action.bound
    setUserSignInAPIStatus(status) {
        console.log("api status", status)
        this.getUserSignInAPIStatus = status;
    }

    @action.bound
    setUserSignInAPIError(error) {
        this.getUserSignInAPIError = error;
    }
    @action.bound
    setUserSignInAPIResponse(response) {
        console.log("response from api call", response)
        setAccessToken(response.length > 0 && response[0].access_token);
    }

    @action.bound
    userSignIn(request) {
        console.log("api call userSignIn store",request)
        const userSignInAPIPromise = this.authAPIService.signInAPI(request);
        return bindPromiseWithOnSuccess(userSignInAPIPromise)
          .to(this.setUserSignInAPIStatus, this.setUserSignInAPIResponse)
          .catch((error) => {
            this.setUserSignInAPIError(error);
          });
    }

    @action.bound
    userSignOut() {
        clearUserSession();
        this.init();
    }
}


export default AuthStore;