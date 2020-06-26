export interface FormObject {
   form_id: number
   form_name: string
   form_status: string
   close_date: string
   expected_delivery_date: string
   items_count: number
   estimated_cost: number
   items_pending_count: number
   cost_incurred_for_delivered_items: number
}

export interface FormsResponse {
   total_forms: number
   list_of_forms: Array<FormObject>
}

export interface SelectedFormBrandDetails {
   brand_id: number
   brand: string
   max_min_quantity: number
   price_per_item: number
   count: number
}

export interface SelectedFormItemDetails {
   description: string
   item_id: number
   Item_name: string
   brands: Array<SelectedFormBrandDetails>
}

export interface SelectedFormSectionDetails {
   section_id: number
   section_name: string
   description: string
   item_details: Array<SelectedFormItemDetails>
}

export interface SelectedFormResponse {
   form_id: number
   form_name: string
   form_description: string
   close_date: string
   total_items: number
   total_cost: number
   sections_details: Array<SelectedFormSectionDetails>
}

export interface ClosedFormItemDetails {
   item_id: number
   item_name: string
   items_added: number
   items_recieved: number
   cost_incurred: number
}

export interface ClosedFormResponse {
   list_of_items: Array<ClosedFormItemDetails>
}

export interface TransactionUPIResponse {
   upi_id: string
}

export interface TransactionObject {
   transaction_date: string
   amount: number
   status: string
   remarks: string
}

export interface TransactionsResponse {
   total_transaction: number
   total_amount: number
   transactions: Array<TransactionObject>
}
