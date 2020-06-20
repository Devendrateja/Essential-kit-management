import CounterStore from './CounterStore'

import AuthStore from '../AuthenticationModule/stores/AuthStore'
import AuthAPI from '../AuthenticationModule/services/AuthService/index.api.js'
import AuthFixturesService from '../AuthenticationModule/services/FixturesService/index.fixtures.js'

import FormFixturesService from '../UserModule/services/FormServices/index.fixtures.js'
import FormAPI from '../UserModule/services/FormServices/index.api.js'
import FormStore from '../UserModule/stores/FormStore'



let isFixtures = true

const counterStore = new CounterStore()

const authAPI = isFixtures ? new AuthFixturesService() : new AuthAPI()
const authStore = new AuthStore(authAPI)


const formAPI = isFixtures ? new FormFixturesService() : new FormAPI()
const formStore = new FormStore(formAPI)



export default {
   counterStore,
   authStore,
   formStore,
   
}