import React, { useState, useCallback } from 'react'

import { TitleModal } from 'common/components/Modal'
import Checkbox from 'common/components/Checkbox'
import { formatAddress, formatPrice } from 'common/utils/format'
import { Button } from 'common/components/Buttons'
import { useWalletScreenContext } from './walletScreen.context'
import { useSetPaymentSourceModal } from './walletScreen.hooks'
import { useCurrencyName } from 'common/hooks/appInfo'
import Scrollbar from 'common/components/Scrollbar'
import { translate } from 'features/app/translations'

type TAddPaymentSourceModal = {
  isOpen: boolean
  onClose: () => void
}

function PaymentSourceAddress({
  address,
  handleSelected,
  addressBookMap,
}: {
  address: string
  handleSelected: (val: string) => void
  addressBookMap: Record<string, string>
}) {
  const handleChange = useCallback(() => {
    handleSelected(address)
  }, [])

  return (
    <div className='flex items-center'>
      <Checkbox isChecked={false} clickHandler={handleChange} />
      <span className='text-blue-3f ml-5 truncate max-w-[240px]'>
        {addressBookMap[address] || formatAddress(address)}
      </span>
    </div>
  )
}

export default function AddPaymentSourceModal({
  isOpen,
  onClose,
}: TAddPaymentSourceModal): JSX.Element {
  const currencyName = useCurrencyName()
  const [selected, setSelected] = useState<string[]>([])
  const {
    allAddressAmounts,
    addressBook: { addressBookMap },
    pastelPromoCode,
    setSelectedAddressesModal,
    selectedAddressesModal,
  } = useWalletScreenContext()
  const setPaymentSourcesModal = useSetPaymentSourceModal()

  const handleSelected = useCallback((address: string) => {
    let tmp = selected
    if (!selected.includes(address)) {
      tmp.push(address)
    } else {
      tmp = selected.filter(item => item !== address)
    }

    setSelected(tmp)
  }, [])

  const handleAddPaymentSource = useCallback(() => {
    if (selected.length > 0) {
      const selectedAddresses: string[] = []
      selected.forEach(address => {
        if (allAddressAmounts?.data?.[address]) {
          setPaymentSourcesModal(address, allAddressAmounts?.data?.[address])
          selectedAddresses.push(address)
        }
        setSelectedAddressesModal(addresses => {
          if (addresses.includes(address)) {
            return addresses.filter(item => item !== address)
          } else {
            return [...addresses, address]
          }
        })
      })
    }

    onClose()
  }, [])

  const renderPaymentSourceHeaderModal = () => (
    <thead>
      <tr className='text-gray-71 text-sm h-10 bg-white border-b border-line'>
        <th className='text-left sticky bg-white z-30 text-h6 leading-5 font-normal top-0'>
          {translate('addressName')}
        </th>
        <th className='text-left w-[20%] sticky bg-white z-30 text-h6 leading-5 font-normal top-0'>
          {translate('balance')}
        </th>
      </tr>
    </thead>
  )

  const renderCloseButton = () => (
    <Button variant='secondary' onClick={onClose} className='w-[146px]'>
      <div className='flex items-center px-5 text-blue-3f text-h5-medium'>
        <span className='text-sm'>{translate('close')}</span>
      </div>
    </Button>
  )

  const renderAddPaymentSourceButton = () => (
    <Button
      className='ml-[30px] px-0'
      childrenClassName='w-full'
      onClick={handleAddPaymentSource}
    >
      <div className='flex items-center px-5 text-white text-h5-heavy'>
        {translate('addPaymentSource')}
      </div>
    </Button>
  )

  const renderPaymentSourceBody = () => (
    <tbody>
      {allAddressAmounts?.data &&
        Object.keys(allAddressAmounts.data).map((address: string) => {
          const promoCode = pastelPromoCode.data?.find(
            code => code.address === address,
          )
          if (!selectedAddressesModal.includes(address) && !promoCode) {
            return (
              <tr
                className='text-gray-71 text-sm h-10 bg-white border-b border-line'
                key={address}
              >
                <td>
                  <PaymentSourceAddress
                    address={address}
                    addressBookMap={addressBookMap}
                    handleSelected={handleSelected}
                  />
                </td>
                <td>
                  {formatPrice(
                    allAddressAmounts.data?.[address],
                    currencyName,
                    4,
                  )}
                </td>
              </tr>
            )
          }
          return null
        })}
    </tbody>
  )

  const renderModalContent = () => (
    <div className='min-h-[250px]'>
      <table className='w-full text-gray-71 relative table-auto'>
        {renderPaymentSourceHeaderModal()}
        {renderPaymentSourceBody()}
      </table>
    </div>
  )

  return (
    <TitleModal
      isOpen={isOpen}
      handleClose={onClose}
      title={translate('addPaymentSource')}
      classNames='max-w-[650px]'
    >
      <Scrollbar maxHeight='425'>{renderModalContent()}</Scrollbar>
      <div className='flex justify-end mt-[21px]'>
        {renderCloseButton()}
        {renderAddPaymentSourceButton()}
      </div>
    </TitleModal>
  )
}
