import cn from 'classnames'
import passEyeIcon from 'common/assets/icons/ico-pass-eye.svg'
import eyeIcon from 'common/assets/icons/ico-eye.svg'
import Tooltip from 'common/components/Tooltip'
import React, { useState, useCallback, ChangeEvent, memo } from 'react'
import { clipboard } from 'electron'
import { formatAddress } from 'common/utils/format'

import {
  Clipboard,
  CheckIcon,
  Pencil,
  SaveIcon,
  Close,
} from 'common/components/Icons'
import { useWalletScreenContext } from './walletScreen.context'
import { translate } from 'features/app/translations'

type TAddressFormProps = {
  address: string
  copyable?: boolean
  hidable?: boolean
  className?: string
  hidePromoCodeEmpty?: boolean
  startLength?: number
  endLength?: number
}

const InputEdit = memo(function InputEdit({
  editName,
  setEditName,
}: {
  editName: string
  setEditName: (val: string) => void
}): JSX.Element {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value)
  }, [])

  return (
    <input
      value={editName}
      onChange={onChange}
      className='h-10 border border-link text-sm font-medium rounded px-4 ml-10px'
    />
  )
})

export function AddressForm({
  address,
  copyable,
  hidable,
  hidePromoCodeEmpty,
  className,
  startLength,
  endLength,
}: TAddressFormProps): JSX.Element {
  const [edit, setEdit] = useState<string | null>(null)
  const [editName, setEditName] = useState<string>('')
  const [copyStatus, setCopyStatus] = useState<boolean>(false)
  const [showFullAddress, setShowFullAddress] = useState<boolean>(false)
  const {
    addressBook: { addressBookMap, updateAddressBook },
    pastelPromoCode,
  } = useWalletScreenContext()

  const copyAddress = (address: string) => {
    if (copyStatus) {
      return
    }
    setCopyStatus(true)
    clipboard.writeText(address)
    setTimeout(() => {
      setCopyStatus(false)
    }, 2000)
  }

  const handleShowFullAddress = useCallback(() => {
    setShowFullAddress(!showFullAddress)
  }, [])

  const promoCode = pastelPromoCode.data?.find(code => code.address === address)

  const addressLabel = promoCode ? promoCode.label : addressBookMap[address]

  const handleClose = useCallback(() => {
    setEdit(null)
  }, [])

  const handleSave = useCallback(() => {
    if (edit === address) {
      updateAddressBook({
        address: edit,
        label: editName,
      })
      setEdit(null)
    }
  }, [])

  const handleEdit = useCallback(() => {
    setEditName(addressLabel || '')
    setEdit(address)
  }, [])

  const handleCopyAddress = useCallback(() => {
    copyAddress(address)
  }, [])

  const renderShowFullAddress = () => (
    <Tooltip
      classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
      content={
        !showFullAddress
          ? translate('showRecipientAddress')
          : translate('hideRecipientAddress')
      }
      width={160}
      type='top'
    >
      <button
        type='button'
        className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec py-2 px-7px transition duration-300'
        onClick={handleShowFullAddress}
      >
        <img
          alt={
            !showFullAddress
              ? translate('showRecipientAddress')
              : translate('hideRecipientAddress')
          }
          className='cursor-pointer'
          src={!showFullAddress ? eyeIcon : passEyeIcon}
        />
      </button>
    </Tooltip>
  )

  const renderSaveIcon = () => {
    if (edit !== address) {
      return null
    }

    return (
      <Tooltip
        classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
        content={translate('saveLabel')}
        width={130}
        type='top'
      >
        <button
          type='button'
          className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
          onClick={handleSave}
        >
          <SaveIcon className='text-blue-3f' size={20} />
        </button>
      </Tooltip>
    )
  }

  const renderCloseIcon = () => {
    return (
      <Tooltip
        classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
        content={translate('close')}
        width={130}
        type='top'
      >
        <button
          type='button'
          className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
          onClick={handleClose}
        >
          <Close size={16} />
        </button>
      </Tooltip>
    )
  }

  return (
    <div className={cn('flex xl:ml-21px items-center mr-2 md:mr-0', className)}>
      {edit === address ? (
        <InputEdit editName={editName} setEditName={setEditName} />
      ) : addressLabel ? (
        <div className='w-220px md:w-[270px] pl-[10px]'>
          <span
            className={cn(
              'text-blue-3f cursor-pointer inline-block',
              showFullAddress && 'break-all',
            )}
          >
            <Tooltip
              autoWidth
              type='top'
              width={211}
              padding={5}
              content={
                address ? formatAddress(address, startLength, endLength) : ''
              }
              classnames='py-2 text-gray-a0'
            >
              {!showFullAddress ? addressLabel : address}
            </Tooltip>
          </span>
        </div>
      ) : (
        <span
          className={cn(
            'w-220px md:w-[270px] text-blue-3f cursor-pointer overflow-ellipsis overflow-hidden pl-[10px]',
            showFullAddress && 'break-all',
          )}
        >
          {address
            ? !showFullAddress
              ? formatAddress(address, startLength, endLength)
              : address
            : ''}
        </span>
      )}
      {promoCode && !hidePromoCodeEmpty && (
        <div className='w-5 h5 xl:ml-21px'>&nbsp;</div>
      )}
      {edit === address ? (
        <>
          <div className='w-5 h-5 flex items-center ml-3 xl:ml-25px'>
            {renderCloseIcon()}
          </div>
          <div className='w-5 h-5 flex items-center ml-3 xl:ml-22px'>
            {renderSaveIcon()}
          </div>
        </>
      ) : (
        <>
          {copyable && (
            <div className='w-5 h-5 flex items-center ml-3 xl:ml-7'>
              {copyStatus ? (
                <Tooltip
                  classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                  content={translate('copied')}
                  width={70}
                  type='top'
                >
                  <button
                    onClick={handleCopyAddress}
                    className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec py-2 px-7px transition duration-300'
                    type='button'
                  >
                    <CheckIcon className='text-green-45' size={14} />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip
                  classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                  content={translate('copyAddressToClipboard')}
                  width={130}
                  type='top'
                >
                  <button
                    onClick={handleCopyAddress}
                    className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec py-2 px-7px transition duration-300'
                    type='button'
                  >
                    <Clipboard className='cursor-pointer' size={14} />
                  </button>
                </Tooltip>
              )}
            </div>
          )}
          <div className='w-5 h-5 flex items-center ml-3 xl:ml-26px'>
            {!promoCode && (
              <Tooltip
                classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                content={translate('editLabel')}
                width={100}
                type='top'
              >
                <span
                  onClick={handleEdit}
                  className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec py-2 px-7px transition duration-300'
                  role='button'
                  aria-hidden
                  tabIndex={0}
                >
                  <Pencil
                    strokeWidth={0.2}
                    className='cursor-pointer text-gray-88'
                    size={16}
                  />
                </span>
              </Tooltip>
            )}
          </div>
          {hidable ? (
            <div className='flex items-center ml-13px'>
              {renderShowFullAddress()}
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

AddressForm.defaultProps = {
  copyable: true,
  hidable: false,
  hidePromoCodeEmpty: false,
  startLength: 24,
  endLength: -6,
  className: '',
}
