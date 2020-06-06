import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Colors } from '../../../themes/Colors.js'

export const Container = styled.div`${tw`flex justify-between items-center mx-16  border border-black bg-white `}
                            border:solid 1px ${Colors.lightBlueGrey};
                            overflow:auto;
                            height:60px;
                            width:100%;
                            flex-wrap:wrap;
                            color:blacck;`

export const S_no = styled.span`
   ${tw`flex justify-start border mx-4 items-center`}
   flex-wrap:wrap;
   width: 5%;
`

export const Span = styled.span`
   ${tw`flex justify-center  mx-4 items-center `}
   flex-grow:1;
   flex-wrap: wrap;
`
