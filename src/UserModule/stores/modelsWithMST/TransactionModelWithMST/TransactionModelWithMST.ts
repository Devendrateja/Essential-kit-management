import { types } from 'mobx-state-tree'
import { TransactionObject } from '../../type'

const TransactionModelWithMST = types.model({
   transactionDate: types.string,
   amount: types.number,
   status: types.string,
   remarks: types.string
})

export default TransactionModelWithMST
