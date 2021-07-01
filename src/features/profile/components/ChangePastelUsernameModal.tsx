import React, { useState } from 'react'
import SVG from 'react-inlinesvg'

import LineEdit from './LineEdit'
import Modal from 'common/components/AnimatedModal'
import { Button } from 'common/components/Buttons'
import ico_fire from 'common/assets/icons/ico-fire.svg'

type TChangePastelUsernameModalProps = {
  modalIsOpen: boolean
  onCloseModal: (val: boolean) => void
}

export default function ChangePastelUsernameModal({
  modalIsOpen,
  onCloseModal,
}: TChangePastelUsernameModalProps): JSX.Element {
  const [currentUsername, setCurrentUsername] = useState<string>('@MrVanGogh')
  const [newUsername, setNewUsername] = useState<string>('')
  const [isValid, setIsValid] = useState(true)

  const validate = (value: string) => {
    if (!value) {
      return false
    }

    const pattern = /^[0-9a-zA-Z]+$/
    return value.match(pattern)
  }

  const handleInputChange = (value: string) => {
    setNewUsername(value)
    if (!validate(value)) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  const handleSubmit = () => {
    if (newUsername && isValid) {
      //TODO
    }
  }

  return (
    <Modal
      open={modalIsOpen}
      onClose={() => onCloseModal(false)}
      closeButton
      render={() => (
        <div className='paper p-10 w-[492px] rounded-15px shadow-modal'>
          <div className='pt-2px'>
            <div className='text-gray-2d text-2xl font-extrabold'>
              Change your Pastel Username
            </div>
            <div className='font-normal text-base text-gray-4a mt-6'>
              Your PastelID Identifier will always stay the same, but you are
              allowed to change your Pastel username. The network charges a fee
              for this to prevent abuse.
            </div>
            <div className='mt-6'>
              <div>
                <div className='text-gray-4a mb-6px text-base font-medium'>
                  Current Username
                </div>
                <LineEdit
                  value={currentUsername}
                  onChange={setCurrentUsername}
                  readOnly
                  hideCloseIcon
                  inputClassName='rounded-4px'
                  className='rounded-4px'
                />
              </div>
              <div className='mt-6'>
                <div className='text-gray-4a mb-6px text-base font-medium'>
                  New Username
                </div>
                <LineEdit
                  value={newUsername}
                  onChange={handleInputChange}
                  hideCloseIcon
                  inputClassName=' text-gray-35'
                  className='rounded-4px'
                />
                {!newUsername ? (
                  <p className='text-xs leading-5 italic font-normal text-gray-a0 mb-0 mt-1'>
                    Only Latin Characters and Numbers Allowed
                  </p>
                ) : null}
                {!isValid && newUsername ? (
                  <p className='text-xs leading-5 font-medium text-red-fe mb-0 mt-1'>
                    Please enter a valid user name.
                  </p>
                ) : null}
              </div>
            </div>
            <div className='mt-5 opacity-50'>
              <div className='flex justify-between text-sm'>
                <div className='font-normal text-gray-4a'>
                  Your Current PSL Balance
                </div>
                <div className='font-extrabold text-gray-2d'>25,000 PSL</div>
              </div>
              <div className='flex justify-between text-sm mt-10px'>
                <div className='font-normal text-gray-4a'>
                  Username Change Fee (burned)
                </div>
                <div className='font-extrabold text-gray-2d flex items-center'>
                  <SVG src={ico_fire} className='mr-6px' />
                  5,000 PSL
                </div>
              </div>
              <div className='flex justify-between text-sm mt-10px'>
                <div className='font-normal text-gray-4a'>
                  Remaining Balance after Change
                </div>
                <div className='font-extrabold text-gray-2d'>20,000 PSL</div>
              </div>
            </div>
            <div className='mt-28px'>
              <Button
                variant='default'
                className={`w-full ${
                  !newUsername || !isValid ? 'opacity-50' : ''
                }`}
                onClick={handleSubmit}
              >
                <span className='text-sm leading-4 font-black'>
                  Submit Username Change Request
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    />
  )
}
