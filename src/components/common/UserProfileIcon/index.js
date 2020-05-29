import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { userdefaultImage } from '../../../styleGuide/images'

import { Img } from './styledComponents'

@observer
class UserProfileIcon extends React.Component {
   render() {
      console.log(userdefaultImage)
      return <Img src={userdefaultImage.src} alt={userdefaultImage.alt} />
   }
}

export default UserProfileIcon
