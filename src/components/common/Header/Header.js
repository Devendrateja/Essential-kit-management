import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { ibhubsLogo2 } from '../../../styleGuide/images'

import UserProfileIcon from '../UserProfileIcon'

import dataStrings from '../../../i18n/strings.json'

import { PAY_REQUEST_PATH } from "../../../UserModule/constants/RouteConstants"

import { Typo12DarkBlueGreyHKGroteskSemiBold } from '../../../styleGuide/Typos'

import {
   HeaderContainer,
   SideBlocks,
   Text,
   Span,
   SignOutButton
} from './styledComponents'

@observer
class Header extends React.Component {
   render() {
      const { HOME, PAYREQUEST, MYWALLET } = dataStrings.UserModule.Header
      const { signOut, goToPayRequestPage } = this.props

      return (
         <HeaderContainer>
            <SideBlocks>
               <img src={ibhubsLogo2.src} alt={ibhubsLogo2.alt} />
            </SideBlocks>

            <SideBlocks>
               <Text>
                  <Typo12DarkBlueGreyHKGroteskSemiBold>
                     <Span>{HOME}</Span>
                  </Typo12DarkBlueGreyHKGroteskSemiBold>
               </Text>
               <Text>
                  <Typo12DarkBlueGreyHKGroteskSemiBold>
                     <Span onClick={goToPayRequestPage}>{PAYREQUEST}</Span>
                  </Typo12DarkBlueGreyHKGroteskSemiBold>
               </Text>
               <Text>
                  <Typo12DarkBlueGreyHKGroteskSemiBold>
                     <Span>{MYWALLET}</Span>
                  </Typo12DarkBlueGreyHKGroteskSemiBold>
               </Text>
               <SignOutButton onClick={signOut}>
                  {dataStrings.SignOut}
               </SignOutButton>
               <UserProfileIcon />
            </SideBlocks>
         </HeaderContainer>
      )
   }
}

export default Header
