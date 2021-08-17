import React, { useState } from 'react'
import Checkbox from '../../common/components/Checkbox/Checkbox'
import add2Icon from '../../common/assets/icons/ico-add-2.svg'
import Select from '../../common/components/Select/Select'
import CommentModal from './CommentModal'

import { Trash, Eye, Pencil } from 'common/components/Icons'

export type IDataType = {
  hash: string
}

const PaymentSource = ({ hash }: IDataType): JSX.Element => {
  const [isCommentOpen, setCommentOpen] = useState(false)
  const [value, setValue] = useState(15000)
  return (
    <tr className='h-67px border-b border-line-DEFAULT mr-4 justify-between'>
      <td className='whitespace-nowrap'>
        <div className='flex items-center'>
          <Checkbox
            isChecked={false}
            clickHandler={() => {
              console.log('clicked')
            }}
          ></Checkbox>
          <span className='text-blue-3f ml-5'>{hash}</span>
          <span className='ml-17px flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'>
            <Pencil size={16} className='text-gray-88' />
          </span>
          <span className='ml-11px flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec py-2 px-7px transition duration-300'>
            <Eye size={19} className='text-gray-88' />
          </span>
          <span className='ml-11px flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'>
            <Trash size={14} className='text-gray-88' />
          </span>
        </div>
      </td>
      <td className='w-24'>
        <div className='relative'>
          <span className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec py-2 px-7px transition duration-300'>
            <img
              className='cursor-pointer'
              onClick={() => setCommentOpen(true)}
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
          <Select
            className='text-gray-2d w-28'
            autocomplete={true}
            min={10000}
            max={20000}
            step={1000}
            value={value}
            onChange={(value: number | null) => {
              if (value) {
                setValue(value)
              }
            }}
          />
        </div>
      </td>
    </tr>
  )
}

export default PaymentSource
