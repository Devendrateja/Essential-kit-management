import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import SearchBar from '../../../components/common/SearchBar'
import { Typo32DarkBlueGreyHKGroteskRegular } from '../../../styleGuide/Typos'

import { Container } from './styledComponents'

@observer
class TitleBar extends React.Component {
   render() {
      return (
         <Container data-testid={"title-form"}>
            <Typo32DarkBlueGreyHKGroteskRegular>
               Forms
            </Typo32DarkBlueGreyHKGroteskRegular>
         </Container>
      )
   }
}

export default TitleBar