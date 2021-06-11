import React from 'react'
import { Story, Meta } from '@storybook/react'

import Rarenessbar, { TRarenessProps } from './index'

export default {
  title: 'Rarenessbar',
  component: Rarenessbar,
} as Meta

const Template: Story<TRarenessProps> = ({ ...args }: TRarenessProps) => {
  return (
    <div className='mt-10 ml-10'>
      <Rarenessbar {...args} />
    </div>
  )
}

export const SimpeRarenessbar = Template.bind({})
SimpeRarenessbar.args = {
  percent: 75,
  classes: 'w-219px',
}
