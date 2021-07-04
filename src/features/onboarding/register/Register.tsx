import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import cn from 'classnames'

import PercentCircle from 'common/components/PercentCircle'
import Tooltip from 'common/components/Tooltip'

import icoExclamation from 'common/assets/icons/ico-exclamation.svg'
import creditCardIco from 'common/assets/icons/ico-credit-card.svg'
import creditCardIcoGray from 'common/assets/icons/ico-credit-card-gray.svg'
import downloadIco from 'common/assets/icons/ico-download.svg'
import downloadIcoGray from 'common/assets/icons/ico-download-gray.svg'
import refreshIco from 'common/assets/icons/ico-refresh.svg'
import refreshIcoGray from 'common/assets/icons/ico-refresh-gray.svg'
import icoArrowRight from 'common/assets/icons/ico-arrow-right.svg'
import completedIco from 'common/assets/icons/ico-completed.svg'
import infoIco from 'common/assets/icons/ico-info.svg'
import closeIcon from 'common/assets/icons/ico-close.svg'

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
    iconActive: downloadIco,
    iconDefault: downloadIcoGray,
    label: 'Primary login',
    stepIconLabel: 'primary login step',
    tooltipText: 'Primary login tooltip',
    tooltipWidth: 150,
  },
  {
    id: Steps.Backup,
    iconActive: downloadIco,
    iconDefault: downloadIcoGray,
    label: 'Backup access method',
    stepIconLabel: 'Backup access method step',
    tooltipText: 'Backup access tooltip',
    tooltipWidth: 150,
  },
  {
    id: Steps.Payment,
    iconActive: creditCardIco,
    iconDefault: creditCardIcoGray,
    label: 'Payment method',
    stepIconLabel: 'Payment method step',
    tooltipText: 'Payment method tooltip',
    tooltipWidth: 150,
  },
  {
    id: Steps.Fee,
    iconActive: refreshIco,
    iconDefault: refreshIcoGray,
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
    /*
      process user data
      state.username,
      state.password,
      state.paymentMethod,
      state.promoCode,
      state.exchangeAddress,
    */

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
              <PercentCircle
                color='text-green-6d'
                percent={Math.round(100 * (state.step / state.stepsCount))}
              >
                <div className='font-extrabold text-gray-11 text-lg mt-1'>
                  {state.step}/{state.stepsCount}
                </div>
              </PercentCircle>
            </div>
          </div>
          <div className='mt-7'>
            {STEPS.map(item => (
              <div
                key={item.id}
                className={cn(
                  'rounded-lg flex items-center px-8 py-3 step',
                  styles.step,
                  state.step === item.id ? 'bg-gray-ed' : '',
                )}
              >
                {state.step <= item.id ? (
                  <img
                    src={
                      state.step === item.id
                        ? item.iconActive
                        : item.iconDefault
                    }
                    alt={item.stepIconLabel}
                  />
                ) : (
                  <img
                    src={completedIco}
                    alt={`Step ${item.id} completed`}
                    className='ml-1'
                  />
                )}
                <div
                  className={cn(
                    'flex-grow flex items-center ml-8 text-lg',
                    state.step === item.id
                      ? 'font-black text-gray-23'
                      : 'font-medium text-gray-a0',
                  )}
                >
                  <span>{item.label}</span>
                  {state.step === item.id &&
                    item.tooltipText &&
                    item.tooltipWidth && (
                      <div className='inline-block mx-2'>
                        <Tooltip
                          classnames='font-medium'
                          content={item.tooltipText}
                          type='top'
                          width={item.tooltipWidth}
                          vPosPercent={140}
                        >
                          <img className='w-5' src={infoIco} alt='info' />
                        </Tooltip>
                      </div>
                    )}
                </div>

                {state.step === item.id && (
                  <img className='w-4' src={icoArrowRight} alt='active step' />
                )}
              </div>
            ))}
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
