import React from 'react'
import { Route } from 'react-router-dom'

import { USER_HOME_PATH } from "../constants/RouteConstants"
import { UserRoute } from "./UserRoute"



const EssentialKitUserHomeRoute = [
   <Route key={USER_HOME_PATH} path={USER_HOME_PATH} component={UserRoute} />
];


export default EssentialKitUserHomeRoute;