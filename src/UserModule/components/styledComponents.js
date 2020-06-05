import tw from 'tailwind.macro'
import styled from '@emotion/styled'

import { Colors } from '../../themes/Colors'

export const Container = styled.div`${tw`flex flex-col h-screen`}
                            background-color:${Colors.whiteTwo}`

export const MiniContainer = styled.div`${tw`flex flex-col`}
                                background-color:${Colors.whiteTwo}`

export const LoadingWrapperContainer = styled.div`${tw`mx-16`}`