import React from 'react'
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom'
import { History } from 'history'
import {
   PAY_REQUEST_PATH,
   MY_WALLET_PATH,
   USER_HOME_PATH
} from '../constants/RouteConstants'
import { SIGN_IN_PATH } from '../../AuthenticationModule/constants/RouteConstants'

interface HistoryProps extends RouteComponentProps {}

function withNavigation<T>(WrappedComponent: React.ComponentType<T>) {
   class HeaderProps extends React.Component<T & HistoryProps> {
      propsType = () => {
         return this.props as HistoryProps
      }

      goTo = path => {
         const { history } = this.propsType()
         history.push(path)
      }

      goToPayRequestPage = () => {
         this.goTo(PAY_REQUEST_PATH)
      }

      goToWalletPage = () => {
         this.goTo(MY_WALLET_PATH)
      }

      goToHomePage = () => {
         this.goTo(USER_HOME_PATH)
      }

      goToSignInPage = () => {
         this.goTo(SIGN_IN_PATH)
      }

      render() {
         return (
            <WrappedComponent
               goToPayRequestPage={this.goToPayRequestPage}
               goToWalletPage={this.goToWalletPage}
               goToHomePage={this.goToHomePage}
               goToSignInPage={this.goToSignInPage}
               {...this.props}
            />
         )
      }
   }

   return HeaderProps
}

export default withNavigation
