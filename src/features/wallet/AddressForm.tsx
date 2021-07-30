import passEyeIcon from 'common/assets/icons/ico-pass-eye.svg'
import Tooltip from 'common/components/Tooltip'
import { TRow } from 'features/nft/nftModals/table'
import React, { useState } from 'react'
import { clipboard } from 'electron'
import { formatAddress } from 'common/utils/format'

import {
  Clipboard,
  CheckIcon,
  Pencil,
  X,
  SaveIcon,
} from 'common/components/Icons'

type TAddressFormProps = {
  address: string
  currentRow: TRow | undefined
  saveAddressLabel: (address: string, label: string) => void
  copyable?: boolean
  hidable?: boolean
}

export const AddressForm = ({
  address = '',
  currentRow,
  saveAddressLabel,
  copyable = true,
  hidable = false,
}: TAddressFormProps): JSX.Element => {
  const [edit, setEdit] = useState<string | null>(null)
  const [editName, setEditName] = useState<string>('')
  const [copyStatus, setCopyStatus] = useState<boolean>(false)

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

  return (
    <div className='flex xl:ml-21px items-center mr-2 md:mr-0'>
      {edit === address ? (
        <>
          <input
            value={editName}
            onChange={e => {
              setEditName(e.target.value)
            }}
            className='w-220px md:w-262px h-10 border border-link text-sm font-medium rounded px-4'
          />
        </>
      ) : !!currentRow && currentRow.addressNick.toString() ? (
        <div className='w-220px md:w-262px'>
          <Tooltip
            autoWidth={true}
            type='top'
            width={211}
            padding={5}
            content={formatAddress(currentRow.address.toString())}
            classnames='py-2 text-gray-a0'
          >
            <span className='text-blue-3f cursor-pointer'>
              {currentRow.addressNick.toString()}
            </span>
          </Tooltip>
        </div>
      ) : (
        <span className='w-220px md:w-262px text-blue-3f cursor-pointer overflow-ellipsis overflow-hidden'>
          {address}
        </span>
      )}
      {edit === address ? (
        <>
          <div className='w-5 h-5 flex items-center ml-3 xl:ml-7'>
            <button
              type='button'
              onClick={() => {
                setEdit(null)
              }}
            >
              <X className='cursor-pointer' size={20} />
            </button>
          </div>
          <div className='w-5 h-5 flex items-center ml-3 xl:ml-26px'>
            <button
              type='button'
              onClick={() => {
                saveAddressLabel(edit, editName)
                setEdit(null)
              }}
            >
              <SaveIcon className='text-blue-3f' size={20} />
            </button>
          </div>
        </>
      ) : (
        <>
          {copyable && (
            <div className='w-5 h-5 flex items-center ml-3 xl:ml-7'>
              {copyStatus ? (
                <span onClick={() => copyAddress(address)}>
                  <CheckIcon className='text-green-45' size={20} />
                </span>
              ) : (
                <span onClick={() => copyAddress(address)}>
                  <Clipboard className='cursor-pointer' size={20} />
                </span>
              )}
            </div>
          )}
          <div className='w-5 h-5 flex items-center ml-3 xl:ml-26px'>
            <span
              onClick={() => {
                if (currentRow) {
                  setEditName(currentRow.addressNick.toString())
                  setEdit(currentRow.address.toString())
                }
              }}
            >
              <Pencil strokeWidth={0.2} className='cursor-pointer' size={20} />
            </span>
          </div>
          {hidable && (
            <div className='w-5 h-5 flex items-center ml-3 xl:ml-26px'>
              <img className='cursor-pointer' src={passEyeIcon} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
