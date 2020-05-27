import { create } from "apisauce";
import { apiMethods } from "../../constants/APIConstants";
import { networkCallWithApisauce } from "../../utils/APIUtils";

class AuthAPI {
  api;
  constructor() {
    this.api = create({
      baseURL: "",
    });
  }

  signInAPI(request) {
    return networkCallWithApisauce(
      this.api,
      "",
      request,
      apiMethods.get
    );
  }
}

export default AuthAPI;