import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import hex from 'hex-string'
import cn from 'classnames'
import { shell } from 'electron'

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
import { useSetPaymentSourceModal } from './walletScreen.hooks'
import { useAppSelector } from '../../redux/hooks'
import Input from 'common/components/Inputs/Input'
import AddPaymentSourceModal from './AddPaymentSourceModal'
import { TNote } from './CommentModal'
import { isZaddr, isTransparent } from 'common/utils/wallet'
import { translate } from 'features/app/translations'

const selectListClassName =
  'absolute top-full min-w-full mt-[3px] py-3 rounded-md bg-white border-gray-e6 shadow-16px text-gray-35 font-medium max-h-[200px] overflow-y-auto z-100 whitespace-normal'

type TLocationSate = {
  amount: number
  address: string
  memoString: string
}

type TPaymentResults = {
  id: number
  txId?: string
  status: string
  message?: string
}

function ViewTxIDButton({ txId }: { txId: string }): JSX.Element {
  const handleClick = useCallback(() => {
    shell.openExternal(`https://explorer.pastel.network/tx/${txId}`)
  }, [])

  return (
    <Button
      className='px-0 w-[150px] ml-auto mr-5px'
      childrenClassName='w-full'
      onClick={handleClick}
    >
      <div className='flex items-center justify-center px-3 text-white text-h5-heavy'>
        {translate('viewTXID')}&nbsp;
        <i className='ml-[5px] fas fa-external-link-square-alt' />
      </div>
    </Button>
  )
}

