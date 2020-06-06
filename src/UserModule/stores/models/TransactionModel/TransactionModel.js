import React from 'react'
import { observable, action, computed } from 'mobx'


class TransactionModel {
    transactionDate
    amount
    status
    remarks
    
    constructor(transaction){
        this.transactionDate = transaction.transaction_date
        this.amount = transaction.amount
        this.status = transaction.status
        this.remarks = transaction.remarks
    }
    
}



export default TransactionModel;
