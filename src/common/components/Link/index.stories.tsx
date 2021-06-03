import React from 'react'
import { Story, Meta } from '@storybook/react'
import Link, { LinkProps } from './index'

const Template: Story<LinkProps> = ({ children, ...args }) => {
  return <Link {...args}>{children}</Link>
}

export const LinkDefault = Template.bind({})
const children = 'Link'
LinkDefault.args = {
  children,
}

export default {
  component: Link,
  title: 'Link',
} as Meta
