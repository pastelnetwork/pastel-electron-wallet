import React from 'react'
import { Story, Meta } from '@storybook/react'

import Warning, { TWarningProps } from './index'

export default {
  title: 'Warning',
  component: Warning,
} as Meta

const Template: Story<TWarningProps> = ({ ...args }: TWarningProps) => {
  return (
    <Warning {...args}>
      <span>
        You are using a trial version of Pastel— to use all the functions,{' '}
      </span>{' '}
      <a className='ml-1 underline' href='/sign-up'>
        Please Register
      </a>
    </Warning>
  )
}

export const SimpleAutocomplete = Template.bind({})
SimpleAutocomplete.args = {
  className: 'h-[34px] text-white items-center',
}
