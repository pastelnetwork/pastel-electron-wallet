import React, { useState } from 'react'
import { TitleModal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import infoIcon from 'common/assets/icons/ico-info.svg'
import addIcon from 'common/assets/icons/ico-add.svg'
import checkIcon from 'common/assets/icons/ico-check.svg'
import Select from 'common/components/Select/Select'
import PaymentSource from './PaymentSource'
import { useCurrencyName } from 'common/hooks/appInfo'
import Typography, { TypographyVariant } from 'common/components/Typography'
import Tooltip from 'common/components/Tooltip'

import { EliminationIcon } from 'common/components/Icons'

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
  const currencyName = useCurrencyName()
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
          <Select
            label={currencyName}
            className='text-gray-2d w-264px'
            labelClasses='text-base font-normal text-gray-a0 mr-2 absolute right-[12px]'
            inputClassName='text-base font-normal text-gray-4a'
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
        </div>
        <div className='flex w-1/3 pl-3 mr-5'>
          <Select
            append='%'
            label='of your balance'
            labelClasses='text-base font-normal text-gray-4a mr-2 absolute left-16'
            className='text-gray-2d w-264px'
            inputClassName='text-base font-normal text-gray-4a'
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
          <Typography
            variant={TypographyVariant.h5_16_24_heavy}
            customColor='text-gray-4a'
          >
            10
          </Typography>{' '}
          &nbsp;
          <Typography
            variant={TypographyVariant.h5_16_24_medium}
            customColor='text-gray-71'
          >
            {currencyName} fee
          </Typography>
        </div>
      </div>
      <Typography
        variant={TypographyVariant.h6_14_20_roman}
        customColor='text-gray-a0'
        className='pt-6px'
      >
        220,000 {currencyName} balance remaining after payment
      </Typography>
      <div>
        <Typography
          variant={TypographyVariant.h5_16_24_heavy}
          customColor='text-gray-4a'
          className='pt-[23px] flex items-center'
        >
          Address of Recipient
          <Tooltip
            classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
            content='Address of Recipient'
            width={150}
            type='top'
          >
            <EliminationIcon size={13} className='text-gray-8e ml-9px' />
          </Tooltip>
        </Typography>
        <div className='mt-[19px] w-[390px]'>
          <input
            placeholder='input recipient address'
            className='px-3 py-2 bg-transparent focus:outline-none border w-full rounded border-gray-ec'
          />
        </div>
      </div>
      <div className='mt-9'>
        <Typography
          variant={TypographyVariant.h5_16_24_heavy}
          customColor='text-gray-4a'
          className='flex border-b-[1px] border-gray-ec pb-[13px]'
        >
          Shielded payment source
          <img className='ml-[7px] w-[13px]' src={infoIcon} />
          <img className='ml-[8px] w-[20px]' src={addIcon} />
        </Typography>
        <table className='w-full'>
          <tbody>
            {paymentSources.map((data: TDataType, index: number) => (
              <PaymentSource key={index} {...data} />
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-[21px]'>
        <Button variant='secondary' onClick={handleClose} className='w-[146px]'>
          <Typography
            variant={TypographyVariant.h5_16_24_medium}
            customColor='text-blue-3f'
            className='flex items-center px-5'
          >
            <span className='text-sm '>Cancel</span>
          </Typography>
        </Button>
        <Button
          className='ml-[30px] px-0'
          childrenClassName='w-full'
          onClick={handleClose}
        >
          <Typography
            variant={TypographyVariant.h5_16_24_heavy}
            customColor='text-white'
            className='flex items-center px-5'
          >
            <img src={checkIcon} className='py-3.5' />
            <span className='ml-[9px]'>
              Confirm {currencyName} 32,000 payment
            </span>
          </Typography>
        </Button>
      </div>
    </TitleModal>
  )
}

export default PaymentModal
