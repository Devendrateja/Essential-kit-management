import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Colors } from '../../../themes/Colors.js'

export const PageContainer = styled.div`${tw`flex flex-col`}
                                background-color:${Colors.whiteTwo};
                                width:100vw;
                                height:100vh;`

export const Body = styled.div`
   ${tw`flex flex-col `}
   padding-left:10%;
   padding-right: 10%;
   margin:20px;
   width:100%;
`

export const NavButton = styled.div`${tw`flex`}
                        padding-left:8%;
                        margin-top:50px;`


export const PayRequestContainer = styled.div`
   ${tw`flex`}
   margin-top:30px;
   height: 60vh;
   width:100%;
`

export const QRCodeContainer = styled.div`${tw`flex flex-col justify-around items-center`}
                                background-color:${Colors.white};
                                margin-right:10px;
                                padding:40px;
                                width:25%;
                                `

export const VerificationDetailsContainer = styled.div`${tw`flex flex-col items-center h-full`}
                                            background-color:${Colors.white};
                                            width:75%;`

export const PayThroughTitle= styled.div`${tw`py-4`}`

export const UPIId = styled.div`${tw`py-4`}`


export const VerificationText = styled.div`${tw`py-4`}`

export const Button = styled.button`${tw`px-4 p-2  bg-blue-600 text-white rounded-sm`}
                        margin-top:30px;`
                        
                        
export const InputContainer = styled.div`${tw`flex flex-col`}`


export const InputsContainer = styled.div`${tw`w-full flex justify-around flex-wrap`}` 


export const DNDContainer = styled.div`${tw`flex flex-col justify-around  w-full h-full `}
                            padding-left:8%;
                            padding-right:8%;
                            margin-top:25px;`


export const Dnd = styled.div`${tw` flex justify-center items-center border border-black border-dashed`}
                    height:90%;
                    width:100%;
                    margin-top:10px;`
                    
                    
                    
export const SendButton = styled.div`${tw` flex font-white w-full justify-end`}
                            padding-right:10%;
                            padding-bottom:20px;`