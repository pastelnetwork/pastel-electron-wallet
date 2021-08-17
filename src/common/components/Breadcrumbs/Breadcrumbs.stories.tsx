import React from 'react'
import { Story, Meta } from '@storybook/react'

import BreadcrumbsComponent, { TBreadcrumb, TBreadcrumbs } from './'

export default {
  title: 'Breadcrumbs',
  component: BreadcrumbsComponent,
} as Meta

const breadcrumbs: TBreadcrumb[] = [
  {
    label: 'Portfolio',
    route: '#',
  },
  {
    label: 'My portfolio',
    route: '#',
  },
  {
    label: 'Creator',
    className: 'text-blue-600',
  },
]

const Template: Story<TBreadcrumbs> = ({ ...args }) => {
  return <BreadcrumbsComponent {...args} />
}

export const Breadcrumbs = Template.bind({})
Breadcrumbs.args = {
  breadcrumbs,
}
