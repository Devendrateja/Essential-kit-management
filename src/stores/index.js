import CounterStore from './CounterStore'
import AuthStore from '../AuthenticationModule/stores/AuthStore'
import AuthAPI from '../AuthenticationModule/services/AuthService/index.api.js'
import FormAPI from '../UserModule/services/FormServices/index.api.js'
import FormStore from '../UserModule/stores/FormStore'

const counterStore = new CounterStore()

const authAPI = new AuthAPI()
const authStore = new AuthStore(authAPI)

const formAPI = new FormAPI()
const formStore = new FormStore(formAPI)

export default {
   counterStore,
   authStore,
   formStore
}
