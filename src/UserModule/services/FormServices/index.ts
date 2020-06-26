import {
   FormsResponse,
   SelectedFormResponse,
   ClosedFormResponse,
   TransactionUPIResponse,
   TransactionsResponse
} from '../../stores/type'

interface FormService {
   getFormsAPI: (limit: number, offset: number) => Promise<FormsResponse>

   getSelectedFormAPI: (id: number) => Promise<SelectedFormResponse>

   setSelectedFormAPI: (id: number, data: any) => void

   getClosedFormAPI: (id: number) => Promise<ClosedFormResponse>

   getTransactionUPI: () => Promise<TransactionUPIResponse>

   sendTransactionDetails: (data: any) => Promise<null>

   getUserTransactionList: () => Promise<TransactionsResponse>
}
export default FormService
