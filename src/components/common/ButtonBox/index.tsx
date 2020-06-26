import React from 'react'
import { observer } from 'mobx-react'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import './ButtonBox.css'

type ButtonProps = {
   onClickButton: (event: { preventDefault: () => void }) => void
   buttonValue: string | React.ReactElement<HTMLButtonElement>
   apiStatus: number
   className: string
}

@observer
class Button extends React.Component<ButtonProps> {
   render() {
      const { onClickButton, buttonValue, apiStatus, className } = this.props

      return (
         <button
            className={`${className}`}
            onClick={onClickButton}
            disabled={apiStatus === API_FETCHING ? true : false}
         >
            {buttonValue}
         </button>
      )
   }
}

export default Button
