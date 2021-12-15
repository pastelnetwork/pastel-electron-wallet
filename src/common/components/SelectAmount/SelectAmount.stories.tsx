import React, { useCallback } from 'react'
import { Story, Meta } from '@storybook/react'
import log from 'electron-log'

import SelectAmount, { TSelectAmountProps, TOption } from './SelectAmount'

export default {
  title: 'SelectAmount',
  component: SelectAmount,
} as Meta

const Template: Story<TSelectAmountProps> = ({ ...args }) => {
  const onChange = useCallback((selection: TOption) => {
    log.log(selection)
  }, [])

  return (
    <div>
      <SelectAmount {...args} onChange={onChange} />
    </div>
  )
}

export const SimpleSelectAmount = Template.bind({})
SimpleSelectAmount.args = {
  min: 10000,
  max: 90000,
  step: 100,
}
