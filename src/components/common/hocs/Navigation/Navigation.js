import {PAY_REQUEST_PATH} from "../../../../UserModule/constants/RouteConstants"
import { withRouter } from 'react-router-dom'



export const goToPayRequestPage = () => {
   
      const { history } = this.props
      const signin = history.push(PAY_REQUEST_PATH)
      return <div>{signin}</div>
  
}