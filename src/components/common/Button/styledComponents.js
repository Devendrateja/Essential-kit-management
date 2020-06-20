import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { css, cx } from 'emotion'

export const ButtonEl = styled.button`${tw`flex justify-center items-center text-white`}
                        background-color:${props => props.buttonCSS.background};
                        width:${props => props.buttonCSS.width};
                        height:${props => props.buttonCSS.height};
                        border-radius:${props => props.buttonCSS.borderRadius}`

// export const ButtonEl = css`
//                         background-color:${props => props.buttonCSS.background};
//                         width:${props => props.buttonCSS.width};
//                         height:${props => props.buttonCSS.height};
//                         border-radius:${props => props.buttonCSS.borderRadius}`