import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Colors } from '../../../../themes/Colors'

export const FooterContainer = styled.div`${tw`flex justify-between p-4 w-full border border-black`}
                                background-color:${Colors.darkBlueGrey};
                                padding-left:5%;
                                padding-right:5%;
                                margin-top:100px;`

export const FooterColumn = styled.div`
   ${tw`flex flex-col p-2`}
`
