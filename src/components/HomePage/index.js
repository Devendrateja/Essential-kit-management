import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { SIGN_IN_PATH } from "../../AuthenticationModule/constants/RouteConstants"

function App() {
  return (
    <div className="App">
        <nav>
            <Link to="/page-1">Page 1</Link>
            <div><Link to={SIGN_IN_PATH}> Essential Kit Management SignIn </Link></div>
        </nav>
    </div>
  );
}

export default App;
