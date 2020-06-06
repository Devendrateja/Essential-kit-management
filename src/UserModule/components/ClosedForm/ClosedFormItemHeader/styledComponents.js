import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Colors } from '../../../../themes/Colors'

export const Container = styled.div`${tw`px-4 flex justify-between items-center  text-gray-700 border border-black bg-white`}
                            border:solid 1px ${Colors.lightBlueGrey};
                            overflow:auto;
                            height:60px;`

export const ItemName = styled.span`
   ${tw`flex justify-center items-center p-1 mx-2 whitespace-normal`}
   width:23%;
   flex-wrap: wrap;
   font-family: HKGrotesk;
   font-size: 12px;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: normal;
   color: ${Colors.steel};
`

export const ItemTitle = styled.span`
   ${tw`flex justify-center items-center p-1 mx-2 whitespace-normal`}
   width:18%;
   flex-wrap: wrap;
   font-family: HKGrotesk;
   font-size: 12px;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: normal;
   color: ${Colors.steel};
`

export const LastCol = styled.span`
   ${tw`flex justify-center items-center p-1 mx-2 whitespace-normal`}
   width:10%;
   margin-right: 20px;
   flex-wrap: wrap;
   font-family: HKGrotesk;
   font-size: 12px;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: normal;
   color: ${Colors.darkBlueGrey};
`

export const AlignLeft = styled.span`
   ${tw`flex w-full text-left `}
`

export const AlignRight = styled.span`
   ${tw`w-full text-right `}
`

export const AlignCenter = styled.span`
   ${tw`w-full text-center`}
`

export const Sno = styled.span`
   ${tw`flex justify-center items-center p-1 mx-2 whitespace-normal`}
   width:5%;
   flex-wrap: wrap;
   font-family: HKGrotesk;
   font-size: 12px;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: normal;
   color: ${Colors.steel};
`
