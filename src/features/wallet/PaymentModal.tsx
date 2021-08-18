import React, { useState, useEffect } from 'react'
import dayjs from 'common/utils/initDayjs'
import { TitleModal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import checkIcon from 'common/assets/icons/ico-check.svg'
import Select from 'common/components/Select/Select'
import PaymentSource from './PaymentSource'
import { useCurrencyName } from 'common/hooks/appInfo'
import Typography, { TypographyVariant } from 'common/components/Typography'
import Tooltip from 'common/components/Tooltip'
import { TAddressRow } from 'types/rpc'
import { formatPrice } from 'common/utils/format'

import { EliminationIcon, AddIcon } from 'common/components/Icons'

type TSelectionPslProps = {
  address: string
  amount: number
  valid: boolean
  date: number
}

export type TPaymentModalProps = {
  isOpen: boolean
  handleClose: () => void
  paymentSources: TAddressRow[]
  totalBalances: number
}

const PaymentModal = ({
  isOpen,
  handleClose,
  paymentSources,
  totalBalances,
}: TPaymentModalProps): JSX.Element => {
  const currencyName = useCurrencyName()
  const [balance, setBalance] = useState<number>(12)
  const [psl, setPSL] = useState<number>(12000)
  const [selectedTotal, setSelectedTotal] = useState(0)
  const [selectedRows, setSelectedRows] = useState<Array<string>>([])
  const [selectionPsl, setSelectionPsl] = useState<TSelectionPslProps[]>([])

  useEffect(() => {
    let tempSelectedAmount = 0
    paymentSources.forEach(item => {
      for (let i = 0; i < selectedRows.length; i++) {
        if (selectedRows[i] === item.address) {
          const psl = selectionPsl.filter(
            psl => psl.address === item.address,
          )[0]
          if (psl?.amount && psl?.valid) {
            tempSelectedAmount += psl.amount
          } else if (item.amount) {
            tempSelectedAmount += item.amount
          }
        }
      }
    })
    setSelectedTotal(tempSelectedAmount)
  }, [selectedRows, selectionPsl])

  const handleSelectedRows = (row: TAddressRow) => {
    if (row) {
      const temp = selectedRows
      if (temp.includes(row.address.toString())) {
        temp.forEach((item, index) => {
          item == row.address.toString() && temp.splice(index, 1)
        })
      } else {
        temp.push(row.address.toString())
      }
      setSelectedRows([...temp])
    }
  }

  const handlAmountChange = (selection: number | null, row: TAddressRow) => {
    if (selection && row) {
      const tmpSelectionPsl = selectionPsl
      const selectionPslIndex = tmpSelectionPsl.findIndex(
        psl => psl.address === row.address,
      )
      if (selectionPslIndex !== -1) {
        tmpSelectionPsl[selectionPslIndex].amount = selection
        tmpSelectionPsl[selectionPslIndex].valid = selection <= row.amount
        tmpSelectionPsl[selectionPslIndex].date = dayjs().valueOf()
        setSelectionPsl([...tmpSelectionPsl])
      } else {
        setSelectionPsl([
          ...tmpSelectionPsl,
          {
            address: row.address,
            amount: selection,
            valid: selection <= row.amount,
            date: dayjs().valueOf(),
          },
        ])
      }
    }
  }

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
        {formatPrice(totalBalances - selectedTotal, currencyName)} balance
        remaining after payment
      </Typography>
      <div>
        <Typography
          variant={TypographyVariant.h5_16_24_heavy}
          customColor='text-gray-4a'
          className='pt-[23px] flex items-center'
        >
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
        </Typography>
        <table className='w-full'>
          <tbody>
            {paymentSources.map((data: TAddressRow, index: number) => (
              <PaymentSource
                key={index}
                walletAddress={data}
                onSelectedRows={handleSelectedRows}
                onAmountChange={handlAmountChange}
              />
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
              Confirm {currencyName} {formatPrice(selectedTotal, '')} payment
            </span>
          </Typography>
        </Button>
      </div>
    </TitleModal>
  )
}

export default PaymentModal
