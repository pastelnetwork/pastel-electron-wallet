import React from 'react'
import { Story, Meta } from '@storybook/react'

import SelectAmount, { TSelectAmountProps } from './SelectAmount'

export default {
  title: 'SelectAmount',
  component: SelectAmount,
} as Meta

const Template: Story<TSelectAmountProps> = ({ ...args }) => {
  return (
    <div>
      <SelectAmount
        {...args}
        onChange={selection => {
          console.log(1111111, 'result', selection)
        }}
      />
    </div>
  )
}

export const SimpleSelectAmount = Template.bind({})
SimpleSelectAmount.args = {
  min: 10000,
  max: 90000,
  step: 100,
}
