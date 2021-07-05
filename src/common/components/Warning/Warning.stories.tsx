import React from 'react'
import { Story, Meta } from '@storybook/react'

import Warning, { TWarningProps } from './index'

export default {
  title: 'Warning',
  component: Warning,
} as Meta

const Template: Story<TWarningProps> = ({ ...args }: TWarningProps) => {
  return <Warning {...args} className='h-[34px] text-white pt-[5px]' />
}

export const SimpleAutocomplete = Template.bind({})
SimpleAutocomplete.args = {
  className: 'h-[34px] text-white items-center',
}
