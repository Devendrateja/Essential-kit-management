import tw from 'tailwind.macro'
import styled from '@emotion/styled'

type ButtonProps = {
   buttonCSS: {
      background: string
      width: string
      height: string
      borderRadius: string
   }
}

export const ButtonEl = styled.button`${tw`flex justify-center items-center text-white`}
                        background-color:${(props: ButtonProps) =>
                           props.buttonCSS.background};
                        width:${(props: ButtonProps) => props.buttonCSS.width};
                        height:${(props: ButtonProps) =>
                           props.buttonCSS.height};
                        border-radius:${(props: ButtonProps) =>
                           props.buttonCSS.borderRadius}`
