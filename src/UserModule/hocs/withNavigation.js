import React from "react"
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { PAY_REQUEST_PATH, MY_WALLET_PATH, USER_HOME_PATH } from "../constants/RouteConstants"
import { SIGN_IN_PATH } from "../../AuthenticationModule/constants/RouteConstants"


const withNavigation = (WrappedComponent) => {
    class HeaderProps extends React.Component {      

        goToPayRequestPage = () => {
            const { history } = this.props
            return history.push(PAY_REQUEST_PATH)
        }


        goToWalletPage = () => {
            const { history } = this.props
            return history.push(MY_WALLET_PATH)

        }


        goToHomePage = () => {
            const { history } = this.props
             history.push(USER_HOME_PATH)
        }
        
        
        
        goToSignInPage = () => {
             const { history } = this.props
             return history.replace(SIGN_IN_PATH)
             
        }


        render() {
            return (
                <WrappedComponent goToPayRequestPage={this.goToPayRequestPage} 
                            goToWalletPage={this.goToWalletPage}
                            goToHomePage={this.goToHomePage}
                            goToSignInPage={this.goToSignInPage}
                            {...this.props}/>
            )
        }
    }


    return withRouter(HeaderProps)
}



export default withNavigation
