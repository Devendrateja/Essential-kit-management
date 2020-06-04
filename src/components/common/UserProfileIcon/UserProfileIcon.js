import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { userdefaultImage } from '../../../styleGuide/images'

import { UserProfileImage } from './styledComponents'

@observer
class UserProfileIcon extends React.Component {
   @observable isCollapse = true

   collapseOrExpand = () => {
      this.isCollapse = !this.isCollapse
   }

   render() {
      return (
         <UserProfileImage
            onClick={this.collapseOrExpand}
            src={userdefaultImage.src}
            alt={userdefaultImage.alt}
         />
      )
   }
}

export default UserProfileIcon
