import React from 'react'
import { Story, Meta } from '@storybook/react'

import PercentCircle, { TRarenessScoreProps } from './PercentCircle'

export default {
  title: 'PercentCircle',
  component: PercentCircle,
} as Meta

const Template: Story<TRarenessScoreProps> = ({
  ...args
}: TRarenessScoreProps) => {
  return (
    <div className='mt-10 ml-10'>
      <PercentCircle {...args}>
        <div className='font-extrabold text-gray-11 text-lg mt-1'>1/4</div>
      </PercentCircle>
    </div>
  )
}

export const SimplePercentCircle = Template.bind({})
SimplePercentCircle.args = {
  color: 'text-green-6d',
  percent: 25,
}
