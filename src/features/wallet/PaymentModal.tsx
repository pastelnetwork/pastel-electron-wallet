import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import hex from 'hex-string'

import { TitleModal } from 'common/components/Modal'
import { Button } from 'common/components/Buttons'
import checkIcon from 'common/assets/icons/ico-check.svg'
import Select from 'common/components/Select/Select'
import PaymentSource from './PaymentSource'
import { useCurrencyName } from 'common/hooks/appInfo'
import Tooltip from 'common/components/Tooltip'
import { formatPrice, formatNumber } from 'common/utils/format'
import { transactionRPC } from 'api/pastel-rpc'
import * as ROUTES from 'common/utils/constants/routes'
import SelectAmount, {
  generateStep,
  TOption,
} from '../../common/components/SelectAmount'
import { saveTransactionNote } from 'common/utils/TransactionNote'
import { EliminationIcon, AddIcon } from 'common/components/Icons'
import { useWalletScreenContext } from './walletScreen.context'
import { useSetPaymentSource } from './walletScreen.hooks'
import { useAppSelector } from '../../redux/hooks'
import Input from 'common/components/Inputs/Input'
import AddPaymentSourceModal from './AddPaymentSourceModal'
import { TNote } from './CommentModal'
import { isZaddr, isTransparent } from 'common/utils/wallet'
import congratulations from 'common/assets/icons/ico-congratulations.svg'

const selectListClassName =
  'absolute top-full min-w-full mt-[3px] py-3 rounded-md bg-white border-gray-e6 shadow-16px text-gray-35 font-medium max-h-[200px] overflow-y-auto z-100 whitespace-normal'

type TLocationSate = {
  amount: number
  address: string
  memoString: string
}

