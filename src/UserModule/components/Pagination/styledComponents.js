import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const Container = styled.div`
   ${tw`flex justify-center items-center`}
   margin-top:40px;
   margin-bottom: 40px;
`

export const Span = styled.span`
   ${tw` px-1 m-1  bg-white`}
   border:${props => (props.border ? 'solid 2px #4299e1 ' : 'solid 1px black')};
   border-radius:2px;`

export const Button = styled.button`
   ${tw`border px-1 m-1  bg-white`}
`

export const Input = styled.input`
   ${tw``}
   padding:5px;
   width: 25px;
   height: 25px;
   border: ${props =>
      props.border ? 'solid 2px #4299e1 ' : 'solid 1px black'};
   border-radius: 2px;
`
