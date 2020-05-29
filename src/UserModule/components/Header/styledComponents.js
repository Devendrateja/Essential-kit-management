import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const HeaderContainer = styled.div`
   ${tw`flex justify-between items-center p-2  bg-white `}
   box-shadow:0px 0px 1px 1px lightgrey
`

export const SideBlocks = styled.div`
   ${tw`flex justify-around items-center  mx-12`}
`

export const Text = styled.div`
   ${tw`mx-4`}
`

export const Span = styled.span`${tw``}
                    color:${props => (props.customize ? 'gray' : 'black')}`
