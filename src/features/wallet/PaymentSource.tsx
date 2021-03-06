import React, { useState, useCallback } from 'react'
import CommentModal, { TNote } from './CommentModal'

import Checkbox from '../../common/components/Checkbox/Checkbox'
import add2Icon from '../../common/assets/icons/ico-add-2.svg'

import { Trash, Eye } from 'common/components/Icons'
import { useWalletScreenContext } from './walletScreen.context'
import SelectPaymentSourceAmount from './SelectPaymentSourceAmount'
import { AddressForm } from './AddressForm'

export type TDataType = {
  address: string
  onSavePaymentNote: (note: TNote) => void
  defaultsNote: string
  isMemoDisabled?: boolean
}

function AddCommentIcon({
  onSetCommentOpen,
  isCommentOpen,
}: {
  onSetCommentOpen: (val: boolean) => void
  isCommentOpen: boolean
}): JSX.Element {
  const handleClick = useCallback(() => {
    onSetCommentOpen(!isCommentOpen)
  }, [])

  return (
    <span
      className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec py-2 px-7px transition duration-300'
      onClick={handleClick}
      role='button'
      tabIndex={0}
      aria-hidden='true'
    >
      <img className='cursor-pointer' src={add2Icon} alt='Add' />
    </span>
  )
}

function ActionIcon({
  onSelectedAddress,
  address,
}: {
  onSelectedAddress: (addr: string, isDelete?: boolean) => void
  address: string
}): JSX.Element {
  const handleSelectedAddressClick = useCallback(() => {
    onSelectedAddress(address)
  }, [])

  const handleDeleteAddressClick = useCallback(() => {
    onSelectedAddress(address, true)
  }, [])

  return (
    <div className='flex items-center'>
      <Checkbox isChecked clickHandler={handleSelectedAddressClick} />
      <AddressForm address={address} copyable={false} />
      <span className='ml-10px flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec py-2 px-7px transition duration-300'>
        <Eye size={19} className='text-gray-88' />
      </span>
      <span
        className='ml-4px flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
        onClick={handleDeleteAddressClick}
        role='button'
        tabIndex={0}
        aria-hidden='true'
      >
        <Trash size={14} className='text-gray-88' />
      </span>
    </div>
  )
}

export default function PaymentSource({
  address,
  onSavePaymentNote,
  defaultsNote,
  isMemoDisabled,
}: TDataType): JSX.Element {
  const [isCommentOpen, setCommentOpen] = useState(false)
  const {
    setSelectedAddressesModal,
    setPaymentSourcesModal,
  } = useWalletScreenContext()

  const handleSelectedAddress = useCallback(
    (addr: string, isDelete = false) => {
      setSelectedAddressesModal(addresses => {
        if (addresses.includes(addr)) {
          return addresses.filter(item => item !== addr)
        } else {
          return [...addresses, addr]
        }
      })

      if (isDelete) {
        setPaymentSourcesModal(sources => {
          if (sources[address]) {
            const adr = sources
            delete adr[address]
            return { ...sources }
          } else {
            return { ...sources }
          }
        })
      }
    },
    [],
  )

  const onCloseComment = useCallback(() => {
    setCommentOpen(false)
  }, [])

  const renderSelectPaymentSourceAmount = () => (
    <div className='flex justify-end pr-4'>
      <SelectPaymentSourceAmount address={address} isModal />
    </div>
  )

  return (
    <tr className='h-67px border-b border-line-DEFAULT mr-4 justify-between'>
      <td className='whitespace-nowrap'>
        <ActionIcon
          address={address}
          onSelectedAddress={handleSelectedAddress}
        />
      </td>
      <td className='w-24'>
        {!isMemoDisabled ? (
          <div className='relative'>
            <AddCommentIcon
              isCommentOpen={isCommentOpen}
              onSetCommentOpen={setCommentOpen}
            />
            <CommentModal
              isOpen={isCommentOpen}
              onClose={onCloseComment}
              address={address}
              onSavePaymentNote={onSavePaymentNote}
              defaultsNote={defaultsNote}
            />
          </div>
        ) : null}
      </td>
      <td>{renderSelectPaymentSourceAmount()}</td>
    </tr>
  )
}
