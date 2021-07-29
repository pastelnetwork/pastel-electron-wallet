import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Radio, { TRadioProps } from './index'

export default {
  title: 'Radio',
  component: Radio,
} as Meta

const Template: Story<TRadioProps> = ({ ...args }: TRadioProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  return (
    <div>
      <Radio
        {...args}
        checked={isChecked}
        onChange={param => setIsChecked(param)}
      >
        All
      </Radio>
      <br />
      <br />
      <Radio
        {...args}
        checked={isChecked}
        onChange={param => setIsChecked(param)}
      >
        All
      </Radio>
    </div>
  )
}

export const SimpleRadio = Template.bind({})
SimpleRadio.args = {
  checked: true,
}
