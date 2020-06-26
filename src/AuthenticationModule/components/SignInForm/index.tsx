import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { RiLoader4Line } from 'react-icons/ri'

import Button from '../../../components/common/Button/index'
import DisplayErrorMessage from '../../../components/common/DisplayErrorMessage/index'
import InputElement from '../../../components/common/InputElement/index'
import { Colors } from '../../../themes/Colors'
import {
   Typo32DarkBlueGreyRubikRegular,
   Typo12SteelHKGroteskSemiBold
} from '../../../styleGuide/Typos'
import DataStrings from '../../../i18n/strings.json'
import { ibhubsLogo } from '../../../styleGuide/images'

import { SigninContainer, Form } from './styledComponents'

type SignInFormProps = {
   apiStatus: number
   username: string
   password: string
   errorMessageUsernameField: string
   errorMessagePasswordField: string
   responseError: string
   onClickButton: (event: { preventDefault: () => void }) => void
   onChangeUsername: (event: { target: { value: string } }) => void
   onChangePassword: (event: { target: { value: string } }) => void
}

@observer
class SignInForm extends React.Component<SignInFormProps> {
   render() {
      const {
         onClickButton,
         apiStatus,
         username,
         password,
         errorMessagePasswordField,
         errorMessageUsernameField,
         onChangeUsername,
         onChangePassword,
         responseError
      } = this.props
      const {
         inputTypeText,
         inputTypePassword,
         placeholderTextUsername,
         placeholderTextPassword,
         labelTextUsername,
         labelTextPassword
      } = DataStrings

      const buttonCSS = {
         background: Colors.brightBlue,
         width: '66%',
         height: '40px',
         borderRadius: '4px'
      }
      const InputElementStyles = {
         background: Colors.white,
         width: '100%',
         height: '70px',
         borderRadius: '5px',
         border: `solid 1px ${Colors.steel}`
      }

      return (
         <SigninContainer>
            <Form onSubmit={onClickButton}>
               <div>
                  <img src={ibhubsLogo.src} alt={ibhubsLogo.alt} />
               </div>
               <div>
                  <Typo32DarkBlueGreyRubikRegular className='text-center'>
                     Hi there,
                     <br /> Login
                  </Typo32DarkBlueGreyRubikRegular>
               </div>
               <div className='flex flex-col justify-center items-start w-8/12'>
                  <Typo12SteelHKGroteskSemiBold>
                     {labelTextUsername}
                  </Typo12SteelHKGroteskSemiBold>
                  <InputElement
                     styles={InputElementStyles}
                     apiStatus={apiStatus}
                     inputType={inputTypeText}
                     placeholderText={placeholderTextUsername}
                     inputValue={username}
                     onChangeElement={onChangeUsername}
                  />
                  <DisplayErrorMessage
                     errorMessage={errorMessageUsernameField}
                  />
               </div>

               <div className='flex flex-col justify-center items-start w-8/12'>
                  <Typo12SteelHKGroteskSemiBold>
                     {labelTextPassword}
                  </Typo12SteelHKGroteskSemiBold>
                  <InputElement
                     styles={InputElementStyles}
                     apiStatus={apiStatus}
                     inputType={inputTypePassword}
                     placeholderText={placeholderTextPassword}
                     inputValue={password}
                     onChangeElement={onChangePassword}
                  />
                  <DisplayErrorMessage
                     errorMessage={errorMessagePasswordField}
                  />
               </div>

               <Button
                  onClickButton={onClickButton}
                  buttonValue={
                     apiStatus === API_FETCHING ? <RiLoader4Line /> : 'Login'
                  }
                  apiStatus={apiStatus}
                  buttonCSS={buttonCSS}
               />
               <DisplayErrorMessage errorMessage={responseError} />

               <p>
                  Don't have an account ? <a>signUp</a>
               </p>
            </Form>
         </SigninContainer>
      )
   }
}

export default SignInForm
