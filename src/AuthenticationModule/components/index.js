import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'

import SignInForm from "./SignInForm/index"


@observer
class SignInPage extends React.Component{
    render(){
        const {onClickButton, apiStatus, username, password,errorMessage,onChangeUsername, onChangePassword} = this.props
        
        return(
            <SignInForm 
                onClickButton={onClickButton} 
                apiStatus = {apiStatus}
                username={username}
                password={password}
                errorMessage={errorMessage}
                onChangeUsername={onChangeUsername}
                onChangePassword={onChangePassword}
            />
            )
    }
}


export default SignInPage;
