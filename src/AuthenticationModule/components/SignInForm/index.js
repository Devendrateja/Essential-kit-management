import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { RiLoader4Line } from "react-icons/ri"

import Button from "../../../components/common/Button/index"
import InputElement from "../../../components/common/InputElement/index"
import { Colors } from "../../../themes/Colors"
import { Typo32DarkBlueGreyRubikRegular,Typo12SteelHKGroteskSemiBold } from "../../../styleGuide/Typos"

import { SigninContainer, Form  } from "./styledComponents"



// export const LoginButton = styled(Button)`

//     background
//     width
//     height
// `
// const {className} = this.props

// <button className={className} />

@observer
class SignInForm extends React.Component{
    render(){
        const {onClickButton, apiStatus, username, password,errorMessage, onChangeUsername, onChangePassword} = this.props
       
        const buttonCSS = {
            background:Colors.brightBlue,
            width: "320px",
            height: "40px",
            borderRadius: "4px",
        }
        const InputElementStyles = {
            background:Colors.white,
            width: "320px",
            height: "40px",
            borderRadius: "2px",
            border: `solid 1px ${Colors.steel}`,
        }
        
    
       
        return (
            <SigninContainer>
                <Form onSubmit={onClickButton}>
                    <img src="img/i-b-hub-slogo.svg" alt="ibhubs-logo"/>
                    <Typo32DarkBlueGreyRubikRegular>Hi there, please sign up</Typo32DarkBlueGreyRubikRegular>
                    <Typo12SteelHKGroteskSemiBold>username </Typo12SteelHKGroteskSemiBold>
                    <InputElement
                        styles={InputElementStyles}
                        apiStatus={apiStatus}
                        inputType="text"
                        placeholderText="username" 
                        inputValue={username} 
                        onChangeElement={onChangeUsername} 
                    />
                   
                    <Typo12SteelHKGroteskSemiBold>password</Typo12SteelHKGroteskSemiBold>
                    <InputElement
                        styles={InputElementStyles}
                        apiStatus={apiStatus}
                        inputType="password" 
                        placeholderText="password" 
                        inputValue={password} 
                        onChangeElement={onChangePassword} 
                    />
                    
                    <Button
                        onClickButton={onClickButton} 
                        buttonValue={(apiStatus === API_FETCHING) ? <RiLoader4Line /> : "Login"}
                        apiStatus = {apiStatus}
                        buttonCSS = {buttonCSS}
                    />
                    <div>{errorMessage}</div>
                    <p>Don't have an account ? <a>signUp</a></p>
                </Form>
            </SigninContainer>
            )
    }
}



export default SignInForm;
