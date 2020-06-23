import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Colors } from '../../../themes/Colors'

export const SigninContainer = styled.div`${tw`flex flex-col justify-center items-center w-screen h-screen`}
                                background-color:${Colors.iceBlue};
                                `

export const Form = styled.form`
   ${tw`flex flex-col justify-around items-center`}
   width: 30%;
   height: 80%;
   border-radius: 8px;
   background-color: ${Colors.white};
`
