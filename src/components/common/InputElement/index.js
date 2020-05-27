import React from 'react'
import { observer } from 'mobx-react'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import { InputEl } from './styledComponents.js'

@observer
class InputElement extends React.Component {
   render() {
      const { 
         onChangeElement,
         inputType,
         placeholderText,
         apiStatus,
         inputValue,
         styles
      } = this.props
      return (
         <InputEl
            type={inputType}
            styles={styles}
            placeholder={placeholderText}
            value={inputValue}
            onChange={onChangeElement}
            disabled={apiStatus === API_FETCHING ? true : false}
         />
      )
   }
}

export default InputElement
//defaultValue={inputValue} styles={styles}
