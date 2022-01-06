import React, { useCallback, useState } from 'react'
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

  const onClickHandler = useCallback((param: boolean) => {
    setChecked(param)
  }, [])

  return (
    <div>
      <Checkbox {...args} isChecked={checked} clickHandler={onClickHandler} />
      <br />
      <Checkbox {...args} isChecked={checked} clickHandler={onClickHandler} />
    </div>
  )
}

export const SimpleCheckbox = Template.bind({})
SimpleCheckbox.args = {
  isChecked: false,
}
