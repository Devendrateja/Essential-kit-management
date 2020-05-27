import {observable, action, computed} from "mobx"
import {API_INITIAL, API_FETCHING, API_SUCCESS, API_FAILED} from "@ib/api-constants"
import {bindPromiseWithOnSuccess} from "@ib/mobx-promise"
import Form from "../models/FormModel"


class FormStore {
    formsAPIService 
    @observable getFormsAPIStatus 
    @observable getFormsAPIError
    @observable listOfForms
    
    
    
    constructor(formAPI){
        this.formsAPIService = formAPI;
        this.init();
    }
    
    
    @action.bound
    init(){
        this.getFormsAPIStatus = API_INITIAL;
        this.getFormsAPIError = null;
        this.listOfForms = ""
    }
    
    
    @action.bound
    setGetFormsAPIStatus(status){
        this.getFormsAPIStatus = status
    }
    
    
    
    @action.bound
    setGetFormsAPIError(error){
        this.getFormsAPIError = error
    }
    
    
    @action.bound
    setFormsAPIResponse(response){
        this.listOfForms = response
    }
    
    
    
    @action.bound
    getFormsList () {
        const promise = this.formsAPIService.getFormsAPI()
        return bindPromiseWithOnSuccess(promise)
        .to(this.setGetFormsAPIStatus, this.setFormsAPIResponse)
        .catch(this.setGetFormsAPIError)
    }
}


export default FormStore;