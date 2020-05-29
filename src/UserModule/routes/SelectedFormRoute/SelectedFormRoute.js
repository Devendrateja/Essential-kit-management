import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import SelectedForm from '../../components/SelectedForm'
import NoDataView from '../../../components/common/NoDataView'

@observer
class SelectedFormRoute extends React.Component {
   render() {
      return <SelectedForm />
   }
}

export default SelectedFormRoute
