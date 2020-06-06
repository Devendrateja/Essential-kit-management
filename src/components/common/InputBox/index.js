import React from 'react'
import { observer } from 'mobx-react'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import "./inputBox.css"


@observer
class InputElement extends React.Component {
   render() {
      const {
         className,
         onChangeElement,
         inputType,
         placeholderText,
         apiStatus,
         inputValue,
         styles
      } = this.props
      return (
         <input
            className={`${className}`}
            type={inputType}
            placeholder={placeholderText}
            value={inputValue}
            onChange={onChangeElement}
            disabled={apiStatus === API_FETCHING ? true : false}
         />
      )
   }
}

export default InputElement
