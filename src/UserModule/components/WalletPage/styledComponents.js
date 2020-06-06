import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import {Colors} from "../../../themes/Colors.js"



export const WalletPageContainer = styled.div`${tw`flex flex-col w-screen h-screen`}
                                    background-color:${Colors.whiteTwo}`
                                    

export const Body = styled.div`${tw`flex flex-col`}
                    padding-left:10%;
                    padding-right:10%;
                    margin-top:50px;`
                    
                    
export const TransactionsContainer = styled.div`${tw`flex flex-col items-center`}
                                        margin-top:40px;`


export const TitleBar = styled.div`${tw`flex justify-start p-4 items-center`}`



export const MyWalletText = styled.div`${tw``}
                                margin-left:auto;
                                margin-right:auto;`
                                
export const BalanceBar = styled.div`${tw`flex justify-between p-4` }
                            margin-top:10px;
                            padding-bottom:30px;
                            border-bottom:1px solid lightgray`
                            
                            
export const TableContent = styled.div`${tw`flex justify-center items-center border `}
                            height:40vh;
                            width:100%;
`