import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import cn from 'classnames'
import Tooltip from 'common/components/Tooltip'

import icoExclamation from 'common/assets/icons/ico-exclamation.svg'
import icoArrowRight from 'common/assets/icons/ico-arrow-right.svg'
import infoIco from 'common/assets/icons/ico-info.svg'
import closeIcon from 'common/assets/icons/ico-close.svg'

import {
  Download,
  CreditCard,
  Refresh,
  CircleCheck,
} from 'common/components/Icons'
import CircleSteper from 'common/components/CircleSteper'

import * as ROUTES from 'common/utils/constants/routes'
import styles from './Register.module.css'

import { Steps, useRegisterState } from './Regiser.state'

import StepLogin from './StepRegister'
import StepBackup from './StepBackup'
import StepPayment from './StepPayment'
import StepFee from './StepFee'

const STEPS = [
  {
    id: Steps.Login,
    iconActive: Download,
    label: 'Primary login',
    stepIconLabel: 'primary login step',
    tooltipText: 'Primary login',
    tooltipWidth: 88,
  },
  {
    id: Steps.Backup,
    iconActive: Download,
    label: 'Backup access method',
    stepIconLabel: 'Backup access method step',
    tooltipText: 'Backup access tooltip',
    tooltipWidth: 150,
  },
  {
    id: Steps.Payment,
    iconActive: CreditCard,
    label: 'Payment method',
    stepIconLabel: 'Payment method step',
    tooltipText: 'Payment method tooltip',
    tooltipWidth: 150,
  },
  {
    id: Steps.Fee,
    iconActive: Refresh,
    label: 'Registration fee',
    stepIconLabel: 'Registration fee step',
    tooltipText: 'Registration fee tooltip',
    tooltipWidth: 150,
  },
]

const RegisterContent = (): JSX.Element => {
  const history = useHistory()
  const [closeRequested, setCloseRequested] = useState(false)
  const state = useRegisterState()

  const confirmClose = (val: boolean) => {
    if (val) {
      history.push(ROUTES.WELCOME_PAGE)
    } else {
      setCloseRequested(false)
    }
  }

  const onLastStepPassed = () => {
    history.push(ROUTES.REGISTER_PENDING)
  }

  return (
    <>
      <button
        className='absolute flex justify-center items-center top-6 right-6 w-7 h-7 box-border rounded-lg bg-whte border border-gray'
        onClick={() => setCloseRequested(true)}
      >
        <img src={closeIcon} alt='close icon' className='cursor-pointer' />
      </button>
      <div
        className={cn(
          'flex w-970px max-w-full max-h-full',
          closeRequested ? 'hidden' : 'h-600px',
        )}
      >
        <div className='w-1/2 flex-shrink-0 bg-gray-fc py-10 pl-10 pr-7'>
          <div className='flex justify-between'>
            <div>
              <div className='text-gray-800 text-32px font-extrabold'>
                Onboarding
              </div>
              <div className='font-medium text-sm text-gray-93 opacity-50 mt-1'>
                Getting Started on Pastel Network
              </div>
            </div>
            <div>
              <CircleSteper
                size={65}
                totalStep={state.stepsCount}
                spaceAngle={10}
                currentStep={state.step}
              />
            </div>
          </div>
          <div className='mt-7'>
            {STEPS.map(
              ({
                id,
                iconActive: Component,
                label,
                tooltipText,
                tooltipWidth,
              }) => (
                <div
                  key={id}
                  className={cn(
                    'rounded-lg flex items-center px-8 py-3 step',
                    styles.step,
                    state.step === id ? 'bg-gray-ed' : '',
                  )}
                >
                  {state.step <= id ? (
                    <Component
                      width={44}
                      height={44}
                      className={
                        state.step === id ? 'text-gray-33' : 'text-gray-ec'
                      }
                      pathColor={state.step === id ? 'white' : '#8894AA'}
                    />
                  ) : (
                    <CircleCheck
                      width={40}
                      height={40}
                      className='text-green-45 ml-1'
                    />
                  )}
                  <div
                    className={cn(
                      'flex-grow flex items-center ml-8 text-lg',
                      state.step === id
                        ? 'font-black text-gray-23'
                        : 'font-medium text-gray-a0',
                    )}
                  >
                    <span>{label}</span>
                    {state.step === id && tooltipText && tooltipWidth && (
                      <div className='inline-block mx-2'>
                        <Tooltip
                          classnames='font-medium py-2'
                          content={tooltipText}
                          type='top'
                          width={tooltipWidth}
                          vPosPercent={100}
                        >
                          <img className='w-5' src={infoIco} alt='info' />
                        </Tooltip>
                      </div>
                    )}
                  </div>

                  {state.step === id && (
                    <img
                      className='w-4'
                      src={icoArrowRight}
                      alt='active step'
                    />
                  )}
                </div>
              ),
            )}
          </div>
        </div>

        <div className='w-1/2 flex-shrink-0 pb-10 pl-10 pr-7 mt-7'>
          {state.step === Steps.Login && <StepLogin {...state} />}
          {state.step === Steps.Backup && <StepBackup {...state} />}
          {state.step === Steps.Payment && <StepPayment {...state} />}
          {state.step === Steps.Fee && (
            <StepFee {...state} finish={onLastStepPassed} />
          )}
        </div>
      </div>

      {closeRequested && (
        <div className='p-11 w-494px'>
          <div className='text-center'>
            <img src={icoExclamation} className='w-10 inline-block' />
          </div>
          <div className='mt-7 text-center'>
            Are you sure you want to close the wizard
            <br /> and return to the home screen?
          </div>
          <div className='mt-5 text-center'>
            <button
              className='rounded-full text-sm font-medium text-white bg-orange-63 inline-block w-230px text-center py-3 cursor-pointer'
              onClick={() => confirmClose(true)}
            >
              Close
            </button>
          </div>
          <div className='mt-4 text-center'>
            <button
              className='rounded-full text-sm text-gray-a6 font-medium border border-gray-a6 inline-block w-230px text-center py-3 cursor-pointer'
              onClick={() => confirmClose(false)}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default RegisterContent
