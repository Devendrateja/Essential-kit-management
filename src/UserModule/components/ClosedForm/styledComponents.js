import tw from 'tailwind.macro'
import styled from '@emotion/styled'

import { Colors } from '../../../themes/Colors.js'


export const ClosedFormContainer = styled.div`${tw`flex flex-col w-full h-full`}
                            background-color:${Colors.whiteTwo}`


export const Body = styled.div`
   ${tw`flex flex-col w-full h-full`}
   padding-left:5%;
   padding-right: 5%;
`

export const NavButton = styled.div`${tw`w-full `}
                            margin-top:50px;`

export const Titile = styled.div`${tw`w-full`}
                        margin-top:50px;
                        margin-bottom:30px;`
                        
                        
export const Items = styled.div`${tw`h-full`}
                        overflow:auto;
                        height:10%;
                        `



