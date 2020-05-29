import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Colors } from '../../../themes/Colors'

export const SearchBarEl = styled.input`
   ${tw`border`}
   width: 367px;
   height: 40px;
   border-radius: 3px;
   border: solid 1px ${Colors.lightBlueGrey};
   background-color: white;
`
