import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { ibhubsLogo2 } from '../../../styleGuide/images'
import UserProfileIcon from '../../../components/common/UserProfileIcon'

import { HeaderContainer, SideBlocks, Text, Span } from './styledComponents'
import DataStrings from '../../../i18n/strings.json'
import { Typo12DarkBlueGreyHKGroteskSemiBold } from '../../../styleGuide/Typos'

@observer
class Header extends React.Component {
   @observable customize = true

   changeTextColor = () => {
      this.customize = false
   }
   render() {
      const { HOME, PAYREQUEST, MYWALLET } = DataStrings.UserModule.Header
      const { signOut }  = this.props
      
      return (
         <HeaderContainer>
            <SideBlocks>
               <img src={ibhubsLogo2.src} alt={ibhubsLogo2.alt} />
            </SideBlocks>

            <SideBlocks>
               <Text>
                  <Typo12DarkBlueGreyHKGroteskSemiBold>
                     <Span
                        onMouseDown={this.changeTextColor}
                        customize={this.customize}
                     >
                        {HOME}
                     </Span>
                  </Typo12DarkBlueGreyHKGroteskSemiBold>
               </Text>
               <Text>
                  <Typo12DarkBlueGreyHKGroteskSemiBold>
                     <Span>{PAYREQUEST}</Span>
                  </Typo12DarkBlueGreyHKGroteskSemiBold>
               </Text>
               <Text>
                  <Typo12DarkBlueGreyHKGroteskSemiBold>
                     <Span>{MYWALLET}</Span>
                  </Typo12DarkBlueGreyHKGroteskSemiBold>
               </Text>
               <div className="px-8" onClick={signOut}>signOut</div>
               <UserProfileIcon />
               
            </SideBlocks>
         </HeaderContainer>
      )
   }
}

export default Header
