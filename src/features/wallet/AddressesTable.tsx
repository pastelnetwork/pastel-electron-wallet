import React, { ReactNode, useCallback } from 'react'
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
import { formatPrice, timeAgo } from 'common/utils/format'
import Tooltip from 'common/components/Tooltip'
import { translate } from 'features/app/translations'

const loadingCell = <RectangleLoader className='h-2.5 mr-3' />

function PDFIcon({
  value,
  setCurrentAddress,
  setExportKeysModalOpen,
}: {
  value: string
  setCurrentAddress: (val: string) => void
  setExportKeysModalOpen: (val: boolean) => void
}): JSX.Element {
  const handleShowExportKeyModal = useCallback(() => {
    setCurrentAddress(value)
    setExportKeysModalOpen(true)
  }, [])

  return (
    <button
      onClick={handleShowExportKeyModal}
      className='ml-9px rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
      type='button'
    >
      <Tooltip
        autoWidth
        type='top'
        width={130}
        padding={5}
        content={translate('openPrivateKey')}
        classnames='py-2 text-gray-a0'
      >
        <FilePDFIcon size={20} className='text-gray-88 cursor-pointer' />
      </Tooltip>
    </button>
  )
}

function QRCodeIcon({
  row,
  setCurrentAddress,
  setIsQRCodeModalOpen,
}: {
  row: TRow
  setCurrentAddress: (val: string) => void
  setIsQRCodeModalOpen: (val: boolean) => void
}): JSX.Element {
  const handleShowQRCodeModal = useCallback(() => {
    setCurrentAddress(row.address)
    setIsQRCodeModalOpen(true)
  }, [])

  return (
    <button
      type='button'
      className='cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
      onClick={handleShowQRCodeModal}
    >
      <Tooltip
        autoWidth
        type='top'
        width={130}
        padding={5}
        content={translate('openAddressQR')}
        classnames='py-2 text-gray-a0'
      >
        <QRCode size={20} />
      </Tooltip>
    </button>
  )
}

function SelectedAddressesCheckbox({
  selectedAddresses,
  address,
  selectAddress,
  row,
}: {
  selectedAddresses: string[]
  address: string
  selectAddress: (address: string, amount: number) => void
  row: TRow
}): JSX.Element {
  const onClick = useCallback(() => {
    selectAddress(address, row.amount)
  }, [selectedAddresses, address])

  return (
    <Checkbox
      isChecked={Boolean(selectedAddresses.includes(address))}
      clickHandler={onClick}
    />
  )
}

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
    setPaymentSources,
    pastelPromoCode,
    setPaymentSourcesModal,
    setSelectedAddressesModal,
  } = useWalletScreenContext()

  const selectAddress = useCallback((address: string, amount: number) => {
    setSelectedAddresses(addresses => {
      if (addresses.includes(address)) {
        return addresses.filter(item => item !== address)
      } else {
        return [...addresses, address]
      }
    })
    setSelectedAddressesModal(addresses => {
      if (addresses.includes(address)) {
        return addresses.filter(item => item !== address)
      } else {
        return [...addresses, address]
      }
    })
    setPaymentSources(sources => {
      if (sources[address]) {
        const adr = sources
        delete adr[address]
        return { ...sources }
      } else {
        return { ...sources, [address]: amount }
      }
    })
    setPaymentSourcesModal(sources => {
      if (sources[address]) {
        const adr = sources
        delete adr[address]
        return { ...sources }
      } else {
        return { ...sources, [address]: amount }
      }
    })
  }, [])

  const pastelPromoCodeList = pastelPromoCode.data

  const Columns = [
    {
      key: 'address',
      colClasses: 'w-[35%] text-h6 leading-5 font-normal',
      name: translate('addressName'),
      headerColClasses: 'mx-30px',
      custom: (address: string, row: TRow) => (
        <div className='flex items-center mx-30px'>
          {isLoadingAddresses ? (
            loadingCell
          ) : (
            <>
              {!pastelPromoCodeList?.find(
                promoCode => promoCode.address === address,
              ) ? (
                <SelectedAddressesCheckbox
                  selectedAddresses={selectedAddresses}
                  address={address}
                  selectAddress={selectAddress}
                  row={row}
                />
              ) : (
                <div className='w-5 h-5'></div>
              )}
              <AddressForm
                address={address}
                hidePromoCodeEmpty={
                  !!pastelPromoCodeList?.find(
                    promoCode => promoCode.address === address,
                  )
                }
              />
            </>
          )}
        </div>
      ),
    },
    {
      key: 'time',
      name: translate('lastActivity'),
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
      name: translate('addressQR'),
      colClasses:
        'min-w-80px w-132px 1500px:w-244px text-h6 leading-5 font-normal text-center',
      custom: (_: void, row: TRow) =>
        isLoadingAddresses ? (
          loadingCell
        ) : (
          <div className='flex pl-6'>
            <QRCodeIcon
              row={row}
              setCurrentAddress={setCurrentAddress}
              setIsQRCodeModalOpen={setIsQRCodeModalOpen}
            />
          </div>
        ),
    },
    {
      key: 'address',
      name: translate('keys'),
      colClasses:
        'min-w-130px w-176px 1500px:w-244px flex-grow-0 text-h6 leading-5 font-normal',
      custom: (value: string) =>
        isLoadingAddresses ? (
          loadingCell
        ) : (
          <div className='flex items-center'>
            <div className='text-gray-71 text-h5-medium'>
              {translate('privateKey').toLowerCase()}
            </div>
            <PDFIcon
              value={value}
              setCurrentAddress={setCurrentAddress}
              setExportKeysModalOpen={setExportKeysModalOpen}
            />
          </div>
        ),
    },
    {
      key: 'amount',
      name: translate('balance'),
      colClasses: 'w-131px 1500px:w-244px text-h6 leading-5 font-normal',
      custom: (amount?: number) =>
        isLoadingAddresses || isLoadingAmounts ? (
          loadingCell
        ) : (
          <div className='text-gray-71 text-h5-medium'>
            {formatPrice(amount || 0, '', 4)}
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
        ) : !pastelPromoCodeList?.find(
            promoCode => promoCode.address === address,
          ) ? (
          <SelectPaymentSourceAmount address={address} />
        ) : null,
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

AddressesTable.defaultProps = {
  extendHeader: undefined,
  extendHeaderClassName: '',
  stickyTopClassName: '',
}
