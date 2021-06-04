import React from 'react'
import { Story, Meta } from '@storybook/react'

import Checkbox, { TCheckboxProps } from './Checkbox'

export default {
  title: 'Checkbox',
  component: Checkbox,
} as Meta

const Template: Story<TCheckboxProps> = ({ ...args }: TCheckboxProps) => {
  return <Checkbox {...args} />
}

export const SimpleCheckbox = Template.bind({})
SimpleCheckbox.args = {
  isChecked: false,
  clickHandler: e => {
    console.log(e)
  },
}
