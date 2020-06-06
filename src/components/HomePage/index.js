import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'
import { SIGN_IN_PATH } from '../../AuthenticationModule/constants/RouteConstants'
import {
   USER_HOME_PATH,
   SELECTED_FORM_PATH,
   CLOSED_FORM_PATH,
   PAY_REQUEST_PATH,
   MY_WALLET_PATH
} from '../../UserModule/constants/RouteConstants'

function App() {
   return (
      <div className='App'>
         <nav>
            <Link to='/page-1'>Page 1</Link>
            <div>
               <Link to={SIGN_IN_PATH}> SignIn </Link>
            </div>
            <div>
               <Link to={USER_HOME_PATH}> Home </Link>
            </div>
            <div>
               <Link to={SELECTED_FORM_PATH}>Selected Form</Link>
            </div>
            <div>
               <Link to={CLOSED_FORM_PATH}>Closed Form</Link>
            </div>
            <div>
               <Link to={PAY_REQUEST_PATH}>pay request</Link>
            </div>
            <div>
               <Link to={MY_WALLET_PATH}>my wallet</Link>
            </div>
         </nav>
      </div>
   )
}

export default App
