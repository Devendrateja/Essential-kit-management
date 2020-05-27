import tw from "tailwind.macro"
import styled from "@emotion/styled"




export const InputEl = styled.input`${tw``}
                        width:${props => props.styles.width};
                        height:${props => props.styles.height}
                        background-color:${props => props.styles.background};
                        border:${props => props.styles.border};`