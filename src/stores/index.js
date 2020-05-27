import CounterStore from './CounterStore'
import AuthStore from "../AuthenticationModule/stores/AuthStore"
import AuthAPI from "../AuthenticationModule/services/AuthService/index.api.js"



const counterStore = new CounterStore()

const authAPI = new AuthAPI()
const authStore = new AuthStore(authAPI)


export default {
  counterStore,
  authStore
}
