import { create } from "apisauce";
import { apiMethods } from "../../../constants/APIConstants";
import { networkCallWithApisauce } from "../../../utils/APIUtils";

class AuthAPI {
  api;
  constructor() {
    this.api = create({
      baseURL: "https://127.0.0.1:8080/api/essentials_kit_management/essentials_kit_management/",
    });
  }

  signInAPI(request) {
    console.log("api call services")
    return networkCallWithApisauce(
      this.api,
      "Loginform/v1/",
      request,
      apiMethods.get
    );
  }
}

export default AuthAPI;