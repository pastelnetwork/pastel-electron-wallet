import React from 'react'
import { Story, Meta } from '@storybook/react'

import Typography, { TTypographyProps, TypographyVariant } from './index'

export default {
  title: 'Typography',
  component: Typography,
} as Meta

const Template: Story<TTypographyProps> = ({
  variant,
  uppercase,
  ...args
}: TTypographyProps) => {
  return (
    <div className='mt-10 ml-48'>
      <Typography variant={variant} uppercase={uppercase} {...args}>
        This is the tooltip component
      </Typography>
    </div>
  )
}

export const SimpleAutocomplete = Template.bind({})
SimpleAutocomplete.args = {
  variant: TypographyVariant.h1_32_40_heavy,
  uppercase: false,
}
