import React from "react"
import { observable, action } from "mobx"
import { observer, inject } from "mobx-react"
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { Redirect } from "react-router-dom"


import SignInPage from  "../../components"

@observer
class SignInRoute extends React.Component{
    @observable username = ""
    @observable password = ""
    @observable errorMessage = ""
    
    
    
    onClickButton = (event) => {
       event.preventDefault();
       if(this.username === "" || this.username === undefined ){
           this.errorMessage = "please enter username";
           return;
       }
       else if (this.password === "" || this.password === undefined){
           this.errorMessage = "please enter password";
           return;
       }
       else{
           this.errorMessage = "";
           console.log("button Clicked", this.username, this.password);
       }
        
    }
    
    onChangeUsername = (event) => {
        this.username = event.target.value;
        console.log("username" , this.username);
    }
    
    onChangePassword = (event) => {
        this.password = event.target.value;
        console.log("password", this.password)
    }
    
    render(){
        return (
           <SignInPage
                onClickButton={this.onClickButton} 
                onChangeUsername={this.onChangeUsername}
                onChangePassword={this.onChangePassword}
                apiStatus = {0}
                username={this.username}
                password={this.password}
                errorMessage={this.errorMessage}
            />
            )
    }
}

export default SignInRoute;

