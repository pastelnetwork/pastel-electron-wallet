import React, { useState } from 'react'
import cn from 'classnames'

import Modal from './modal'
import Table, { TRow } from './table'
import Slider from 'common/components/Slider/Slider'
import pencilIcon from 'common/assets/icons/ico-pencil.svg'
import astronautIcon from 'common/assets/icons/ico-astronaut.png'
import Button from 'common/components/Buttons/Button'
import { useCurrencyName } from 'common/hooks/appInfo'
import { translate } from 'features/app/translations'

const tableData = [
  {
    copies: [1, 5],
    autoListingPrice: 1000,
  },
  {
    copies: [2, 10],
    autoListingPrice: 1200,
  },
  {
    copies: [3, 30],
    autoListingPrice: 1000,
  },
  {
    copies: [40, 100],
    autoListingPrice: 1200,
  },
  {
    copies: [1, 1],
    autoListingPrice: 1000,
  },
  {
    copies: [1, 1],
    autoListingPrice: 1000,
  },
  {
    copies: [1, 1],
    autoListingPrice: 1000,
  },
  {
    copies: [1, 1],
    autoListingPrice: 1000,
  },
  {
    copies: [1, 1],
    autoListingPrice: 1000,
  },
  {
    copies: [1, 1],
    autoListingPrice: 1000,
  },
  {
    copies: [1, 1],
    autoListingPrice: 1000,
  },
  {
    copies: [1, 1],
    autoListingPrice: 1000,
  },
]

type TSliderComponent = {
  range: [number, number]
  disabled: boolean
}

function SliderComponent({ range, disabled }: TSliderComponent): JSX.Element {
  const [values, setValues] = useState<[number, number]>(range)
  return (
    <div className={disabled ? 'filter grayscale' : ''}>
      <Slider
        min={0}
        max={100}
        values={values}
        onChange={disabled ? () => ({}) : setValues}
        step={1}
      />
    </div>
  )
}

export type TPricePlanModal = {
  isOpen: boolean
  handleClose: () => void
}

function PricePlanModal({ isOpen, handleClose }: TPricePlanModal): JSX.Element {
  const currencyName = useCurrencyName()
  const [cellEdit, setCellEdit] = useState<{ row: number; col: number } | null>(
    null,
  )

  const onClose = () => {
    setCellEdit(null)
    handleClose()
  }
  const Columns = [
    {
      name: translate('copies'),
      key: 'copies',
      custom: (value: Array<number>, row: TRow) => (
        <div className='flex leading-tight'>
          <img src={astronautIcon} alt='Pastel Network' />
          <div className='my-auto ml-30px mr-5'>{`${value[0]} to ${value[1]}`}</div>
          <span
            className='cursor-pointer'
            onClick={() => setCellEdit({ row: row.id as number, col: 0 })}
            role='button'
            tabIndex={0}
            aria-hidden='true'
          >
            <img
              src={pencilIcon}
              className='cursor-pointer'
              alt='Pastel Network'
            />
          </span>
        </div>
      ),
      className: 'pl-30px',
    },
    {
      name: translate('autoListingPrice'),
      key: 'autoListingPrice',
      custom: (value: number, row: TRow) => (
        <div className='flex leading-tight space-x-4'>
          <div className='text-gray-71'>
            {value.toLocaleString('en')}k {currencyName}
          </div>
          <button
            onClick={() => setCellEdit({ row: row.id as number, col: 1 })}
            type='button'
          >
            <img src={pencilIcon} alt='Pastel Network' />
          </button>
        </div>
      ),
    },
  ]

  const Columns_edit = [
    {
      name: translate('copies'),
      key: 'copies',
      custom: (value: Array<number>, row: TRow) => (
        <SliderComponent
          range={value as [number, number]}
          disabled={cellEdit?.row != row.id || cellEdit?.col != 0}
        />
      ),
      className: 'pl-30px w-478px',
    },
    {
      name: translate('autoListingPrice'),
      key: 'autoListingPrice',
      custom: (value: number) => (
        <div className='text-gray-a0 flex justify-between rounded shadow-2px h-40px text-lg py-1 px-4 w-200px'>
          <input
            value={value?.toString() + 'k'}
            className='outline-none border-none flex-grow min-w-0 text-gray-2d'
          />
          <span>{currencyName}</span>
        </div>
      ),
    },
  ]

  const renderPricePlanTable = () => (
    <div>
      <Table
        columns={cellEdit ? Columns_edit : Columns}
        data={tableData}
        fixedHeader
        bodyClassName='h-401px'
        trClassName={cn(
          'border-b border-gray-f2',
          cellEdit ? 'h-104px' : 'h-82px',
        )}
        className='h-401px pr-[33px]'
      />
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onClose}
      size='874px'
      title={`“Diamonds in the sky”: ${translate('copiesBuyItNoPricePlan')}:`}
      infoIcon
      titleClassName='font-black text-2xl text-gray-2d'
      headerClassName='px-10'
      bodyClassName='pl-10 pr-[35px]'
    >
      <div className='sm:w-[794px] mt-3'>
        <div className='text-lg text-gray-77 pb-3'>
          {translate('pricePlanDescription')}
        </div>
        {renderPricePlanTable()}

        {cellEdit && (
          <div className='mt-8 flex justify-between'>
            <Button
              onClick={() => setCellEdit(null)}
              className='w-380px'
              variant='transparent'
            >
              {translate('decline')}
            </Button>
            <Button onClick={() => setCellEdit(null)} className='w-380px'>
              {translate('accept')}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default PricePlanModal
