import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Colors } from '../../../themes/Colors'

export const SigninContainer = styled.div`${tw`flex flex-col justify-center items-center`}
                                background-color:${Colors.iceBlue};
                                width:1440px;
                                height:1024px;`

export const Form = styled.form`
   ${tw`flex flex-col justify-around items-center`}
   width: 536px;
   height: 687px;
   border-radius: 8px;
   background-color: ${Colors.white};
`
