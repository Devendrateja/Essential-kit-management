import tw from 'tailwind.macro'
import styled from '@emotion/styled'

import { Colors } from '../../../themes/Colors.js'

export const Container = styled.div`${tw`flex flex-col w-full`}
                            background-color:${Colors.whiteTwo}`

export const Body = styled.div`
   ${tw`flex flex-col w-full `}
   padding-left:80px;
   padding-right: 80px;
`

export const InstructionsBar = styled.div`
   ${tw`flex flex-col `}
   margin-top:40px;
   margin-bottom: 40px;
`
