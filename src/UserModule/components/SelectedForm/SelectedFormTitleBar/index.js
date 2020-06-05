import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import {
   Typo12SteelHKGroteskRegular,
   Typo32DarkBlueGreyHKGroteskRegular,
   TextStyle7
} from '../../../../styleGuide/Typos'

import { USER_HOME_PATH } from '../../../constants/RouteConstants'
import NavigationButton from '../../../../components/common/NavigationButton'

import { Container } from './styledComponents'

@observer
class SelectedFormTitleBar extends React.Component {
   render() {
      const { selectedFormData } = this.props
      return (
         <Container>
            <NavigationButton path={USER_HOME_PATH} />
            {selectedFormData !== undefined && (
               <Typo32DarkBlueGreyHKGroteskRegular>
                  {selectedFormData.formName}
               </Typo32DarkBlueGreyHKGroteskRegular>
            )}
            {selectedFormData !== undefined && (
               <TextStyle7>Close On : {selectedFormData.closeDate}</TextStyle7>
            )}
         </Container>
      )
   }
}

export default SelectedFormTitleBar
