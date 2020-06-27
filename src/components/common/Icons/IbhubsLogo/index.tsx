import React, { Component } from 'react'
import SvgComponent from '../../SvgComponent'
import SvgFile from './SvgFile'

class IbhubsLogo extends Component {
   render() {
      return (
         <SvgComponent
            renderComponent={SvgFile}
            className={'svg'}
            {...this.props}
         />
      )
   }
}

export default IbhubsLogo
