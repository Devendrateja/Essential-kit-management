import React from "react";
import {Route} from "react-router-dom"
import {
    SIGN_IN_PATH
} from '../constants/RouteConstants';


import {SignInRoute} from "./SignInRoute/index";

const EssentialKitRoutes = [
    <Route key={SIGN_IN_PATH} path={SIGN_IN_PATH} component={SignInRoute}/>
    ];
    
    
export default EssentialKitRoutes;