export default function PaymentModal(): JSX.Element {
  const info = useAppSelector(state => state.appInfo.info)
  const location = useLocation()
  const history = useHistory()
  const setPaymentSourcesModal = useSetPaymentSourceModal()
  const {
    setPaymentModalOpen: setIsOpen,
    paymentSourcesModal,
    totalBalances,
    selectedAmount,
    allAddressAmounts,
    selectedAddressesModal,
    setSelectedAddressesModal,
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
  const [
    recipientAddressMessage,
    setRecipientAddressMessage,
  ] = useState<string>('')
  const [paymentResults, setPaymentResults] = useState<TPaymentResults[]>([])

  const handleCloseModal = useCallback(() => {
    if (!isLoading) {
      setComplete(false)
      setLoading(false)
      setMessages([])
      setRecipientAddressMessage('')
      setMemoString('')
      setRecipientAddress('')
      if (location.state) {
        history.push(ROUTES.WALLET)
      }
      setIsOpen(false)
    }
  }, [])

  const updatePaymentSources = (amount: number) => {
    const addressAmounts = allAddressAmounts.data
    if (addressAmounts) {
      let total = 0
      for (const key in addressAmounts) {
        if (total < amount) {
          const addressAmount: number = addressAmounts[key] || 0
          if (total + addressAmount >= amount) {
            setPaymentSourcesModal(key, amount - total)
          } else {
            setPaymentSourcesModal(key, addressAmounts[key])
          }
          total += addressAmounts[key]

          setSelectedAddressesModal(addresses => {
            if (addresses.includes(key)) {
              return addresses.filter(item => item !== key)
            } else {
              return [...addresses, key]
            }
          })
        }
      }
    }
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
    for (const key in paymentSourcesModal) {
      total += paymentSourcesModal[key]
    }

    return total
  }

  const handleGetTransactionResult = async (operationIdList: string[]) => {
    const {
      result: transactionResult,
    } = await transactionRPC.getTransactionStatus(operationIdList)
    const paymentStatus: TPaymentResults[] = []
    let isExecuting = false
    transactionResult.forEach((item, idx) => {
      if (item.status === 'failed') {
        paymentStatus.push({
          txId: item.id,
          status: translate('failed'),
          message: item.error?.message,
          id: idx,
        })
      } else if (item.status === 'success') {
        const note = paymentNotes.find(
          n => n.address === item.params.fromaddress,
        )
        paymentStatus.push({
          txId: item?.result?.txid,
          status: translate('success'),
          message: '',
          id: idx,
        })
        if (note?.privateNote && item?.result?.txid) {
          saveTransactionNote({
            txnId: item.result.txid,
            privateNote: note.privateNote,
          })
            .then(() => {
              // noop
            })
            .catch(() => {
              // noop
            })
            .finally(() => {
              // noop
            })
        }
      } else {
        isExecuting = true
      }
    })

    if (isExecuting) {
      setTimeout(() => {
        handleGetTransactionResult(operationIdList)
          .then(() => {
            // noop
          })
          .catch(() => {
            // noop
          })
          .finally(() => {
            // noop
          })
      }, 2000) // 2 sec
    } else {
      setPaymentResults(paymentStatus)
      setComplete(true)
      setLoading(false)
      totalBalances.refetch()
    }
  }

  const handleSendPayment = useCallback(async () => {
    setValidRecipientAddress(false)
    setRecipientAddressMessage('')
    if (!recipientAddress) {
      setValidRecipientAddress(false)
      setRecipientAddressMessage(translate('recipientAddressIsRequired'))
      return
    }

    if (!isZaddr(recipientAddress) && !isTransparent(recipientAddress)) {
      setValidRecipientAddress(false)
      setRecipientAddressMessage(translate('recipientAddressIsInvalid'))
      return
    }

    setMessages([])
    const errors = []
    let total = 0
    for (let i = 0; i < selectedAddressesModal.length; i++) {
      const address = selectedAddressesModal[i]
      if (paymentSourcesModal[address]) {
        const amount = paymentSourcesModal[address]
        if (
          allAddressAmounts.data?.[address] &&
          amount + parseFloat(fee) > allAddressAmounts.data?.[address] &&
          psl > allAddressAmounts.data?.[address]
        ) {
          errors.push(
            translate('validateAmountOfAddress', {
              address,
              amount: formatPrice(allAddressAmounts.data?.[address], '', 4),
              requiredAmount: formatPrice(amount + parseFloat(fee), '', 4),
            }),
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
      setMessages([translate('theAmountExceedsTheSelectedBalance')])
      return
    }
    setLoading(true)
    const operationIdList = []
    const textEncoder = new TextEncoder()
    for (let i = 0; i < selectedAddressesModal.length; i++) {
      const address = selectedAddressesModal[i]
      if (paymentSourcesModal[address]) {
        try {
          const note = paymentNotes.find(n => n.address === address)
          const { result } = await transactionRPC.sendTransactionWithCustomFee({
            from: address,
            to: [
              {
                address: recipientAddress,
                amount: paymentSourcesModal[address],
                memo:
                  note?.recipientNote && !isZaddr(recipientAddress)
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
        .then(() => {
          // noop
        })
        .catch(() => {
          // noop
        })
        .finally(() => {
          // noop
        })
    } else {
      setLoading(false)
    }
  }, [])

  const handleSavePaymentNote = useCallback((note: TNote) => {
    const index = paymentNotes.findIndex(n => n.address === note.address)
    if (index !== -1) {
      const tmp = paymentNotes
      tmp[index] = note
      setPaymentNotes(tmp)
    } else {
      setPaymentNotes([...paymentNotes, note])
    }
  }, [])

  const handleRecipientAddressBlur = useCallback(() => {
    setValidRecipientAddress(false)
    setRecipientAddressMessage('')
    if (!recipientAddress) {
      setValidRecipientAddress(false)
      setRecipientAddressMessage(translate('recipientAddressIsRequired'))
    } else if (!isZaddr(recipientAddress) && !isTransparent(recipientAddress)) {
      setValidRecipientAddress(false)
      setRecipientAddressMessage(translate('recipientAddressIsInvalid'))
    }
  }, [recipientAddress])

  let recipientAddressIsValid: boolean | null = null
  if (!isValidRecipientAddress && recipientAddressMessage) {
    recipientAddressIsValid = false
  }

  const totalBalance = totalBalances.data?.total || 0
  const paytxfee: string = info.paytxfee.toString() || '0'
  const relayfee: string = info.relayfee.toString() || '0'

  const handleQuickSelectAmount = useCallback((value: number | null) => {
    if (value) {
      setBalance(balance)
      if (totalBalance) {
        const newPsl = (totalBalance * value) / 100
        setPSL(newPsl)
        setDefaulSelectedAmount({
          label: formatPrice(newPsl, '', 4),
          value: newPsl.toString(),
        })
      }
    }
  }, [])

  const handleSelectAmount = useCallback((selection: TOption) => {
    setPSL(parseFloat(selection.value))
  }, [])

  const handleOnFeePress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!/[0-9.]/.test(event.key)) {
        event.preventDefault()
      }
    },
    [],
  )

  const handleOnFeeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFee(e.target.value)
    },
    [],
  )

  const handleRecipientAddressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRecipientAddress(e.target.value)
    },
    [],
  )

  const handleShowAddPaymentSourceModal = useCallback(() => {
    setAddPaymentSourceModalIsOpen(true)
  }, [])

  const handleCloseAddPaymentSourceModal = useCallback(() => {
    setAddPaymentSourceModalIsOpen(false)
  }, [])

  const renderConfirmPaymentButton = () => {
    return (
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
          <img src={checkIcon} className='py-3.5' alt='Check' />
          <span className='ml-[9px]'>
            {translate('confirmPaymentButton', {
              price: formatPrice(psl, currencyName, 4),
            })}
          </span>
        </div>
      </Button>
    )
  }

  const renderCancelButton = () => {
    return (
      <Button
        variant='secondary'
        onClick={handleCloseModal}
        className='w-[146px]'
        disabled={isLoading}
      >
        <div className='flex items-center px-5 text-blue-3f text-h5-medium'>
          <span className='text-sm '>{translate('cancel')}</span>
        </div>
      </Button>
    )
  }

  const renderPaymentSourceList = () => {
    return (
      <table className='w-full'>
        <tbody>
          {Object.keys(paymentSourcesModal).map(address => (
            <PaymentSource
              key={address}
              address={address}
              onSavePaymentNote={handleSavePaymentNote}
              defaultsNote={memoString}
              isMemoDisabled={!isZaddr(recipientAddress)}
            />
          ))}
        </tbody>
      </table>
    )
  }

  const renderAddPaymentSourceIcon = () => {
    return (
      <span
        className='flex items-center ml-[8px]'
        onClick={handleShowAddPaymentSourceModal}
        role='button'
        tabIndex={0}
        aria-hidden='true'
      >
        <Tooltip
          classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
          content={translate('addPaymentSource')}
          width={150}
          type='top'
        >
          <AddIcon
            size={20}
            className='text-blue-3f cursor-pointer hover:rounded-full hover:text-gray-88 active:text-gray-55 transition duration-300'
          />
        </Tooltip>
      </span>
    )
  }

  const renderPaymentSourceIntroIcon = () => {
    return (
      <span className='flex items-center ml-9px'>
        <Tooltip
          classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
          content={translate('addPaymentSourceTooltipContent', {
            currencyName,
          })}
          width={250}
          type='top'
        >
          <EliminationIcon
            size={13}
            className='text-gray-8e cursor-pointer hover:rounded-full hover:bg-gray-f6 active:bg-gray-ec transition duration-300'
          />
        </Tooltip>
      </span>
    )
  }

  const renderInputRecipientAddress = (
    recipientAddressIsValid: boolean | null,
  ) => (
    <div className='mt-[19px] w-[390px]'>
      <Input
        placeholder={translate('inputRecipientAddress')}
        type='text'
        value={recipientAddress}
        onChange={handleRecipientAddressChange}
        isValid={recipientAddressIsValid}
        errorMessage={
          !recipientAddressIsValid && recipientAddressMessage
            ? recipientAddressMessage
            : null
        }
        hint
        hintAsTooltip={false}
        onBlur={handleRecipientAddressBlur}
      />
    </div>
  )

  const renderTaxFeeIntroIcon = () => (
    <div className='ml-1'>
      <Tooltip
        classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs top-[-62px]'
        content={translate('taxFeeTooltipContent', {
          currencyName,
          fee: paytxfee || relayfee,
        })}
        width={250}
        type='left'
      >
        <EliminationIcon
          size={13}
          className='text-gray-8e cursor-pointer hover:rounded-full hover:bg-gray-f6 active:bg-gray-ec transition duration-300'
        />
      </Tooltip>
    </div>
  )

  const renderAddressRecipientIntroIcon = () => (
    <div className='ml-9px'>
      <Tooltip
        classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
        content={translate('addressRecipientTooltipContent', { currencyName })}
        width={250}
        type='top'
      >
        <EliminationIcon
          size={13}
          className='text-gray-8e cursor-pointer hover:rounded-full hover:bg-gray-f6 active:bg-gray-ec transition duration-300'
        />
      </Tooltip>
    </div>
  )

  const renderFeeInputControl = () => (
    <div className='w-1/3 h-10 flex items-center text-gray-2d'>
      <div className='text-gray-4a text-h5-heavy w-[75px]'>
        <Input
          placeholder={translate('fee')}
          type='number'
          pattern='[0-9.]*'
          value={fee}
          onChange={handleOnFeeChange}
          hintAsTooltip={false}
          onKeyPress={handleOnFeePress}
        />
      </div>{' '}
      &nbsp;
      <div className='text-gray-71 text-h5-medium'>
        {translate('pslTransactionFee', { currencyName })}
      </div>
      {renderTaxFeeIntroIcon()}
    </div>
  )

  const renderPaymentHeader = () => (
    <div className='flex'>
      <div className='w-1/3'>
        <SelectAmount
          className='text-gray-2d'
          min={0}
          max={totalBalance}
          step={generateStep(totalBalance)}
          defaultValue={defaulSelectedAmount}
          onChange={handleSelectAmount}
          label={currencyName}
          forceUpdate
        />
      </div>
      <div className='flex w-1/3 pl-3 mr-5'>
        <Select
          append='%'
          label={translate('ofYourBalance')}
          labelClasses='text-base font-normal text-gray-4a mr-2 absolute left-16'
          className='text-gray-2d w-264px'
          inputClassName='text-base font-normal text-gray-4a pl-0'
          inputWrapperClassName='w-full'
          customListClassName={selectListClassName}
          autocomplete
          min={0}
          max={100}
          step={1}
          value={balance}
          onChange={handleQuickSelectAmount}
        />
      </div>
      {renderFeeInputControl()}
    </div>
  )

  const renderTransactionStatusTitle = () => (
    <th className='text-left sticky bg-white z-30 top-0 whitespace-nowrap pr-3'>
      <div className='ml-15px'>{translate('transactionStatus')}</div>
    </th>
  )

  const renderPaymentResultHeader = () => (
    <thead>
      <tr className='text-gray-4a font-extrabold font-base border-b border-opacity-50 pb-4 border-gray-a6 h-12 text-sm md:text-base'>
        {renderTransactionStatusTitle()}
        <th className='text-left sticky bg-white z-30 top-0 px-2'>
          {translate('TXID')}
        </th>
        <th className='w-[170px] text-left sticky bg-white z-30 top-0'></th>
      </tr>
    </thead>
  )

  const renderPaymentResultBody = () => (
    <tbody className='h-220px overflow-y-scroll'>
      {paymentResults.map(result => {
        const txId: string = result.txId || ''
        const message: string = result.message || ''
        return (
          <tr
            className='h-[60px] border-b border-line text-sm md:text-base'
            key={result.id}
          >
            <td className='py-1'>
              <div className='mx-15px'>{result.status}</div>
            </td>
            <td
              className={cn(
                'py-1 pl-2 text-left px-2',
                result.status === translate('success')
                  ? 'break-all'
                  : 'break-words',
              )}
            >
              {result.status === translate('success')
                ? result.txId
                : translate('errorTransactionMessage', { txId, message })}
            </td>
            <td className='py-1 text-right'>
              {result.status === translate('success') ? (
                <ViewTxIDButton txId={txId} />
              ) : null}
            </td>
          </tr>
        )
      })}
    </tbody>
  )

  return (
    <>
      <TitleModal
        isOpen
        handleClose={handleCloseModal}
        title={
          !isComplete && !isLoading
            ? translate('payment')
            : isComplete
            ? translate('paymentResult')
            : ''
        }
        classNames={cn('max-w-4xl', isLoading && 'w-[520px]')}
        hideCloseButton={isLoading}
      >
        {isComplete ? (
          <div className='mt-26px pr-22px'>
            <table className='w-full text-gray-71 relative table-auto'>
              {renderPaymentResultHeader()}
              {renderPaymentResultBody()}
            </table>
          </div>
        ) : isLoading ? (
          <div className='text-gray-800 text-2xl font-extrabold text-center pb-5px pr-8'>
            {translate('paymentLoadingMessage')}
          </div>
        ) : (
          <>
            {renderPaymentHeader()}
            <div className='pt-6px text-gray-a0 text-h6-leading-20'>
              {translate('balanceRemainingAfterPayment', {
                price: formatPrice(
                  totalBalance - psl < 0 ? 0 : totalBalance - psl,
                  currencyName,
                  4,
                ),
              })}
            </div>
            <div>
              <div className='pt-[23px] flex items-center text-gray-4a text-h5-heavy'>
                {translate('addressOfRecipient')}
                {renderAddressRecipientIntroIcon()}
              </div>
              {renderInputRecipientAddress(recipientAddressIsValid)}
            </div>
            <div className='mt-9'>
              <div className='flex border-b-[1px] border-gray-ec pb-[13px] text-gray-4a text-h5-heavy'>
                {translate('paymentSource')}
                {renderPaymentSourceIntroIcon()}
                {renderAddPaymentSourceIcon()}
              </div>
              {renderPaymentSourceList()}
            </div>
            {messages.length > 0 ? (
              <>
                {messages.map(err => (
                  <p key={err} className='pt-2 mb-1 text-red-4a'>
                    {err}
                  </p>
                ))}
              </>
            ) : null}
            <div className='flex justify-end mt-[21px]'>
              {renderCancelButton()}
              {renderConfirmPaymentButton()}
            </div>
          </>
        )}
      </TitleModal>
      <AddPaymentSourceModal
        isOpen={addPaymentSourceModalIsOpen}
        onClose={handleCloseAddPaymentSourceModal}
      />
    </>
  )
}
