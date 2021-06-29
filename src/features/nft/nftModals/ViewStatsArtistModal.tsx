import React, { useState } from 'react'
import cn from 'classnames'
import Modal from './modal'
import DatePicker from 'common/components/DatePicker'
import LineChart from 'common/components/LineChart'

export type TViewsStatsArtistModal = {
  isOpen: boolean
  handleClose: () => void
}

enum Tab {
  WEEK,
  MONTH,
  YEAR,
}

const ViewsStatsArtistModal: React.FC<TViewsStatsArtistModal> = ({
  isOpen,
  handleClose,
}) => {
  const [active, setActive] = useState<number>(Tab.WEEK)
  const [date, setDate] = useState<Date | null>(null)

  const margin = {
    top: 44,
    left: 30,
    bottom: 50,
    right: 0,
  }
  const totalViews = [
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
  ]
  const follows = [
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
  ]

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='874px'
      title={'User Banksy82 Stats'}
      infoIcon={true}
      bodyClassName='pr-9 pl-10'
      headerClassName='px-10 pb-14px'
      titleClassName='font-black text-2xl text-gray-2d'
    >
      <div className='overflow-auto md:w-[614px]'>
        <div className='flex justify-between'>
          <div className='tab flex'>
            <div
              onClick={() => {
                setActive(Tab.WEEK)
              }}
              className={cn(
                'w-[120px] flex justify-center py-2 border-b cursor-pointer',
                active === Tab.WEEK
                  ? 'border-gray-33 font-extrabold text-gray-33'
                  : 'border-gray-f3 font-medium text-gray-71',
              )}
            >
              Week
            </div>
            <div
              onClick={() => {
                setActive(Tab.MONTH)
              }}
              className={cn(
                'w-[120px] flex justify-center py-2 border-b cursor-pointer',
                active === Tab.MONTH
                  ? 'border-gray-33 font-extrabold text-gray-33'
                  : 'border-gray-f3 font-medium text-gray-71',
              )}
            >
              Month
            </div>
            <div
              onClick={() => {
                setActive(Tab.YEAR)
              }}
              className={cn(
                'w-[120px] flex justify-center py-2 border-b cursor-pointer',
                active === Tab.YEAR
                  ? 'border-gray-33 font-extrabold text-gray-33'
                  : 'border-gray-f3 font-medium text-gray-71',
              )}
            >
              Year
            </div>
          </div>
          <div>
            <div className='w-[154px]'>
              <DatePicker
                selected={date}
                onChange={setDate}
                label='Time range'
                variant='separated'
                placeholder='       /  /  '
              />
            </div>
          </div>
        </div>
        <div>
          <LineChart
            data1={totalViews}
            data2={follows}
            margin={margin}
            height={200}
            width={580}
            data1Label='Total Views'
            data2Label='Follows'
          />
        </div>
      </div>
    </Modal>
  )
}
export default ViewsStatsArtistModal
