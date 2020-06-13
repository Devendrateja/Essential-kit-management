import {USER_HOME_PATH,
    SELECTED_FORM_PATH,
    CLOSED_FORM_PATH,
    PAY_REQUEST_PATH,
    MY_WALLET_PATH
} from "../../constants/RouteConstants"




export const goToPayRequestPage = history => {
    return history.push(PAY_REQUEST_PATH)

}
