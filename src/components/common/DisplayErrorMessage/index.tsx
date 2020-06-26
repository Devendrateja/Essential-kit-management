import React from 'react'
import { observer } from 'mobx-react'

import { Typo12NeonRedHKGrotesk_Regular } from '../../../styleGuide/Typos'

type DisplayErrorMessageProps = {
   errorMessage: string
}

@observer
class DisplayErrorMessage extends React.Component<DisplayErrorMessageProps> {
   render() {
      const { errorMessage } = this.props
      return (
         <Typo12NeonRedHKGrotesk_Regular>
            {errorMessage}
         </Typo12NeonRedHKGrotesk_Regular>
      )
   }
}

export default DisplayErrorMessage
