import { TransactionObject } from '../../type'

class TransactionModel {
   transactionDate: string
   amount: number
   status: string
   remarks: string

   constructor(transaction: TransactionObject) {
      this.transactionDate = transaction.transaction_date
      this.amount = transaction.amount
      this.status = transaction.status
      this.remarks = transaction.remarks
   }
}

export default TransactionModel
