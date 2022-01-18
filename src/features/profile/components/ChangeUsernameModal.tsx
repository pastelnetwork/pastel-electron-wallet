import React, { useCallback, useState } from 'react'
import cn from 'classnames'
import NumberFormat from 'react-number-format'

import { getCurrentAccount } from 'common/utils/User'
import { Button } from 'common/components/Buttons'
import { Fire } from 'common/components/Icons/Fire'
import { useCurrencyName } from 'common/hooks/appInfo'
import { useTotalBalance, checkPastelIdUsername } from 'api/pastel-rpc'

import Modal from '../../nft/nftModals/modal'
import Input from '../../../common/components/Inputs/Input'

export type TChangeUsernameModal = {
  isOpen: boolean
  handleClose: () => void
}

const FEE = 5000

function ChangeUsernameModal({
  isOpen,
  handleClose,
}: TChangeUsernameModal): JSX.Element {
  const currentUsername = getCurrentAccount()
  const currencyName = useCurrencyName()
  const [username, setUsername] = useState<string>('')
  const [inputed, setInputed] = useState<boolean>(false)
  const { data: balance } = useTotalBalance()
  const [errorMsg, setErrorMsg] = useState('')
  const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false)

  const validateUserName = (username: string) => {
    const validationRe = /^[0-9a-z_]{3,}$/i
    return validationRe.test(username)
  }

  const handleNewUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value)
      setInputed(true)
      setUsernameInvalid(!validateUserName(e.target.value))
    },
    [username],
  )

  const handleChangeUsername = useCallback(async () => {
    setErrorMsg('')
    setUsernameInvalid(false)
    const validation = await checkPastelIdUsername({ username: username })
    if (validation.isBad) {
      setErrorMsg(validation.validationError)
      setUsernameInvalid(true)
      return
    }

    // TODO: call API save data
  }, [username])

  const onCloseModal = useCallback(() => {
    handleClose()
  }, [])

  const renderSubmitButtonBlock = () => (
    <div className='mt-7 mb-2'>
      <Button
        variant='default'
        type='submit'
        className={`w-full bg-blue-3f ${
          !validateUserName(username) ? 'bg-opacity-50' : ''
        }`}
        disabled={!balance || balance.total < FEE || !username}
        onClick={handleChangeUsername}
      >
        <span className='text-white font-medium text-sm'>
          Submit Username Change Request
        </span>
      </Button>
    </div>
  )

  const renderCurrentBalance = () => (
    <div className='flex justify-between items-center'>
      <div className='text-gray-a0 text-sm'>
        Your Current {currencyName} Balance
      </div>
      <div className='text-gray-a0 text-sm font-extrabold'>
        <NumberFormat
          value={
            balance ? parseFloat(balance.total.toString()).toFixed(0) : '0'
          }
          displayType='text'
          thousandSeparator
        />{' '}
        {currencyName}
      </div>
    </div>
  )

  const renderFireIcon = () => (
    <div className='mr-[9px]'>
      <Fire size={18} />
    </div>
  )

  const renderUsernameChangeFee = () => (
    <div className='flex justify-between items-center mt-2.5'>
      <div className='text-gray-a0 text-sm'>Username Change Fee (burned)</div>
      <div className='text-gray-a0 text-sm font-extrabold flex items-center'>
        {renderFireIcon()}
        <NumberFormat value={FEE} displayType='text' thousandSeparator />{' '}
        {currencyName}
      </div>
    </div>
  )

  const renderRemainingBalance = () => {
    const remainingBalance = balance ? (balance.total - FEE).toFixed(0) : 0
    return (
      <div className='flex justify-between items-center mt-2.5'>
        <div className='text-gray-a0 text-sm'>
          Remaining Balance after Change
        </div>
        <div className='text-gray-a0 text-sm font-extrabold'>
          <NumberFormat
            value={remainingBalance}
            displayType='text'
            thousandSeparator
          />{' '}
          {currencyName}
        </div>
      </div>
    )
  }

  const renderNewUsernameInput = () => {
    let usernameIsValid = null
    if (username.length > 0 && usernameInvalid) {
      usernameIsValid = false
    }

    return (
      <div className='mt-6'>
        <Input
          appliedStyleValid={false}
          value={username}
          onChange={handleNewUsernameChange}
          placeholder='New Username'
          hintClassName={cn(`${!inputed ? 'font-normal' : 'font-medium'}`)}
          hint={
            !inputed
              ? 'Only Latin Characters and Numbers Allowed'
              : validateUserName(username)
              ? ''
              : 'Please enter a valid user name'
          }
          type='text'
          label='New Username'
          labelClassName='inline-block text-gray-71 text-base font-medium pb-1.5'
          isValid={usernameIsValid}
          errorMessage={
            usernameInvalid && username
              ? errorMsg || 'Please enter a valid username'
              : null
          }
          hintAsTooltip
        />
      </div>
    )
  }

  const renderCurrentUsernameInput = () => {
    const username: string = currentUsername?.username
      ? `@${currentUsername?.username}`
      : ''
    return (
      <div className='mt-6'>
        <Input
          placeholder={username}
          type='text'
          disabled
          label='Current Username'
          labelClassName='inline-block text-gray-71 text-base font-medium pb-1.5'
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onCloseModal}
      size='492px'
      title={'Change your Pastel Username'}
      titleClassName='text-2xl mt-2 font-extrabold text-gray-2d'
      infoIcon={false}
    >
      <div className='w-[412px]'>
        <div className='text-base font-normal text-gray-4a pr-[7px]'>
          Your PastelID Identifier will always stay the same, but you are
          allowed to change your Pastel username. The network charges a fee for
          this to prevent abuse.
        </div>
        {renderCurrentUsernameInput()}
        {renderNewUsernameInput()}
        <div className='pt-6'>
          {renderCurrentBalance()}
          {renderUsernameChangeFee()}
          {renderRemainingBalance()}
          {renderSubmitButtonBlock()}
        </div>
      </div>
    </Modal>
  )
}

export default ChangeUsernameModal
