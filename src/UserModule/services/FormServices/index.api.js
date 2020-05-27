import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'
import { networkCallWithApisauce } from '../../../utils/APIUtils'


class FormAPI {
    api
    
    constructor(){
        this.api = create({
            baseURL:""
        })
    }
    
    getFormsAPI(){
         return networkCallWithApisauce(
              this.api, "", {},  apiMethods.get
             )
    }
}

export default FormAPI;