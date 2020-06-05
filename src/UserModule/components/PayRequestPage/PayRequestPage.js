import React from 'react'
import { observer,  inject } from 'mobx-react'
import { observable} from 'mobx'



import Header from "../../../components/common/Header"
import NavigationButton from "../../../components/common/NavigationButton"


@observer
class PayRequestPage extends React.Component{
    render(){
       return (
           <div>
                <Header />
                <div>
                    <NavigationButton />
                    <div className="flex">
                        <div>
                            qr code
                        </div>
                        <div>
                        trans
                        </div>
                    </div>
                </div>
            </div>
           )
    }
}


export default PayRequestPage;