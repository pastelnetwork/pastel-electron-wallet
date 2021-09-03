import React from 'react'
import { useWalletScreenContext } from './walletScreen.context'
import { useSetPaymentSource } from './walletScreen.hooks'
import { parseFormattedNumber } from '../../common/utils/format'
import SelectAmount, {
  generateStep,
  TOption,
} from '../../common/components/SelectAmount'

export default function SelectPaymentSourceAmount({
  address,
}: {
  address: string
}): JSX.Element {
  const { paymentSources, allAddressAmounts } = useWalletScreenContext()
  const setPaymentSource = useSetPaymentSource()

  const selected = paymentSources[address]
  const amount = allAddressAmounts.data?.[address] || 0
  const value = selected ?? amount

  return (
    <SelectAmount
      className='text-gray-2d w-28'
      min={0}
      max={amount}
      step={generateStep(amount)}
      defaultValue={{
        label: String(value),
        value: String(value),
      }}
      onChange={(selection: TOption) => {
        const value = parseFormattedNumber(selection.value)
        setPaymentSource(address, value)
      }}
    />
  )
}
