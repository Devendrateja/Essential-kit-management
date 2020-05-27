import React from "react"
import { observer } from "mobx-react"
import { observable } from "mobx"
import { Redirect} from "react-router-dom"
import { withRouter } from "react-router-dom"
import NavigationButton from "../../components/common/NavigationButton"



import { clearUserSession } from "../../utils/StorageUtils.js"
import FormsPage from "./FormsPage"


@observer
class UserHome extends React.Component{
    
    signOut = () => {
         clearUserSession()
        this.redirectToSignInPage()
    }
    
    redirectToSignInPage = () => {
        const { history } = this.props
        const signin = history.push('/essential-kit-management/signin')
        return <div>{signin}</div>
        // return (
        //     <Redirect to='/essential-kit-management/signin'/>
        //     )
    }
    
    render(){
        return (
        
                <div onClick={this.signOut}>sign out</div>
                
            
            )
    }
}



//            <div onClick={this.signOut}><NavigationButton /></div>

export default withRouter(UserHome);
//<FormsPage />