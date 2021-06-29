import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ViewsStatsModal, { TViewsStatsModal } from './ViewsStatsModal'

const Template: Story<TViewsStatsModal> = ({ isOpen, ...args }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <ViewsStatsModal
        isOpen={showModal}
        {...args}
        handleClose={() => {
          setShowModal(false)
        }}
      ></ViewsStatsModal>
    </>
  )
}

export const ViewsStatsModalDefault = Template.bind({})
ViewsStatsModalDefault.args = {
  data1: [
    {
      value: 10,
      date: new Date('2020-07-01'),
    },
    {
      value: 210,
      date: new Date('2020-08-01'),
    },
    {
      value: 580,
      date: new Date('2020-09-01'),
    },
    {
      value: 800,
      date: new Date('2020-10-01'),
    },
    {
      value: 350,
      date: new Date('2020-11-01'),
    },
    {
      value: 600,
      date: new Date('2020-12-01'),
    },
    {
      value: 600,
      date: new Date('2021-01-01'),
    },
    {
      value: 500,
      date: new Date('2021-02-01'),
    },
  ],
  data2: [
    {
      value: 8,
      date: new Date('2020-07-01'),
    },
    {
      value: 180,
      date: new Date('2020-08-01'),
    },
    {
      value: 500,
      date: new Date('2020-09-01'),
    },
    {
      value: 780,
      date: new Date('2020-10-01'),
    },
    {
      value: 300,
      date: new Date('2020-11-01'),
    },
    {
      value: 560,
      date: new Date('2020-12-01'),
    },
    {
      value: 560,
      date: new Date('2021-01-01'),
    },
    {
      value: 460,
      date: new Date('2021-02-01'),
    },
  ],
  title: '“Diamonds in the sky” View Stats',
}

export const ViewStatsArtistModal = Template.bind({})
ViewStatsArtistModal.args = {
  data1: [
    {
      value: 180,
      date: new Date('2020-07-01'),
    },
    {
      value: 220,
      date: new Date('2020-07-10'),
    },
    {
      value: 410,
      date: new Date('2020-07-20'),
    },
    {
      value: 400,
      date: new Date('2020-08-01'),
    },
    {
      value: 380,
      date: new Date('2020-08-10'),
    },
    {
      value: 400,
      date: new Date('2020-08-20'),
    },
    {
      value: 580,
      date: new Date('2020-09-01'),
    },
    {
      value: 560,
      date: new Date('2020-09-10'),
    },
    {
      value: 600,
      date: new Date('2020-09-20'),
    },
    {
      value: 800,
      date: new Date('2020-10-01'),
    },
    {
      value: 600,
      date: new Date('2020-10-10'),
    },
    {
      value: 400,
      date: new Date('2020-10-20'),
    },
    {
      value: 350,
      date: new Date('2020-11-01'),
    },
    {
      value: 430,
      date: new Date('2020-11-10'),
    },
    {
      value: 610,
      date: new Date('2020-11-20'),
    },
    {
      value: 590,
      date: new Date('2020-12-01'),
    },
    {
      value: 390,
      date: new Date('2020-12-10'),
    },
    {
      value: 400,
      date: new Date('2020-12-20'),
    },
    {
      value: 600,
      date: new Date('2021-01-01'),
    },
    {
      value: 500,
      date: new Date('2021-02-01'),
    },
  ],
  data2: [
    {
      value: 40,
      date: new Date('2020-07-01'),
    },
    {
      value: 80,
      date: new Date('2020-07-10'),
    },
    {
      value: 270,
      date: new Date('2020-07-20'),
    },
    {
      value: 260,
      date: new Date('2020-08-01'),
    },
    {
      value: 240,
      date: new Date('2020-08-10'),
    },
    {
      value: 260,
      date: new Date('2020-08-20'),
    },
    {
      value: 440,
      date: new Date('2020-09-01'),
    },
    {
      value: 420,
      date: new Date('2020-09-10'),
    },
    {
      value: 460,
      date: new Date('2020-09-20'),
    },
    {
      value: 660,
      date: new Date('2020-10-01'),
    },
    {
      value: 460,
      date: new Date('2020-10-10'),
    },
    {
      value: 260,
      date: new Date('2020-10-20'),
    },
    {
      value: 210,
      date: new Date('2020-11-01'),
    },
    {
      value: 290,
      date: new Date('2020-11-10'),
    },
    {
      value: 470,
      date: new Date('2020-11-20'),
    },
    {
      value: 450,
      date: new Date('2020-12-01'),
    },
    {
      value: 250,
      date: new Date('2020-12-10'),
    },
    {
      value: 260,
      date: new Date('2020-12-20'),
    },
    {
      value: 480,
      date: new Date('2021-01-01'),
    },
    {
      value: 380,
      date: new Date('2021-02-01'),
    },
  ],
  title: 'User Banksy82 Stats',
}

export default {
  component: ViewsStatsModal,
  title: 'BidModals/ViewsStatsModal',
} as Meta
