import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const Container = styled.div`
   ${tw`flex justify-center items-center`}
   margin-top:40px;
   margin-bottom: 40px;
`

export const Span = styled.span`
   ${tw`border px-1 m-1  bg-white`}
`

export const Button = styled.button`
   ${tw`border px-1 m-1  bg-white`}
`
