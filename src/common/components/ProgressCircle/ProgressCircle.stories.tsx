import React from 'react'
import { Story, Meta } from '@storybook/react'

import ProgressCircle, { TProgressCircleProps } from './ProgressCircle'

export default {
  title: 'ProgressCircle',
  component: ProgressCircle,
} as Meta

const Template: Story<TProgressCircleProps> = ({
  ...args
}: TProgressCircleProps) => {
  return (
    <div className='mt-10 ml-10'>
      <ProgressCircle {...args} />
    </div>
  )
}

export const SimpleProgressCircle = Template.bind({})
SimpleProgressCircle.args = {
  percentage: 70,
}
