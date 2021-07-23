import React, { useState } from 'react'
import { TitleModal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import infoIcon from 'common/assets/icons/ico-info.svg'
import addIcon from 'common/assets/icons/ico-add.svg'
import checkIcon from 'common/assets/icons/ico-check.svg'
import Select from 'common/components/Select/Select'
import PaymentSource from './PaymentSource'

type TDataType = {
  hash: string
}

export type PaymentModalProps = {
  isOpen: boolean
  handleClose: () => void
  paymentSources: Array<TDataType>
}

const PaymentModal = ({
  isOpen,
  handleClose,
  paymentSources,
}: PaymentModalProps): JSX.Element => {
  const [balance, setBalance] = useState<number>(12)
  const [psl, setPSL] = useState<number>(22000)
  return (
    <TitleModal
      isOpen={isOpen}
      handleClose={handleClose}
      size='4xl'
      title='Payment'
    >
      <div className='flex'>
        <div className='w-1/3'>
          {/* <div className='h-10 shadow-input pl-4 items-center flex mr-6'>
            22,000 PSL
          </div> */}
          <Select
            label='PSL'
            className='text-gray-2d w-264px'
            autocomplete={true}
            min={10000}
            max={20000}
            step={1000}
            value={psl}
            onChange={(value: number | null) => {
              if (value) {
                setPSL(psl)
              }
            }}
          />
          <div className='text-gray-a0 text-sm pt-2'>
            220,000 balance remaining
          </div>
        </div>
        <div className='flex w-1/3 pl-3 mr-5'>
          <Select
            append='%'
            label='of your balence'
            labelClasses='text-gray-71 mr-2 absolute font-medium left-16'
            className='text-gray-2d w-264px'
            autocomplete={true}
            min={1}
            max={100}
            step={1}
            value={balance}
            onChange={(value: number | null) => {
              console.log(value)
              if (value) {
                setBalance(balance)
              }
            }}
          />
          {/* 12%
          <div className='pl-3 text-gray-71'>of your balance</div> */}
        </div>
        <div className='w-1/3 h-10 flex items-center text-gray-2d'>
          <span className='font-extrabold'>10</span> &nbsp;
          <span className='text-gray-71'>PSL fee</span>
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
            {paymentSources.map((data: TDataType, index: number) => (
              <PaymentSource key={index} {...data} />
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-5'>
        <Button variant='secondary' onClick={handleClose}>
          <div className='flex items-center px-5 font-medium'>
            <span className='text-sm '>Cancel</span>
          </div>
        </Button>
        <Button
          className='ml-11px px-0 font-medium'
          childrenClassName='w-full'
          onClick={handleClose}
        >
          <div className='flex items-center px-5'>
            <img src={checkIcon} className='py-3.5' />
            <span className='text-sm ml-2'>
              Confirm <span className='font-bold'>PSL 32,000</span> payment
            </span>
          </div>
        </Button>
      </div>
    </TitleModal>
  )
}

export default PaymentModal
