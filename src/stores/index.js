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
import ClosedFormStore from '../UserModule/stores/ClosedFormStore'

let isFixtures = true

const counterStore = new CounterStore()

const authAPI = isFixtures ? new AuthFixturesService() : new AuthAPI()
const authStore = new AuthStore(authAPI)

const formAPI = isFixtures ? new FormFixturesService() : new FormAPI()
const formStore = new FormStore(formAPI)

const selectedFormAPI = isFixtures
   ? new SelectedFormFixtures()
   : new SelectedFormAPI()
const selectedFormStore = new SelectedFormStore(selectedFormAPI)

const closedFormAPI = isFixtures
   ? new ClosedFormFixturesService()
   : new ClosedFormAPI()
const closedFormStore = new ClosedFormStore(closedFormAPI)

export default {
   counterStore,
   authStore,
   formStore,
   selectedFormStore,
   closedFormStore
}
