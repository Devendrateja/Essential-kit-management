import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const Container = styled.div`
   ${tw`flex justify-between items-center mx-10 border border-black`}
   overflow:auto;
`

export const Span = styled.span`
   ${tw`flex justify-center items-center border p-1 mx-2 whitespace-normal`}
   width:10%;
   items-centerflex-wrap: wrap;
`

// export const Span = styled.span`${tw`bg-gray-600 text-6xl`}
//                     color:orange;

// `

// // export const Span = styled.span`${tw``}
// //                     height:300px;
// //                     width:300px;
// //                     background-color:green;
// //                     border:solid 1px red;

// // `
