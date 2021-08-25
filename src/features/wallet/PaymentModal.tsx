import React, { useState } from 'react'

import { TitleModal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import checkIcon from 'common/assets/icons/ico-check.svg'
import Select from 'common/components/Select/Select'
import PaymentSource from './PaymentSource'
import { useCurrencyName } from 'common/hooks/appInfo'
import Tooltip from 'common/components/Tooltip'
import { TAddressRow } from 'types/rpc'
import { formatNumber } from 'common/utils/format'
import { TRow } from 'common/components/Table'

import { EliminationIcon, AddIcon } from 'common/components/Icons'

export type TPaymentModalProps = {
  isOpen: boolean
  handleClose: () => void
  paymentSources: TAddressRow[]
  totalBalances: number
  onRemoveRow: (row: TRow) => void
  onAmountChange: (selection: number | null, row?: TRow) => void
  selectedTotal: number
  onSelectedRows: (row: TAddressRow) => void
}

const PaymentModal = ({
  isOpen,
  handleClose,
  paymentSources,
  totalBalances,
  onRemoveRow,
  onAmountChange,
  selectedTotal,
  onSelectedRows,
}: TPaymentModalProps): JSX.Element => {
  const currencyName = useCurrencyName()
  const [balance, setBalance] = useState<number>(12)
  const [psl, setPSL] = useState<number>(12000)

  return (
    <TitleModal
      isOpen={isOpen}
      handleClose={handleClose}
      title='Payment'
      classNames='max-w-4xl'
    >
      <div className='flex'>
        <div className='w-1/3'>
          <Select
            label={currencyName}
            className='text-gray-2d w-full'
            labelClasses='text-base font-normal text-gray-a0 mr-2 absolute right-[25px]'
            inputClassName='text-base font-normal text-gray-4a pl-0'
            autoCompleteClassName='w-full pr-[45px]'
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
            inputClassName='text-base font-normal text-gray-4a pl-0'
            autoCompleteClassName='w-full'
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
        </div>
        <div className='w-1/3 h-10 flex items-center text-gray-2d'>
          <div className='text-gray-4a text-h5-heavy'>10</div> &nbsp;
          <div className='text-gray-71 text-h5-medium'>{currencyName} fee</div>
        </div>
      </div>
      <div className='pt-6px text-gray-a0 text-h6-leading-20'>
        {formatNumber(totalBalances - selectedTotal, currencyName)} balance
        remaining after payment
      </div>
      <div>
        <div className='pt-[23px] flex items-center text-gray-4a text-h5-heavy'>
          Address of Recipient
          <div className='ml-9px'>
            <Tooltip
              classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
              content='Address of Recipient'
              width={150}
              type='top'
            >
              <EliminationIcon
                size={13}
                className='text-gray-8e cursor-pointer hover:rounded-full hover:bg-gray-f6 active:bg-gray-ec transition duration-300'
              />
            </Tooltip>
          </div>
        </div>
        <div className='mt-[19px] w-[390px]'>
          <input
            placeholder='input recipient address'
            className='px-3 py-2 bg-transparent focus:outline-none border w-full rounded border-gray-ec'
          />
        </div>
      </div>
      <div className='mt-9'>
        <div className='flex border-b-[1px] border-gray-ec pb-[13px] text-gray-4a text-h5-heavy'>
          Shielded Payment Source
          <span className='flex items-center ml-9px'>
            <Tooltip
              classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
              content='Info'
              width={110}
              type='top'
            >
              <EliminationIcon
                size={13}
                className='text-gray-8e cursor-pointer hover:rounded-full hover:bg-gray-f6 active:bg-gray-ec transition duration-300'
              />
            </Tooltip>
          </span>
          <span className='flex items-center ml-[8px]'>
            <Tooltip
              classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
              content='Info'
              width={110}
              type='top'
            >
              <AddIcon
                size={20}
                className='text-blue-3f cursor-pointer hover:rounded-full hover:text-gray-88 active:text-gray-55 transition duration-300'
              />
            </Tooltip>
          </span>
        </div>
        <table className='w-full'>
          <tbody>
            {paymentSources.map((data: TAddressRow) => (
              <PaymentSource
                key={data.address}
                walletAddress={data}
                onSelectedRows={onSelectedRows}
                onRemoveRow={onRemoveRow}
                onAmountChange={onAmountChange}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-[21px]'>
        <Button variant='secondary' onClick={handleClose} className='w-[146px]'>
          <div className='flex items-center px-5 text-blue-3f text-h5-medium'>
            <span className='text-sm '>Cancel</span>
          </div>
        </Button>
        <Button
          className='ml-[30px] px-0'
          childrenClassName='w-full'
          onClick={handleClose}
        >
          <div className='flex items-center px-5 text-white text-h5-heavy'>
            <img src={checkIcon} className='py-3.5' />
            <span className='ml-[9px]'>
              Confirm {currencyName} {formatNumber(selectedTotal, '')} payment
            </span>
          </div>
        </Button>
      </div>
    </TitleModal>
  )
}

export default PaymentModal
