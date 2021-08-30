import React from 'react'
import { Story, Meta } from '@storybook/react'
import Component, { TProps } from './RectangleLoader'

export default {
  component: Component,
  title: 'Loader/Rectangle',
} as Meta

export const RectangleLoader: Story<TProps> = args => {
  return (
    <>
      <Component {...args} />
      <Component {...args} />
      <Component {...args} />
    </>
  )
}

RectangleLoader.args = {
  className: 'h-3 mb-3',
  colorClass: 'text-gray-dd',
  width: 150,
  height: 12,
  radius: 5,
}
