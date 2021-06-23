import pasteIcon from '../../common/assets/icons/ico-paste.svg'
import checkIcon from '../../common/assets/icons/ico-check-green.svg'
import pencilIcon from '../../common/assets/icons/ico-pencil.svg'
import CrossIcon from '../../common/assets/icons/ico-cross-btn.svg'
import SaveIcon from '../../common/assets/icons/ico-save.svg'
import Tooltip from 'common/components/Tooltip'
import { TRow } from 'features/nft/nftModals/table'
import React, { useState } from 'react'
import { clipboard } from 'electron'
import { IMouseEvent } from 'types/rpc'

interface AddressFormProps {
  address: string
  currentRow: TRow | undefined
  saveAddressLabel: (address: string, label: string) => void
}

export const AddressForm: React.FC<AddressFormProps> = ({
  address,
  currentRow,
  saveAddressLabel,
}): JSX.Element => {
  const [edit, setEdit] = useState<string | null>(null)
  const [editName, setEditName] = useState<string>('')

  const copyAddress = (address: string, e: IMouseEvent) => {
    const image = e.target as HTMLImageElement
    if (image.src === checkIcon) {
      return
    }

    image.src = checkIcon
    clipboard.writeText(address)
    setTimeout(() => {
      image.src = pasteIcon
    }, 2000)
  }

  return (
    <div className='flex ml-3 xl:ml-21px items-center mr-2 md:mr-0'>
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
            type='right'
            padding={5}
            content={currentRow.address.toString()}
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
        <div className='w-5 h-5 flex items-center ml-3 xl:ml-7'>
          <img
            className='cursor-pointer'
            onClick={() => {
              setEdit(null)
            }}
            src={CrossIcon}
          />
        </div>
      ) : (
        <div className='w-5 h-5 flex items-center ml-3 xl:ml-7'>
          <img
            className='cursor-pointer w-5 h-5'
            onClick={e => copyAddress(address, e)}
            src={pasteIcon}
          />
        </div>
      )}
      {edit === address ? (
        <div className='w-5 h-5 flex items-center ml-3 xl:ml-26px'>
          <img
            className='cursor-pointer'
            onClick={() => {
              saveAddressLabel(edit, editName)
              setEdit(null)
            }}
            src={SaveIcon}
          />
        </div>
      ) : (
        <div className='w-5 h-5 flex items-center ml-3 xl:ml-26px'>
          <img
            className='cursor-pointer'
            onClick={() => {
              if (currentRow) {
                setEditName(currentRow.addressNick.toString())
                setEdit(currentRow.address.toString())
              }
            }}
            src={pencilIcon}
          />
        </div>
      )}
    </div>
  )
}
