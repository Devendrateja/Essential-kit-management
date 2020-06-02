import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Colors } from '../../../../themes/Colors'

export const Footer = styled.div`${tw`flex flex-col w-full`}
                        background-color:${Colors.darkBlueGrey};
                        margin-top:50px;`

export const Button = styled.button`
   ${tw``}
   color:white;
   background-color: ${Colors.brightBlue};
   border-radius: 5px;
   height: 50px;
   width: 10%;
`

export const SaveButton = styled.button`
   ${tw`flex justify-center items-center mx-4`}
   color:white;
   border: solid 1px ${Colors.white};
   background-color: ${Colors.darkBlueGrey};
   border-radius: 5px;
   height: 50px;
   padding: 15px;
`
export const ValuationRow = styled.div`
   ${tw`flex justify-between  w-full px-24 my-4`}
`
export const UpdateBlock = styled.div`
   ${tw`flex p-2 justify-end px-24 my-4`}
`
