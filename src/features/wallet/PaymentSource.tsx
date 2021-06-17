import React, { useState } from 'react'
import Checkbox from '../../common/components/Checkbox/Checkbox'
import pasteIcon from '../../common/assets/icons/ico-paste.svg'
import pencilIcon from '../../common/assets/icons/ico-pencil.svg'
import passEyeIcon from '../../common/assets/icons/ico-pass-eye.svg'
import add2Icon from '../../common/assets/icons/ico-add-2.svg'
import Select from '../../common/components/Select/Select'
import CommentModal from './CommentModal'

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
          <img className='ml-6' src={pencilIcon} />
          <img className='ml-18px' src={passEyeIcon} />
          <img className='ml-18px' src={pasteIcon} />
        </div>
      </td>
      <td className='w-24'>
        <div className='relative'>
          <img
            className='cursor-pointer'
            onClick={() => setCommentOpen(true)}
            src={add2Icon}
          />
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
