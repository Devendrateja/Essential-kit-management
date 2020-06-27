import React from 'react'

import { action } from '@storybook/addon-actions'
import { withKnobs, text, object } from '@storybook/addon-knobs'
import { RiLoader4Line } from 'react-icons/ri'

import Button from '.'

import { Colors } from '../../../themes/Colors'

export default {
   component: Button,
   title: 'common/components/Button'
}

export const defaultView = () => {
   const styles = {
      background: Colors.brightBlue,
      width: '320px',
      height: '40px',
      borderRadius: '4px'
   }

   return (
      <Button
         buttonCSS={object('styles', styles)}
         onClickButton={action('button-clicked')}
         buttonValue={'Login'}
         apiStatus={0}
      />
   )
}

export const buttonWhileLoading = () => {
   const styles = {
      background: Colors.brightBlue,
      width: '320px',
      height: '40px',
      borderRadius: '4px'
   }
   const buttonCSS = text('styles', ...styles)

   return (
      <Button
         buttonCSS={object('styles', styles)}
         onClickButton={action('button-clicked')}
         buttonValue={<RiLoader4Line />}
         apiStatus={100}
      />
   )
}

defaultView.story = {
   decorators: [withKnobs]
}

buttonWhileLoading.story = {
   decorators: [withKnobs]
}
