import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Colors } from '../../../../themes/Colors.js'

export const Container = styled.div`${tw`flex justify-between items-center  text-gray-700 border border-black bg-white`}
                            border:solid 1px ${Colors.lightBlueGrey};
                            min-height:60px;`

export const Span = styled.span`
   ${tw`flex justify-center items-center p-1 mx-2 whitespace-normal`}
   width:18%;
   flex-wrap: wrap;
   font-family: HKGrotesk;
   font-size: 14px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.71;
   letter-spacing: normal;
   color: ${Colors.steel};
`

export const LastCol = styled.span`
   ${tw`flex justify-center items-center p-1 mx-2 whitespace-normal`}
   width:10%;
   margin-right: 20px;
   flex-wrap: wrap;
   font-family: HKGrotesk;
   font-size: 14px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.71;
   letter-spacing: normal;
   color: ${Colors.steel};
`

export const AlignLeft = styled.span`
   ${tw`flex w-full text-left `}
`

export const AlignRight = styled.span`
   ${tw`w-full text-right `}
`
export const AlignCenter = styled.span`
   ${tw`w-full flex justify-center`}
`

export const S_no = styled.span`
   ${tw`flex justify-center items-center p-1 mx-2 whitespace-normal`}
   width:5%;
   font-family: HKGrotesk;
   font-size: 14px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.71;
   letter-spacing: normal;
   color: ${Colors.steel};
`

export const Table = styled.div`
   ${tw``}
`
