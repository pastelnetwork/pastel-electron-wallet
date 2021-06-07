import React from 'react'
import { Story, Meta } from '@storybook/react'

import Table, { TTableProps } from './index'

export default {
  title: 'Table',
  component: Table,
} as Meta

const Template: Story<TTableProps> = ({ ...args }: TTableProps) => {
  //   const [checked, setChecked] = useState(isChecked)

  return <Table {...args} />
}

export const SimpleTable = Template.bind({})
const columns = [
  {
    key: 'data1',
    name: 'Data1',
  },
  {
    key: 'data2',
    name: 'Data2',
  },
]

const data = [
  {
    data1: 100,
    data2: 101,
  },
  {
    data1: 102,
    data2: 103,
  },
]
SimpleTable.args = {
  columns: columns,
  data: data,
  headerTrClasses: 'text-gray-a0 font-normal',
  bodyTrClasses: 'h-4',
  bodyClasses: 'h-10 overflow-y-scroll',
}
