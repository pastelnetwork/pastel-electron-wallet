import React from 'react'
import { Story, Meta } from '@storybook/react'
import Link, { TLink } from './Link'

const Template: Story<TLink> = ({ children, className, ...args }) => {
  return (
    <Link className={className} {...args}>
      {children}
    </Link>
  )
}

export const LinkDefault = Template.bind({})
const children = 'Link'
const className = ''
LinkDefault.args = {
  children,
  className,
}

export default {
  component: Link,
  title: 'Link',
} as Meta
