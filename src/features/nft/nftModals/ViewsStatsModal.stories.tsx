import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ViewsStatsModal, { TViewsStatsModal } from './ViewsStatsModal'

import dayjs from 'dayjs'

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

const data1 = Array.from({ length: 100 }).map((_, index) => {
  return {
    value: Math.floor(Math.random() * (800 - 100) + 100),
    date: dayjs()
      .subtract(50 - index, 'day')
      .startOf('day')
      .toDate(),
  }
})

const data2 = Array.from({ length: 100 }).map((_, index) => {
  return {
    value: Math.floor(Math.random() * (800 - 100) + 100),
    date: dayjs()
      .subtract(50 - index, 'day')
      .startOf('day')
      .toDate(),
  }
})

const demoMonthlyData = Array.from({ length: 20 }).map((_, index) => {
  return {
    value: Math.floor(Math.random() * (800 - 100) + 100),
    date: dayjs().startOf('year').add(index, 'month').toDate(),
  }
})

const demoMonthlyData2 = Array.from({ length: 20 }).map((_, index) => {
  return {
    value: Math.floor(Math.random() * (800 - 100) + 100),
    date: dayjs().startOf('year').add(index, 'month').toDate(),
  }
})

export const ViewsStatsNFTSocialModalDefault = Template.bind({})
ViewsStatsNFTSocialModalDefault.args = {
  data1: data1,
  data2: data2,
  title: 'NFT Cosmic Perspective Longname... Stats',
}

export const ViewsStatsNFTSaleMonthlyModal = Template.bind({})
ViewsStatsNFTSaleMonthlyModal.args = {
  data1: demoMonthlyData,
  data2: demoMonthlyData2,
  title: 'NFT Cosmic Perspective Longname... Stats',
  type: 'month',
  data1Label: 'Average Sale Price per NFT Copy (PSL)',
  data2Label: 'Total Copies Sold',
  label1className: 'bg-blue-ac',
  label2className: 'bg-gradient-to-t from-blue-9b to-red-f8',
}

export const ViewStatsArtistModal = Template.bind({})
ViewStatsArtistModal.args = {
  data1: data1,
  data2: data2,
  title: 'User Banksy82 Stats',
  data1Label: 'Total Views',
  data2Label: 'Followers',
}

export const ViewStatsArtistMonthlyModal = Template.bind({})
ViewStatsArtistMonthlyModal.args = {
  data1: demoMonthlyData,
  data2: demoMonthlyData2,
  title: 'NFT Cosmic Perspective Longname... Stats',
  type: 'month',
  data1Label: 'Average Sale Price per NFT Copy (PSL)',
  data2Label: 'Total Copies Sold',
  label1className: 'bg-blue-ac',
  label2className: 'bg-gradient-to-t from-blue-9b to-red-f8',
}

export default {
  component: ViewsStatsModal,
  title: 'BidModals/ViewsStatsModal',
} as Meta
