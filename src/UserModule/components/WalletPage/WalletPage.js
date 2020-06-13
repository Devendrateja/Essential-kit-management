import React from "react"
import { observable } from "mobx"
import { observer } from "mobx-react"

import Header from "../../../components/common/Header"
import NavigationButton from "../../../components/common/NavigationButton"
import Button from "../../../components/common/ButtonBox"
import TableColumn from "../../../components/common/TableColumn"
import { Typo32DarkBlueGreyHKGroteskRegular, Typo24DarkBlueGreyHKGroteskBold, Typo24DarkBlueGreyHKGroteskRegular, Typo14SteelHKGroteskRegular, Typo12SteelHKGroteskSemiBold, TextStyle11 } from "../../../styleGuide/Typos"
import { DebitIcon } from '../../../styleGuide/images'
import { USER_HOME_PATH } from "../../constants/RouteConstants"

//import TransactionColumn from "./TransactionColumn"

// import dataStrings from "../../../"

import { WalletPageContainer, Body, TransactionsContainer, TitleBar, MyWalletText, BalanceBar, TableContent } from "./styledComponents"

@observer
class WalletPage extends React.Component {

    // getListOfTransactions = () => {
    //     const {listOfTransactions} = this.props

    //     let list = listOfTransactions.map(eachTransaction => {
    //         const transactionDetails = []
    //         const date = <Typo14SteelHKGroteskRegular>{eachTransaction.transactionDate}</Typo14SteelHKGroteskRegular>
    //         transactionDetails.push(date)
    //         const amount = (eachTransaction.amount < 0) ? <span><TextStyle2>-₹{eachTransaction.amount}</TextStyle2><img src={DebitIcon.src} alt={DebitIcon.alt}/></span> 
    //                                                     : <span><TextStyle11>+₹{eachTransaction.amount}</TextStyle11></span>

    //         transactionDetails.push(amount)
    //         const state = <Typo14SteelHKGroteskRegular>{eachTransaction.status}</Typo14SteelHKGroteskRegular>
    //         transactionDetails.push(state)
    //         const remarks = <Typo14SteelHKGroteskRegular>{eachTransaction.remarks}</Typo14SteelHKGroteskRegular>
    //         transactionDetails.push(remarks)

    //         return transactionDetails
    //     })






    // }



    render() {
        const { listOfTransactions, signOut, goToHomePage, goToPayRequestPage, NavButtonPath } = this.props
        let listOfHeaders = ["DATE", "AMOUNT", "VERIFICATION", "REMARKS"].map(eachCell => {
            return <Typo12SteelHKGroteskSemiBold>{eachCell}</Typo12SteelHKGroteskSemiBold>
        })

        return (
            <WalletPageContainer>
                <Header 
                    signOut={signOut}
                    goToPayRequestPage={goToPayRequestPage}
                    goToHomePage={goToHomePage}
                />
                <Body>
                    <TitleBar>
                        <NavigationButton path={USER_HOME_PATH}/>
                        <MyWalletText><Typo32DarkBlueGreyHKGroteskRegular>MY WALLET</Typo32DarkBlueGreyHKGroteskRegular></MyWalletText>
                    </TitleBar>
                    <BalanceBar>
                        <div><Typo24DarkBlueGreyHKGroteskBold>Balance </Typo24DarkBlueGreyHKGroteskBold><Typo24DarkBlueGreyHKGroteskRegular>: 2300/-</Typo24DarkBlueGreyHKGroteskRegular></div>
                        <Button
                        className="add-money"
                        buttonValue="Add Money"
                        />
                    </BalanceBar>
                    <TransactionsContainer>
                        <div className="flex justify-sart w-full"><Typo32DarkBlueGreyHKGroteskRegular>TRANSACTIONS</Typo32DarkBlueGreyHKGroteskRegular></div>
                        <TableColumn 
                            listOfCells={listOfHeaders}
                        />
                       
                    </TransactionsContainer>
                    
                </Body>
                
            </WalletPageContainer>
        )
    }
}


export default WalletPage;
