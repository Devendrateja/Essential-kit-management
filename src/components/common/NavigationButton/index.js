import React from 'react'
import { observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { MdNavigateNext } from 'react-icons/md'

import { NavBack } from '../../../styleGuide/images'
import DataStrings from "../../../i18n/strings.json"
import { Typo12SteelHKGroteskRegular } from "../../../styleGuide/Typos"


import { NavContainer } from './styledComponents.js'


@observer
class NavigationButton extends React.Component {
   
   
   goBackTo = (path) => {
      const { history } = this.props
      return history.replace(path)
   }
   
   render() {
      const { path } = this.props
      return (
         <div className='flex'  onClick={()=>this.goBackTo(path)}>
               <img src={NavBack.src} alt={NavBack.alt} />
               <Typo12SteelHKGroteskRegular>
                  {' '}
                  {DataStrings.BackToList}
               </Typo12SteelHKGroteskRegular>
            </div>
      )
   }
}

export default withRouter(NavigationButton)
