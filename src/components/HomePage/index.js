import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'
import { SIGN_IN_PATH } from '../../AuthenticationModule/constants/RouteConstants'
import {
   USER_HOME_PATH,
   SELECTED_FORM_PATH
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
         </nav>
      </div>
   )
}

export default App
