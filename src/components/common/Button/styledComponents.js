import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const ButtonEl = styled.button`${tw`flex justify-center items-center`}
                        background-color:${props => props.buttonCSS.background};
                        width:${props => props.buttonCSS.width};
                        height:${props => props.buttonCSS.height};
                        border-radius:${props => props.buttonCSS.borderRadius}`
