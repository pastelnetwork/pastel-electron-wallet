import React, { useState } from 'react'
import cn from 'classnames'
import Modal from './modal'
import DatePicker from 'common/components/DatePicker'
import LineChart, { TLineChartRow } from 'common/components/LineChart'

export type TViewsStatsModal = {
  isOpen: boolean
  handleClose: () => void
  data1: Array<TLineChartRow>
  data2: Array<TLineChartRow>
  title: string
}

enum Tab {
  WEEK,
  MONTH,
  YEAR,
}

const ViewsStatsModal: React.FC<TViewsStatsModal> = ({
  isOpen,
  handleClose,
  data1,
  data2,
  title,
}) => {
  const [active, setActive] = useState<number>(Tab.WEEK)
  const [date, setDate] = useState<Date | null>(null)

  const margin = {
    top: 44,
    left: 30,
    bottom: 50,
    right: 0,
  }
  const viewData = data1
  const likesData = data2

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='874px'
      title={title}
      infoIcon={false}
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
            data1={viewData}
            data2={likesData}
            margin={margin}
            height={200}
            width={580}
          />
        </div>
      </div>
    </Modal>
  )
}
export default ViewsStatsModal
