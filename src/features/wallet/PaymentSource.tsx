import React, { useState } from 'react'
import CommentModal from './CommentModal'
import { formatAddress } from 'common/utils/format'

import Checkbox from '../../common/components/Checkbox/Checkbox'
import add2Icon from '../../common/assets/icons/ico-add-2.svg'

import { Trash, Eye, Pencil } from 'common/components/Icons'
import { useToggleSelectAddress } from './walletScreen.hooks'
import { useWalletScreenContext } from './walletScreen.context'
import SelectPaymentSourceAmount from './SelectPaymentSourceAmount'

export type TDataType = {
  address: string
}

const PaymentSource = ({ address }: TDataType): JSX.Element => {
  const [isCommentOpen, setCommentOpen] = useState(false)
  const toggleSelect = useToggleSelectAddress()
  const {
    addressBook: { addressBookMap },
    pastelPromoCode,
  } = useWalletScreenContext()

  const promoCode = pastelPromoCode.data?.find(code => code.address === address)

  return (
    <tr className='h-67px border-b border-line-DEFAULT mr-4 justify-between'>
      <td className='whitespace-nowrap'>
        <div className='flex items-center'>
          <Checkbox
            isChecked={true}
            clickHandler={() => toggleSelect(address)}
          />
          <span className='text-blue-3f ml-5 truncate max-w-[240px]'>
            {promoCode
              ? promoCode.label
              : addressBookMap[address] || formatAddress(address)}
          </span>
          <span className='ml-17px flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'>
            <Pencil size={16} className='text-gray-88' />
          </span>
          <span className='ml-4px flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec py-2 px-7px transition duration-300'>
            <Eye size={19} className='text-gray-88' />
          </span>
          <span
            className='ml-4px flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
            onClick={() => toggleSelect(address)}
          >
            <Trash size={14} className='text-gray-88' />
          </span>
        </div>
      </td>
      <td className='w-24'>
        <div className='relative'>
          <span className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec py-2 px-7px transition duration-300'>
            <img
              className='cursor-pointer'
              onClick={() => setCommentOpen(!isCommentOpen)}
              src={add2Icon}
            />
          </span>
          <CommentModal
            isOpen={isCommentOpen}
            onClose={() => setCommentOpen(false)}
          />
        </div>
      </td>
      <td>
        <div className='flex justify-end pr-4'>
          <SelectPaymentSourceAmount address={address} />
        </div>
      </td>
    </tr>
  )
}

export default PaymentSource
