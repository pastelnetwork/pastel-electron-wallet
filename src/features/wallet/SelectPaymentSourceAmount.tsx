import React from 'react'
import { useWalletScreenContext } from './walletScreen.context'
import {
  useSetPaymentSource,
  useSetPaymentSourceModal,
} from './walletScreen.hooks'
import { parseFormattedNumber, formatPrice } from '../../common/utils/format'
import SelectAmount, {
  generateStep,
  TOption,
} from '../../common/components/SelectAmount'

export default function SelectPaymentSourceAmount({
  address,
  isModal,
}: {
  address: string
  isModal?: boolean
}): JSX.Element {
  const {
    paymentSources,
    allAddressAmounts,
    paymentSourcesModal,
  } = useWalletScreenContext()
  const setPaymentSource = useSetPaymentSource()
  const setPaymentSourcesModal = useSetPaymentSourceModal()

  let selected = paymentSources[address]
  if (isModal) {
    selected = paymentSourcesModal[address]
  }
  const amount = allAddressAmounts.data?.[address] || 0
  const value = selected ?? amount

  return (
    <SelectAmount
      className='text-gray-2d w-28'
      min={0}
      max={amount}
      step={generateStep(amount)}
      defaultValue={{
        label: formatPrice(value, '', 4),
        value: String(value),
      }}
      onChange={(selection: TOption) => {
        const value = parseFormattedNumber(selection.value)
        setPaymentSourcesModal(address, value)
        if (!isModal) {
          setPaymentSource(address, value)
        }
      }}
    />
  )
}

SelectPaymentSourceAmount.defaultProps = {
  isModal: undefined,
}
