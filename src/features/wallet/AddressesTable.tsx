import React, { ReactNode } from 'react'
import Table, { TRow } from 'common/components/Table'
import Checkbox from 'common/components/Checkbox'
import { AddressForm } from './AddressForm'
import dayjs from 'dayjs'
import { FilePDFIcon, QRCode } from 'common/components/Icons'
import RectangleLoader from '../../common/components/Loader'
import { UseQueryResult } from 'react-query'
import { TAddress } from '../../types/rpc'
import { useWalletScreenContext } from './walletScreen.context'
import SelectPaymentSourceAmount from './SelectPaymentSourceAmount'
import { formatAbbreviatedNumber, timeAgo } from 'common/utils/format'

const loadingCell = <RectangleLoader className='h-2.5 mr-3' />

export default function AddressesTable({
  addresses: { data: addresses, isLoading: isLoadingAddresses },
  amounts: { data: amounts, isLoading: isLoadingAmounts },
  extendHeader,
  extendHeaderClassName,
  stickyTopClassName,
}: {
  addresses: UseQueryResult<TAddress[]>
  amounts: UseQueryResult<Record<string, number>>
  extendHeader?: ReactNode
  extendHeaderClassName?: string
  stickyTopClassName?: string
}): JSX.Element {
  const {
    selectedAddresses,
    setSelectedAddresses,
    lastActivityTimes,
    setCurrentAddress,
    setIsQRCodeModalOpen,
    setExportKeysModalOpen,
  } = useWalletScreenContext()

  const selectAddress = (address: string) =>
    setSelectedAddresses(addresses => [...addresses, address])

  const Columns = [
    {
      key: 'address',
      colClasses: 'w-[35%] text-h6 leading-5 font-normal',
      name: 'Address name',
      headerColClasses: 'mx-30px',
      custom: (address: string) => (
        <div className='flex items-center mx-30px'>
          {isLoadingAddresses ? (
            loadingCell
          ) : (
            <>
              <Checkbox
                isChecked={Boolean(selectedAddresses.includes(address))}
                clickHandler={() => selectAddress(address)}
              />
              <AddressForm address={address} />
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
        isLoadingAddresses || lastActivityTimes.isLoading ? (
          loadingCell
        ) : (
          <div className='mr-3 md:mr-0 text-gray-71 text-h5-medium'>
            {time > 0 ? timeAgo(dayjs.unix(time).valueOf()) : '--'}
          </div>
        ),
    },
    {
      key: 'address',
      name: 'Address QR',
      colClasses:
        'min-w-80px w-132px 1500px:w-244px text-h6 leading-5 font-normal text-center',
      custom: (_: void, row: TRow) =>
        isLoadingAddresses ? (
          loadingCell
        ) : (
          <div className='flex pl-6'>
            <span
              className='cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
              onClick={() => {
                setCurrentAddress(row.address)
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
      custom: (value: string) =>
        isLoadingAddresses ? (
          loadingCell
        ) : (
          <div className='flex items-center'>
            <div className='text-gray-71 text-h5-medium'>private key</div>
            <span
              onClick={() => {
                setCurrentAddress(value)
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
      custom: (amount: number) =>
        isLoadingAddresses || isLoadingAmounts ? (
          loadingCell
        ) : (
          <div className='text-gray-71 text-h5-medium'>
            {formatAbbreviatedNumber(parseFloat(amount.toString()), 2)}
          </div>
        ),
    },
    {
      key: 'address',
      name: '',
      colClasses: 'min-w-[120px] w-[150px]',
      custom: (address: string) =>
        isLoadingAddresses ? (
          loadingCell
        ) : (
          <SelectPaymentSourceAmount address={address} />
        ),
    },
  ]

  return (
    <Table
      data={
        addresses?.map(address => ({
          address,
          time: lastActivityTimes.data?.[address],
          amount: amounts?.[address],
        })) || [{}, {}]
      }
      columns={Columns}
      headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
      bodyTrClasses='h-76px border-b border-line hover:bg-blue-fa'
      bodyTdClasses='text-h5 leading-6 font-medium'
      showCheckbox={false}
      extendHeader={extendHeader}
      extendHeaderClassName={extendHeaderClassName}
      stickyTopClassName={stickyTopClassName}
    />
  )
}
