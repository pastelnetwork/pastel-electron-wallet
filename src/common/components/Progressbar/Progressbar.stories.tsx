import React from 'react'
import { Story, Meta } from '@storybook/react'

import Progressbar, { TProgressbarProps } from './Progressbar'

export default {
  title: 'ProgressBar',
  component: Progressbar,
} as Meta

const Template: Story<TProgressbarProps> = ({ ...args }: TProgressbarProps) => {
  return (
    <div className='mt-10 ml-10'>
      <Progressbar {...args}>
        <div className='font-extrabold text-gray-11 text-lg mt-1'>1/4</div>
      </Progressbar>
    </div>
  )
}

export const SimpleProgressbar = Template.bind({})
SimpleProgressbar.args = {
  percent: 70,
}
