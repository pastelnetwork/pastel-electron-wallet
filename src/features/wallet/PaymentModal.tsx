import React, { useState } from 'react'
import styled from 'styled-components'
import cx from 'classnames'
// Components
import Modal from './modal'
import Checkbox from '../../common/components/Checkbox/Checkbox'
import Button from '../../common/components/Button/Button'
import pasteIcon from '../../common/assets/icons/ico-paste.svg'
import pencilIcon from '../../common/assets/icons/ico-pencil.svg'
import passEyeIcon from '../../common/assets/icons/ico-pass-eye.svg'
import infoIcon from '../../common/assets/icons/ico-info.svg'
import addIcon from '../../common/assets/icons/ico-add.svg'
import add2Icon from '../../common/assets/icons/ico-add-2.svg'
import checkIcon from '../../common/assets/icons/ico-check.svg'
import Select from '../../common/components/Select/Select'

interface IDataType {
  hash: string
}

export interface PaymentModalProps {
  isOpen: boolean
  handleClose: () => void
  paymentSources: Array<IDataType>
}

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-top: 16px solid white;
  filter: drop-shadow(1px 1px 1px #e5e7eb);
`

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  handleClose,
  paymentSources,
}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='4xl' title='Payment'>
      <div className='flex'>
        <div className='w-1/3'>
          <div className='h-10 shadow-input pl-4 items-center flex mr-6'>
            22,000 PSL
          </div>
          <div className='text-gray-a0 text-sm pt-2'>
            220,000 balance remaining
          </div>
        </div>
        <div className='flex w-1/3 h-10 shadow-input items-center pl-3 mr-5'>
          12%
          <div className='pl-3 text-gray-71'>of your balance</div>
        </div>
        <div className='w-1/3 h-10 flex items-center'>
          10 &nbsp;<span className='text-gray-71'>PSL fee</span>
        </div>
      </div>
      <div>
        <div className='text-lg font-bold text-gray-4a pt-6 pb-2'>
          Address of recipient
        </div>
        <div className='shadow-input rounded'>
          <input
            placeholder='input recipient address'
            className='px-3 py-2 border-none bg-transparent focus:outline-none'
          />
        </div>
      </div>
      <div>
        <div className='flex text-lg font-bold text-gray-4a pt-6 pb-2 border-b border-gray-a0'>
          Shielded payment source
          <img className='ml-3' src={infoIcon} />
          <img className='ml-1 ' src={addIcon} />
        </div>
        <table className='w-full'>
          <tbody>
            {paymentSources.map((data: IDataType, index: number) => (
              <PaymentSource key={index} {...data} />
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-5'>
        <Button variant='transparent' onClick={handleClose}>
          <div className='flex items-center  px-5'>
            <span className='text-sm '>Cancel</span>
          </div>
        </Button>
        <Button className='ml-11px' onClick={handleClose}>
          <div className='flex items-center px-5'>
            <img src={checkIcon} className='py-3.5' />
            <span className='text-sm ml-2'>
              Confirm <span className='font-bold'>PSL 32,000</span> payment
            </span>
          </div>
        </Button>
      </div>
    </Modal>
  )
}

export interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
}

const CommentModal = ({ isOpen, onClose }: CommentModalProps) => {
  const [tab, setTab] = useState('Comments')
  return (
    <div
      className={cx(
        !isOpen && 'hidden',
        'ml-2 w-371px absolute bottom-12 transform -translate-x-1/2 border border-gray-f3 rounded bg-white shadow-textbox',
      )}
    >
      <div className='px-4 flex text-gray-a0 border-b border-gray-f3 justify-between'>
        <div className='flex'>
          {['Comments', 'Notes'].map((each, index) => (
            <div
              key={index}
              onClick={() => setTab(each)}
              className={cx(
                'px-4 py-2 cursor-pointer',
                each == tab && 'text-gray-71 border-b border-gray-71',
              )}
            >
              {each}
            </div>
          ))}
        </div>
        <img src={infoIcon} />
      </div>
      <div className='px-7 pt-4'>
        <textarea
          placeholder='Type something ...'
          className='resize-none w-full focus:outline-none'
        />
      </div>
      <div className='flex justify-end px-7'>
        <div
          onClick={() => onClose()}
          className='text-blue-3f hover:text-blue-600 px-1 pb-4 cursor-pointer'
        >
          Save
        </div>
      </div>
      <div>
        <Triangle className='absolute bottom-0 left-1/2 transform -translate-x-2/4 translate-y-full' />
      </div>
    </div>
  )
}

const PaymentSource = ({ hash }: IDataType) => {
  const [isCommentOpen, setCommentOpen] = useState(false)
  const [value, setValue] = useState(15000)
  return (
    <tr className='h-67px border-b border-line-DEFAULT mr-4 justify-between'>
      <td className='whitespace-nowrap'>
        <div className='flex'>
          <Checkbox
            isChecked={false}
            clickHandler={() => {
              console.log('clicked')
            }}
          >
            <span className='text-blue-3f'>{hash}</span>
          </Checkbox>
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

export default PaymentModal
