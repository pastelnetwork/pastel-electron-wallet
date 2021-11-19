import React, { useState } from 'react'
import Modal from '../../nft/nftModals/modal'
import Input from '../../../common/components/Inputs/Input'
import NumberFormat from 'react-number-format'
import { Button } from 'common/components/Buttons'
import { Fire } from 'common/components/Icons/Fire'
import cn from 'classnames'
import { useCurrencyName } from 'common/hooks/appInfo'

export type TChangeUsernameModal = {
  isOpen: boolean
  handleClose: () => void
}

function ChangeUsernameModal({
  isOpen,
  handleClose,
}: TChangeUsernameModal): JSX.Element {
  const currencyName = useCurrencyName()
  const [username, setUsername] = useState<string>('')
  const [inputed, setInputed] = useState<boolean>(false)

  const validateUserName = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/
    return usernameRegex.test(username)
  }

  const renderSubmitButtonBlock = () => (
    <div className='mt-7 mb-2'>
      <Button
        variant='default'
        type='submit'
        className={`w-full bg-blue-3f ${
          !validateUserName(username) ? 'bg-opacity-50' : ''
        }`}
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
        <NumberFormat value={25000} displayType='text' thousandSeparator />{' '}
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
        <NumberFormat value={5000} displayType='text' thousandSeparator />{' '}
        {currencyName}
      </div>
    </div>
  )

  const renderRemainingBalance = () => (
    <div className='flex justify-between items-center mt-2.5'>
      <div className='text-gray-a0 text-sm'>Remaining Balance after Change</div>
      <div className='text-gray-a0 text-sm font-extrabold'>
        <NumberFormat value={20000} displayType='text' thousandSeparator />{' '}
        {currencyName}
      </div>
    </div>
  )

  const renderNewUsernameInput = () => (
    <div className='mt-6'>
      <Input
        appliedStyleValid={false}
        value={username}
        isValid={!inputed || validateUserName(username)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value)
          setInputed(true)
        }}
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
      />
    </div>
  )

  const renderCurrentUsernameInput = () => (
    <div className='mt-6'>
      <Input
        placeholder='@MrVanGogh'
        type='text'
        disabled
        label='Current Username'
        labelClassName='inline-block text-gray-71 text-base font-medium pb-1.5'
      />
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
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
