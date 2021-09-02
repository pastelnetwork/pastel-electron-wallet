import React, { ReactNode } from 'react'
import Table, { TRow } from 'common/components/Table'
import Checkbox from 'common/components/Checkbox'
import { AddressForm } from './AddressForm'
import {
  formatAbbreviatedNumber,
  parseFormattedNumber,
  timeAgo,
} from 'common/utils/format'
import dayjs from 'dayjs'
import { FilePDFIcon, QRCode } from 'common/components/Icons'
import SelectAmount, {
  TOption,
  generateStep,
} from 'common/components/SelectAmount'
import { TSelectionPslProps } from './WalletScreen'

export default function AddressesTable({
  isLoading,
  selectedRows,
  setSelectedRowsFunction,
  saveAddressLabel,
  setCurrentAddress,
  setIsQRCodeModalOpen,
  setExportKeysModalOpen,
  selectionPsl,
  forceUpdateSelect,
  handleAmountChange,
  data,
  extendHeader,
  extendHeaderClassName,
  stickyTopClassName,
}: {
  isLoading: boolean
  selectedRows: string[]
  setSelectedRowsFunction(row: TRow): void
  saveAddressLabel(address: string, label: string): void
  setCurrentAddress(address: string): void
  setIsQRCodeModalOpen(open: boolean): void
  setExportKeysModalOpen(open: boolean): void
  selectionPsl: TSelectionPslProps[]
  forceUpdateSelect: boolean
  handleAmountChange(selection: number | null, row?: TRow): void
  data: TRow[]
  extendHeader?: ReactNode
  extendHeaderClassName?: string
  stickyTopClassName?: string
}): JSX.Element {
  const Columns = [
    {
      key: 'address',
      colClasses: 'w-[35%] text-h6 leading-5 font-normal',
      name: 'Address name',
      headerColClasses: 'mx-30px',
      custom: (value: string | number, row: TRow | undefined) => (
        <div className='flex items-center mx-30px'>
          {isLoading ? (
            value
          ) : (
            <>
              <Checkbox
                isChecked={selectedRows.indexOf(row?.address) !== -1}
                clickHandler={() => row && setSelectedRowsFunction(row)}
              />
              <AddressForm
                address={value.toString()}
                currentRow={row}
                saveAddressLabel={saveAddressLabel}
              />
            </>
          )}
        </div>
      ),
    },
    {
      key: 'time',
      name: 'Last Activity',
      colClasses: 'w-190px 1500px:w-244px text-h6 leading-5 font-normal',
      custom: (time: number) =>
        isLoading ? (
          time
        ) : (
          <div className='mr-3 md:mr-0 text-gray-71 text-h5-medium'>
            {time > 0 ? timeAgo(dayjs.unix(time).valueOf()) : '--'}
          </div>
        ),
    },
    {
      key: 'qrCode',
      name: 'Address QR',
      colClasses:
        'min-w-80px w-132px 1500px:w-244px text-h6 leading-5 font-normal text-center',
      custom: (value: string | number, row: TRow | undefined) =>
        isLoading ? (
          value
        ) : (
          <div className='flex pl-6'>
            <span
              className='cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
              onClick={() => {
                setCurrentAddress(row?.address)
                setIsQRCodeModalOpen(true)
              }}
            >
              <QRCode size={20} />
            </span>
          </div>
        ),
    },
    {
      key: 'address',
      name: 'Keys',
      colClasses:
        'min-w-130px w-176px 1500px:w-244px flex-grow-0 text-h6 leading-5 font-normal',
      custom: (value: string | number) =>
        isLoading ? (
          value
        ) : (
          <div className='flex items-center'>
            <div className='text-gray-71 text-h5-medium'>private key</div>
            <span
              onClick={() => {
                setCurrentAddress(value.toString())
                setExportKeysModalOpen(true)
              }}
              className='ml-9px rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
            >
              <FilePDFIcon size={20} className='text-gray-88 cursor-pointer' />
            </span>
          </div>
        ),
    },
    {
      key: 'amount',
      name: 'Balance',
      colClasses: 'w-131px 1500px:w-244px text-h6 leading-5 font-normal',
      custom: (value: number) =>
        isLoading ? (
          value
        ) : (
          <div className='text-gray-71 text-h5-medium'>
            {formatAbbreviatedNumber(parseFloat(value.toString()), 2)}
          </div>
        ),
    },
    {
      key: 'psl',
      name: '',
      colClasses: 'min-w-[120px] w-[150px]',
      custom: (value: number | string, row?: TRow) => {
        if (isLoading) {
          return value
        }

        const psl = selectionPsl.filter(psl => psl?.address === row?.address)[0]
        return (
          <div className='z-0'>
            <SelectAmount
              className='text-gray-2d w-full bg-white'
              min={0}
              max={parseFloat(value.toString())}
              step={generateStep(parseInt(value.toString()))}
              defaultValue={{
                label: psl?.amount || row?.amount,
                value: psl?.amount || row?.amount,
              }}
              forceUpdate={forceUpdateSelect}
              onChange={(selection: TOption) => {
                const selectedValue = parseFormattedNumber(selection.value)
                handleAmountChange(selectedValue, row)
              }}
            />
          </div>
        )
      },
    },
  ]

  return (
    <Table
      data={data}
      columns={Columns}
      headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
      bodyTrClasses='h-76px border-b border-line hover:bg-blue-fa'
      bodyTdClasses='text-h5 leading-6 font-medium'
      showCheckbox={false}
      selectedRow={isLoading ? undefined : setSelectedRowsFunction}
      extendHeader={extendHeader}
      extendHeaderClassName={extendHeaderClassName}
      stickyTopClassName={stickyTopClassName}
    />
  )
}
