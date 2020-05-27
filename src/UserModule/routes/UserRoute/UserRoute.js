import React from "react"
import { observable, action } from "mobx"
import { observer, inject } from "mobx-react"
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { Redirect } from "react-router-dom"

import UserHome from "../../components"


class UserRoute extends React.Component{
    render(){
        return(
            <UserHome />
        )
    }
}

export default UserRoute;