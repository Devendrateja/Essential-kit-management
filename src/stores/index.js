import CounterStore from './CounterStore'

import AuthStore from '../AuthenticationModule/stores/AuthStore'
import AuthAPI from '../AuthenticationModule/services/AuthService/index.api.js'
import AuthFixturesService from '../AuthenticationModule/services/FixturesService/index.fixtures.js'

import FormFixturesService from '../UserModule/services/FormServices/index.fixtures.js'
import FormAPI from '../UserModule/services/FormServices/index.api.js'
import FormStore from '../UserModule/stores/FormStore'

import SelectedFormStore from '../UserModule/stores/SelectedFormStore'
import SelectedFormAPI from '../UserModule/services/SelectedFormServices/index.api.js'
import SelectedFormFixtures from '../UserModule/services/SelectedFormServices/index.fixtures.js'

import ClosedFormFixturesService from '../UserModule/services/ClosedFormServices/index.fixtures.js'
import ClosedFormAPI from '../UserModule/services/ClosedFormServices/index.api.js'
import ClosedFormStore from "../UserModule/stores/ClosedFormStore"


const counterStore = new CounterStore()

const authFixturesService = new AuthFixturesService()
const authAPI = new AuthAPI()
const authStore = new AuthStore(authAPI)

const closedFormFixturesService = new ClosedFormFixturesService()
const closedFormAPI = new ClosedFormAPI()
const closedFormStore = new ClosedFormStore(closedFormFixturesService)


const formFixturesService = new FormFixturesService()
const formAPI = new FormAPI()
const formStore = new FormStore(formAPI)

const selectedFormFixtures = new SelectedFormFixtures()
const selectedFormAPI = new SelectedFormAPI()
const selectedFormStore = new SelectedFormStore(selectedFormFixtures)



export default {
   counterStore,
   authStore,
   formStore,
   selectedFormStore,
   closedFormStore
}