const PaymentModal = (): JSX.Element => {
  const info = useAppSelector(state => state.appInfo.info)
  const location = useLocation()
  const history = useHistory()
  const setPaymentSource = useSetPaymentSource()
  const {
    setPaymentModalOpen: setIsOpen,
    paymentSources,
    totalBalances,
    selectedAmount,
    allAddressAmounts,
    setPaymentSources,
    setSelectedAddresses,
    selectedAddresses,
  } = useWalletScreenContext()
  const currencyName = useCurrencyName()
  const [balance, setBalance] = useState<number>(!selectedAmount ? 0 : 12)
  const [psl, setPSL] = useState<number>(selectedAmount)
  const [recipientAddress, setRecipientAddress] = useState<string>('')
  const [memoString, setMemoString] = useState<string>('')
  const [defaulSelectedAmount, setDefaulSelectedAmount] = useState({
    label: `${formatPrice(selectedAmount, '', 4)}`,
    value: `${selectedAmount}`,
  })
  const [messages, setMessages] = useState<string[]>([])
  const [paymentNotes, setPaymentNotes] = useState<TNote[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isComplete, setComplete] = useState(false)
  const [fee, setFee] = useState<string>(
    info.paytxfee ? String(info.paytxfee) : String(info.relayfee),
  )
  const [
    addPaymentSourceModalIsOpen,
    setAddPaymentSourceModalIsOpen,
  ] = useState(false)
  const [isValidRecipientAddress, setValidRecipientAddress] = useState<boolean>(
    false,
  )
  const [message, setMessage] = useState<string>('')

  const close = () => {
    setComplete(false)
    setLoading(false)
    setMessages([])
    setMemoString('')
    setRecipientAddress('')
    setPaymentSources(() => {
      return {}
    })
    setSelectedAddresses(() => {
      return []
    })
    if (location.state) {
      history.push(ROUTES.WALLET)
    }
    setIsOpen(false)
  }

  useEffect(() => {
    if (location.state) {
      const state = location.state as TLocationSate
      setPSL(state.amount)
      setRecipientAddress(state.address)
      if (state.memoString) {
        setMemoString(state.memoString)
      }
      setDefaulSelectedAmount({
        label: formatNumber(state.amount),
        value: String(state.amount),
      })
      updatePaymentSources(state.amount)
    }
  }, [location])

  const getTotalPaymentSources = () => {
    let total = 0
    for (const key in paymentSources) {
      total += paymentSources[key]
    }

    return total
  }

  const updatePaymentSources = (amount: number) => {
    const addressAmounts = allAddressAmounts.data
    if (addressAmounts) {
      let total = 0
      for (const key in addressAmounts) {
        if (total < amount) {
          if (total + addressAmounts[key] >= amount) {
            setPaymentSource(key, amount - total)
          } else {
            setPaymentSource(key, addressAmounts[key])
          }
          total += addressAmounts[key]
        }
      }
    }
  }

  const handleSendPayment = async () => {
    if (!recipientAddress) {
      setValidRecipientAddress(false)
      setMessage('Recipient address is required')
      return
    }

    if (!isZaddr(recipientAddress) && !isTransparent(recipientAddress)) {
      setValidRecipientAddress(false)
      setMessage('Recipient address is invalid')
      return
    }

    setMessages([])
    const errors = []
    let total = 0
    for (let i = 0; i < selectedAddresses.length; i++) {
      const address = selectedAddresses[i]
      if (paymentSources[address]) {
        const amount = paymentSources[address]
        if (
          allAddressAmounts.data?.[address] &&
          amount + parseFloat(fee) > allAddressAmounts.data?.[address] &&
          psl > allAddressAmounts.data?.[address]
        ) {
          errors.push(
            `Address: ${address} failed. Insufficient shielded funds, have ${formatPrice(
              allAddressAmounts.data?.[address],
              '',
              4,
            )}, need ${formatPrice(amount + parseFloat(fee), '', 4)}`,
          )
        }

        total += amount
      }
    }

    if (errors.length > 0) {
      setMessages(errors)
      return
    }

    if (total < psl) {
      setMessages(['The amount exceeds the selected balance'])
      return
    }
    setLoading(true)
    const operationIdList = []
    const textEncoder = new TextEncoder()
    for (let i = 0; i < selectedAddresses.length; i++) {
      const address = selectedAddresses[i]
      if (paymentSources[address]) {
        try {
          const note = paymentNotes.find(n => n.address === address)
          const { result } = await transactionRPC.sendTransactionWithCustomFee({
            from: address,
            to: [
              {
                address: recipientAddress,
                amount: paymentSources[address],
                memo: note?.recipientNote
                  ? hex.encode(textEncoder.encode(note?.recipientNote))
                  : undefined,
              },
            ],
            fee: parseFloat(fee),
          })
          operationIdList.push(result)
        } catch (error) {
          toast(error.message, { type: 'error' })
        }
      }
    }

    if (operationIdList.length > 0) {
      handleGetTransactionResult(operationIdList)
    } else {
      setLoading(false)
    }
  }

  const handleGetTransactionResult = async (operationIdList: string[]) => {
    const {
      result: transactionResult,
    } = await transactionRPC.getTransactionStatus(operationIdList)
    const errorMgs: string[] = []
    let hasError = false
    let isExecuting = false
    transactionResult.forEach(item => {
      if (item.status === 'failed') {
        errorMgs.push(`Opid ${item.id} Failed. ${item.error?.message}`)
        hasError = true
      } else if (item.status === 'success') {
        errorMgs.push(
          `Transaction was successfully broadcast. \nTXID: ${item?.result?.txid}`,
        )
        const note = paymentNotes.find(
          n => n.address === item.params.fromaddress,
        )
        if (note?.privateNote && item?.result?.txid) {
          saveTransactionNote({
            txnId: item.result.txid,
            privateNote: note.privateNote,
          })
        }
      } else {
        isExecuting = true
      }
    })

    if (isExecuting) {
      setTimeout(() => {
        handleGetTransactionResult(operationIdList)
      }, 2000) // 2 sec
    } else {
      setMessages(errorMgs)
      if (!hasError) {
        setComplete(true)
      }
      setLoading(false)
    }
  }

  const handleSavePaymentNote = (note: TNote) => {
    const index = paymentNotes.findIndex(n => n.address === note.address)
    if (index !== -1) {
      const tmp = paymentNotes
      tmp[index] = note
      setPaymentNotes(tmp)
    } else {
      setPaymentNotes([...paymentNotes, note])
    }
  }

  let recipientAddressIsValid = null
  if (!isValidRecipientAddress && message) {
    recipientAddressIsValid = false
  }

  return (
    <>
      <TitleModal
        isOpen
        handleClose={close}
        title={!isComplete ? 'Payment' : ''}
        classNames='max-w-4xl'
      >
        {isComplete ? (
          <>
            <div className='text-center'>
              <div>
                <img
                  src={congratulations}
                  alt='Congratulations'
                  className='w-54px h-54px mx-auto'
                />
              </div>
              <div className='text-gray-800 text-2xl font-extrabold mt-26px'>
                {messages.map((err, idx) => (
                  <p key={idx} className='pt-2 mb-1 text-h4'>
                    {err}
                  </p>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='flex'>
              <div className='w-1/3'>
                <SelectAmount
                  className='text-gray-2d'
                  min={0}
                  max={totalBalances.data?.total || 0}
                  step={generateStep(totalBalances.data?.total || 0)}
                  defaultValue={defaulSelectedAmount}
                  onChange={(selection: TOption) => {
                    setPSL(parseFloat(selection.value))
                  }}
                  label={currencyName}
                  forceUpdate
                />
              </div>
              <div className='flex w-1/3 pl-3 mr-5'>
                <Select
                  append='%'
                  label='of your balance'
                  labelClasses='text-base font-normal text-gray-4a mr-2 absolute left-16'
                  className='text-gray-2d w-264px'
                  inputClassName='text-base font-normal text-gray-4a pl-0'
                  inputWrapperClassName='w-full'
                  customListClassName={selectListClassName}
                  autocomplete={true}
                  min={0}
                  max={100}
                  step={1}
                  value={balance}
                  onChange={(value: number | null) => {
                    if (value) {
                      setBalance(balance)
                      if (totalBalances.data?.total) {
                        const newPsl = (totalBalances.data?.total * value) / 100
                        setPSL(newPsl)
                        setDefaulSelectedAmount({
                          label: formatPrice(newPsl, '', 4),
                          value: newPsl.toString(),
                        })
                      }
                    }
                  }}
                />
              </div>
              <div className='w-1/3 h-10 flex items-center text-gray-2d'>
                <div className='text-gray-4a text-h5-heavy w-[75px]'>
                  <Input
                    placeholder='fee'
                    type='number'
                    value={fee}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFee(e.target.value)
                    }
                    hintAsTooltip={false}
                  />
                </div>{' '}
                &nbsp;
                <div className='text-gray-71 text-h5-medium'>
                  {currencyName} transaction fee
                </div>
                <div className='ml-1'>
                  <Tooltip
                    classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs top-[-62px]'
                    content={`The transaction fee you will pay for this ${currencyName} transaction. Most users should stick with the default transaction fee of ${
                      info.paytxfee || info.relayfee
                    } ${currencyName}. The transaction fee is required as an incentive for miners to include your transaction in the next Pastel block; a transaction with a low fee may take longer to be confirmed by the network.`}
                    width={250}
                    type='left'
                  >
                    <EliminationIcon
                      size={13}
                      className='text-gray-8e cursor-pointer hover:rounded-full hover:bg-gray-f6 active:bg-gray-ec transition duration-300'
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className='pt-6px text-gray-a0 text-h6-leading-20'>
              {formatPrice(
                (totalBalances.data?.total || 0) - psl,
                currencyName,
              )}{' '}
              balance remaining after payment
            </div>
            <div>
              <div className='pt-[23px] flex items-center text-gray-4a text-h5-heavy'>
                Address of Recipient
                <div className='ml-9px'>
                  <Tooltip
                    classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                    content={`The ${currencyName} address you want to send ${currencyName} coins to. This can either be a transparent address, where anyone can see the transaction in the Pastel Explorer (transparent addresses begin with the letters “Pt”), or it can be a shielded address, where no one will be able to see the amount or the address of the recipient (shielded addresses begin with the letters “ps”).`}
                    width={250}
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
                <Input
                  placeholder='Input recipient address'
                  type='text'
                  value={recipientAddress}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRecipientAddress(e.target.value)
                  }
                  isValid={recipientAddressIsValid}
                  errorMessage={
                    !recipientAddressIsValid && message
                      ? message || 'Recipient address is invalid.'
                      : null
                  }
                  hint
                  hintAsTooltip={false}
                />
              </div>
            </div>
            <div className='mt-9'>
              <div className='flex border-b-[1px] border-gray-ec pb-[13px] text-gray-4a text-h5-heavy'>
                Payment Source
                <span className='flex items-center ml-9px'>
                  <Tooltip
                    classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                    content={`The ${currencyName} address or addresses in your Pastel Wallet that you want to send the ${currencyName} from. This can include one or more transparent OR shielded addresses. In order for your transaction to be completely shielded, all source addresses and the address of the recipient must be shielded addresses.`}
                    width={250}
                    type='top'
                  >
                    <EliminationIcon
                      size={13}
                      className='text-gray-8e cursor-pointer hover:rounded-full hover:bg-gray-f6 active:bg-gray-ec transition duration-300'
                    />
                  </Tooltip>
                </span>
                <span
                  className='flex items-center ml-[8px]'
                  onClick={() => setAddPaymentSourceModalIsOpen(true)}
                >
                  <Tooltip
                    classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                    content='Add Payment Source'
                    width={150}
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
                  {Object.entries(paymentSources).map(
                    (address: [string, number]) => (
                      <PaymentSource
                        key={`${address[0]}-${address[1]}`}
                        address={address[0]}
                        onSavePaymentNote={handleSavePaymentNote}
                        defaultsNote={memoString}
                      />
                    ),
                  )}
                </tbody>
              </table>
            </div>
            {messages.length > 0 ? (
              <>
                {messages.map((err, idx) => (
                  <p key={idx} className='pt-2 mb-1 text-red-4a'>
                    {err}
                  </p>
                ))}
              </>
            ) : null}
            <div className='flex justify-end mt-[21px]'>
              <Button
                variant='secondary'
                onClick={close}
                className='w-[146px]'
                disabled={isLoading}
              >
                <div className='flex items-center px-5 text-blue-3f text-h5-medium'>
                  <span className='text-sm '>Cancel</span>
                </div>
              </Button>
              <Button
                className='ml-[30px] px-0'
                childrenClassName='w-full'
                onClick={handleSendPayment}
                disabled={
                  isLoading ||
                  getTotalPaymentSources() < psl ||
                  !psl ||
                  !recipientAddress
                }
              >
                <div className='flex items-center px-5 text-white text-h5-heavy'>
                  <img src={checkIcon} className='py-3.5' />
                  <span className='ml-[9px]'>
                    Confirm Payment of {formatPrice(psl, currencyName, 2)}
                  </span>
                </div>
              </Button>
            </div>
          </>
        )}
      </TitleModal>
      <AddPaymentSourceModal
        isOpen={addPaymentSourceModalIsOpen}
        onClose={() => setAddPaymentSourceModalIsOpen(false)}
      />
    </>
  )
}

export default PaymentModal
