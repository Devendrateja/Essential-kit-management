/*global jest*/
/*global expect*/

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";


import { SIGN_IN_PATH } from "../../constants/RouteConstants";
import AuthAPI from "../../services/AuthService/index.api.js";
import AuthStore from "../../stores/AuthStore";
//import getUserSignInResponse from "../../../fixtures/getUserSignInResponse.json";

import SignInRoute from ".";



const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));



describe("SignInRoute Tests", () => {
    let authAPI;
    let authStore;

    beforeEach(() => {
        authAPI = new AuthAPI();
        authStore = new AuthStore(authAPI);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    // it("should render username empty error message", () => {
    //     const {  debug } = render(
    //       <Router history={createMemoryHistory()}>
    //         <SignInRoute authStore={authStore} />
    //       </Router>
    //     );
    //     //const signInButton = getByRole("button", { name: "Sign in" });
    //     //debug();
    //     //fireEvent.click(signInButton);
    
    //     //getByText(/Please enter username/i);
    // });
    it("should render password empty error message", () => {
    // const { getByText, getByPlaceholderText, getByRole } = render(
        
    //     <Router history={createMemoryHistory()}>
    //         <SignInRoute authStore={authStore} />
    //     </Router>
    // );
    // const username = "test-user";
    // const usernameField = getByPlaceholderText("Username");
    // const signInButton = getByRole("button", { name: "Sign in" });

    // fireEvent.change(usernameField, { target: { value: username } });
    // fireEvent.click(signInButton);

    // getByText(/Please enter password/i);
  });

});