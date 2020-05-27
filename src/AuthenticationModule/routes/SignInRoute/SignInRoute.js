import React from "react"
import { observable, action } from "mobx"
import { observer, inject } from "mobx-react"
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { Redirect } from "react-router-dom"


import SignInPage from  "../../components"
import DataStrings from "../../../i18n/strings.json"

@inject("authStore")
@observer
class SignInRoute extends React.Component{
    @observable username = ""
    @observable password = ""
    @observable errorMessageUsernameField = ""
    @observable errorMessagePasswordField = ""
    
    
    
    onClickButton = (event) => {
       event.preventDefault();
       
        const { usernameFieldError,passwordFieldError } = DataStrings
        const { userSignIn } = this.props.authStore;
       
       if(this.username === "" || this.username === undefined ){
           this.errorMessageUsernameField = DataStrings.usernameFieldError;
           return;
       }
       else if (this.password === "" || this.password === undefined){
           this.errorMessagePasswordField = DataStrings.passwordFieldError;
           return;
       }
       else{
           this.errorMessageUsernameField = "";
           this.errorMessagePasswordField = "";
           userSignIn({
               username:this.username,
               password:this.password
           });
           this.username = "";
           this.password = "";
       }
    }
    
    onChangeUsername = (event) => {
        this.username = event.target.value;
        this.errorMessageUsernameField = "";
    }
    
    onChangePassword = (event) => {
        this.password = event.target.value;
        this.errorMessagePasswordField = "";
    }
    
    render(){
        const { getUserSignInAPIStatus } = this.props.authStore
        return (
           <SignInPage
                onClickButton={this.onClickButton} 
                onChangeUsername={this.onChangeUsername}
                onChangePassword={this.onChangePassword}
                apiStatus = {getUserSignInAPIStatus}
                username={this.username}
                password={this.password}
                errorMessageUsernameField={this.errorMessageUsernameField}
                errorMessagePasswordField={this.errorMessagePasswordField}
            />
            )
    }
}

export default SignInRoute;

