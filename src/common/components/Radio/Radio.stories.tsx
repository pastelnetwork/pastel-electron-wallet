import React, { useCallback, useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Radio, { TRadioProps } from './index'

export default {
  title: 'Radio',
  component: Radio,
} as Meta

const Template: Story<TRadioProps> = ({ ...args }: TRadioProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const onChange = useCallback((param: boolean) => {
    setIsChecked(param)
  }, [])

  return (
    <div>
      <Radio {...args} checked={isChecked} onChange={onChange}>
        All
      </Radio>
    </div>
  )
}

export const SimpleRadio = Template.bind({})
SimpleRadio.args = {
  checked: true,
}

export const SecondaryRadio = Template.bind({})
SecondaryRadio.args = {
  checked: true,
  variant: 'secondary',
}
