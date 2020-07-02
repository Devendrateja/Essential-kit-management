import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'
import { History } from 'history'
import SignInPage from '../../components'
import DataStrings from '../../../i18n/strings.json'
import { USER_HOME_PATH } from '../../../UserModule/constants/RouteConstants'
import { getAccessToken, setAccessToken } from '../../../utils/StorageUtils'
import { getUserDisplayableErrorMessage } from '../../../utils/APIUtils'
import AuthStore from '../../stores/AuthStore'

interface SignInRouteProps extends RouteComponentProps {}

interface InjectedProps extends SignInRouteProps {
   authStore: AuthStore
}

@inject('authStore')
@observer
class SignInRoute extends React.Component<SignInRouteProps> {
   @observable username = ''
   @observable password = ''
   @observable errorMessageUsernameField = ''
   @observable errorMessagePasswordField = ''
   @observable responseError = ''

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   onChangeUsername = (event: { target: { value: string } }) => {
      this.username = event.target.value
      this.errorMessageUsernameField = ''
   }

   onChangePassword = (event: { target: { value: string } }) => {
      this.password = event.target.value
      this.errorMessagePasswordField = ''
   }

   onSignInSuccess = () => {
      // const { history } = this.getInjectedProps()
      // history.push(USER_HOME_PATH)
   }

   onSignInFailure = () => {
      const {
         getUserSignInAPIError: apiError
      } = this.getInjectedProps().authStore
      if (apiError !== null && apiError !== undefined) {
         let signinError = getUserDisplayableErrorMessage(apiError)

         this.responseError = signinError
      }
   }

   onClickButton = (event: { preventDefault: () => void }) => {
      event.preventDefault()

      const { usernameFieldError, passwordFieldError } = DataStrings
      const { userSignIn } = this.getInjectedProps().authStore

      if (this.username === '' && this.password === '') {
         this.errorMessageUsernameField = DataStrings.usernameFieldError
         this.errorMessagePasswordField = DataStrings.passwordFieldError
         return
      } else if (this.username === '' || this.username === undefined) {
         this.errorMessageUsernameField = DataStrings.usernameFieldError
         return
      } else if (this.password === '' || this.password === undefined) {
         this.errorMessagePasswordField = DataStrings.passwordFieldError
         return
      } else {
         this.errorMessageUsernameField = ''
         this.errorMessagePasswordField = ''
         userSignIn(
            {
               username: this.username,
               password: this.password
            },
            this.onSignInSuccess,
            this.onSignInFailure
         )
      }
   }

   renderUserHome = () => {
      const { history } = this.getInjectedProps()
      return <Redirect to={{ pathname: USER_HOME_PATH }} />
   }

   render() {
      const { getUserSignInAPIStatus } = this.getInjectedProps().authStore
      const AccessToken = getAccessToken()
      if (AccessToken) {
         return this.renderUserHome()
      }

      return (
         <SignInPage
            onClickButton={this.onClickButton}
            onChangeUsername={this.onChangeUsername}
            onChangePassword={this.onChangePassword}
            apiStatus={getUserSignInAPIStatus}
            username={this.username}
            password={this.password}
            errorMessageUsernameField={this.errorMessageUsernameField}
            errorMessagePasswordField={this.errorMessagePasswordField}
            responseError={this.responseError}
         />
      )
   }
}

export default withRouter(SignInRoute)
