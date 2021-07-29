import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Checkbox, { TCheckboxProps } from './index'

export default {
  title: 'Checkbox',
  component: Checkbox,
} as Meta

const Template: Story<TCheckboxProps> = ({
  isChecked,
  ...args
}: TCheckboxProps) => {
  const [checked, setChecked] = useState(isChecked)

  return (
    <div>
      <Checkbox
        {...args}
        isChecked={checked}
        clickHandler={param => {
          setChecked(param)
        }}
      />
      <br />
      <Checkbox
        {...args}
        isChecked={checked}
        clickHandler={param => {
          setChecked(param)
        }}
      />
    </div>
  )
}

export const SimpleCheckbox = Template.bind({})
SimpleCheckbox.args = {
  isChecked: false,
}
