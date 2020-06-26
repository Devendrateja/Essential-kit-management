import tw from 'tailwind.macro'
import styled from '@emotion/styled'

type StyleProps = {
   styles: {
      background: string
      width: string
      height: string
      borderRadius: string
      border: string
   }
}

export const InputEl = styled.input`${tw`my-1 px-2 p-1`}
                        width:${(props: StyleProps) => props.styles.width};
                        height:${(props: StyleProps) => props.styles.height}
                        background-color:${(props: StyleProps) =>
                           props.styles.background};
                        border:${(props: StyleProps) => props.styles.border};
                        border-radius:${(props: StyleProps) =>
                           props.styles.borderRadius}`
