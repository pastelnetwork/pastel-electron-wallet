import React, { useCallback, useState } from 'react'
import Modal from './modal'
import LineChart, { TLineChartRow } from 'common/components/LineChart'
import Select, { TOption } from 'common/components/Select/Select'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import { translate } from 'features/app/translations'

export type TViewsStatsModal = {
  isOpen: boolean
  handleClose: () => void
  data1: Array<TLineChartRow>
  data2: Array<TLineChartRow>
  data2Label?: string
  title: string
  data1Label?: string
  type?: 'year' | 'month' | 'week'
  label1className?: string
  label2className?: string
}

enum Tab {
  WEEK,
  MONTH,
  YEAR,
}

function ViewsStatsModal({
  isOpen,
  handleClose,
  data1,
  data2,
  title,
  data2Label = translate('totalViews'),
  data1Label = translate('likes'),
  type = 'week',
  label1className = 'bg-blue-37',
  label2className = 'bg-red-ff',
}: TViewsStatsModal): JSX.Element {
  const options = [
    { value: '2021-06', label: 'Jun 2021' },
    { value: '2021-07', label: 'Jul 2021' },
    { value: '2021-08', label: 'Aug 2021' },
  ]
  const [active, setActive] = useState<number>(Tab.WEEK)
  const [date, setDate] = useState<TOption | null>(options[0])
  const margin = {
    left: 80,
    top: 40,
    bottom: 30,
    right: 60,
  }
  const viewData = data1
  const likesData = data2

  const onTabToggle = useCallback(
    (index: number) => {
      setActive(index)
    },
    [active],
  )

  const onCloseModal = useCallback(() => {
    handleClose()
  }, [])

  const renderHeader = () => (
    <div className='mt-[20px] flex justify-between items-center'>
      <div>
        <Select
          options={options}
          selected={date}
          onChange={setDate}
          className='border-0 w-[120px]'
        />
      </div>
      <div className='mr-[23px]'>
        <MultiToggleSwitch
          data={[
            { label: translate('week') },
            { label: translate('month') },
            { label: translate('year') },
          ]}
          activeIndex={active}
          onToggle={onTabToggle}
          itemActiveClassName='bg-gray-4a rounded-full text-white'
          countInactiveClassName='bg-warning-hover font-extrabold'
        />
      </div>
    </div>
  )

  const renderTitle = () => (
    <div className='flex font-medium text-base ml-[15px]'>
      <p className='text-gray-33 mr-8'>{translate('socialSecurity')}</p>
      <p className='text-gray-a6'>{translate('salesData')}</p>
    </div>
  )

  const renderLineChart = () => (
    <div className='mb-6'>
      <LineChart
        data1={viewData}
        data2={likesData}
        margin={margin}
        height={200}
        width={500}
        type={type}
        data1Label={data1Label}
        data2Label={data2Label}
        label1className={label1className}
        label2className={label2className}
      />
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onCloseModal}
      size='738px'
      title={title}
      infoIcon={false}
      bodyClassName='pr-9 pl-10'
      headerClassName='px-10 pb-14px'
      titleClassName='font-black text-2xl text-gray-2d'
    >
      <div className='overflow-auto'>
        <div>
          {renderTitle()}
          {renderHeader()}
        </div>
        {renderLineChart()}
      </div>
    </Modal>
  )
}
export default ViewsStatsModal
