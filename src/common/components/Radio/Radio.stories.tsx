import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Radio, { TRadioProps } from './index'

export default {
  title: 'Radio',
  component: Radio,
} as Meta

const Template: Story<TRadioProps> = ({ ...args }: TRadioProps) => {
  const [checked, setChecked] = useState<boolean>(false)
  return (
    <div>
      <Radio
        {...args}
        isChecked={checked}
        clickHandler={param => setChecked(param)}
      >
        All
      </Radio>
    </div>
  )
}

export const SimpleRadio = Template.bind({})
SimpleRadio.args = {
  isChecked: true,
}
