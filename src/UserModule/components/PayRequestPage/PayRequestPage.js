import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

import { USER_HOME_PATH } from "../../constants/RouteConstants"
import Header from "../../../components/common/Header"
import NavigationButton from "../../../components/common/NavigationButton"
import InputElement from "../../../components/common/InputBox"
import Button from "../../../components/common/ButtonBox"
//import Button from "../../../components/common/Button"

import Select from 'react-select'
import ReadMoreReact from 'read-more-react'

import dataStrings from "../../../i18n/strings.json"
import { Typo16DarkBlueGreyHKGroteskMedium, TextStyle5, TextStyle7, Typo16BrightBlueHKGroteskBold, Typo12SteelHKGroteskSemiBold, TextStyle10 } from "../../../styleGuide/Typos"


import { PageContainer, Body, PayRequestContainer, QRCodeContainer, VerificationDetailsContainer, PayThroughTitle, UPIId, VerificationText, NavButton, InputContainer, InputsContainer, DNDContainer, Dnd, SendButton } from "./styledComponents.js"


@observer
class PayRequestPage extends React.Component {
    @observable transactionAmount
    @observable transactionId
    @observable transactionType

    onEnterAmount = (event) => {
        console.log(event.target.value)
        this.transactionAmount = event.target.value
    }


    onEnterTransactionId = (event) => {
        console.log(event.target.value)
        this.transactionId = event.target.value
    }



    handleChangeTransactionType = (method) => {
        console.log(method)
        this.transactionType = method
    }


    sendTransactionDetails = () => {
        
        const { sendPaymentData } = this.props
        const data = {
            "amount": this.transactionAmount,
            "transaction_id": this.transactionId,
            "transaction_type": this.transactionType.value,
            "screenshot_url": "sampleUrl@jsdj"
        }
        console.log("transactionndetails",this.transactionType)
        sendPaymentData(data)
    }
    
    getPaymentOptions =() => {
        let options =  [{ value: "phonePay", label: "phonePe" }, 
                                { value: "googlePay", label: "googlePay" },
                                { value: "paypal", label: "paypal" }
                            ];
        return options;
    }



    render() {
        const { onClickSend, signOut, goToHomePage , upi,goToWalletPage } = this.props
        let PaymentOptions = this.getPaymentOptions()

        const {
            payThrough,
            upiId,
            verificationDetails,
            amount,
            enterAmount,
            transactionIdText,
            transactionPlaceHolder,
            transactionTypeText,
            uploadScreenShot,
            DragnDropSentence
        } = dataStrings

        return (
            <PageContainer>
                <Header signOut={signOut} goToHomePage={goToHomePage} goToWalletPage={goToWalletPage}/>
                <NavButton><NavigationButton path={USER_HOME_PATH}/></NavButton>
                <Body>
                    <PayRequestContainer>
                        <QRCodeContainer>
                            <PayThroughTitle><Typo16DarkBlueGreyHKGroteskMedium>{payThrough}</Typo16DarkBlueGreyHKGroteskMedium></PayThroughTitle>
                            <QRCode size={100} level="Q" value={`${upi}`}  />
                            <TextStyle5>or</TextStyle5>
                            <UPIId><TextStyle7>{upiId} :</TextStyle7> <Typo16BrightBlueHKGroteskBold> {upi}</Typo16BrightBlueHKGroteskBold></UPIId>
                        </QRCodeContainer>
                        <VerificationDetailsContainer>
                            <VerificationText><Typo16DarkBlueGreyHKGroteskMedium>{verificationDetails}</Typo16DarkBlueGreyHKGroteskMedium></VerificationText>
                            <InputsContainer>
                                <InputContainer>
                                    <Typo12SteelHKGroteskSemiBold>{amount}</Typo12SteelHKGroteskSemiBold>
                                    <InputElement 
                                        className="transactionInput"
                                        type="number"
                                        placeholderText="Enter Amount"
                                        onChangeElement={this.onEnterAmount}
                                        inputValue={this.transactionAmount}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <Typo12SteelHKGroteskSemiBold>{transactionIdText}</Typo12SteelHKGroteskSemiBold>
                                    <InputElement 
                                        type="number"
                                         className="transactionInput"
                                        placeholderText="Transaction id"
                                        onChangeElement={this.onEnterTransactionId}
                                        inputValue={this.transactionId}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <Typo12SteelHKGroteskSemiBold>{transactionTypeText}</Typo12SteelHKGroteskSemiBold>
                                    <Select
                                        value={this.transactionType}
                                        onChange={this.handleChangeTransactionType}
                                        options={PaymentOptions}
                                    />
                                </InputContainer>
                            </InputsContainer>
                            <DNDContainer>
                                <Typo12SteelHKGroteskSemiBold>{uploadScreenShot}</Typo12SteelHKGroteskSemiBold>
                                <Dnd><TextStyle10>{DragnDropSentence}</TextStyle10></Dnd>
                            </DNDContainer>
                            <SendButton>
                                <Button onClickButton={this.sendTransactionDetails}
                                    className="transactionPayment"
                                    buttonValue="Send"   
                                />
                            </SendButton>
                        </VerificationDetailsContainer>
                    </PayRequestContainer>
                </Body>
            </PageContainer>
        )
    }
}


export default PayRequestPage;
