import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import cn from 'classnames'

import PercentCircle from 'common/components/PercentCircle'
import Tooltip from 'common/components/Tooltip'
import OnboardingLayout from 'common/layout/Onboarding2'

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

import * as ROUTES from 'common/utils/constants/routes'
import styles from './Register.css'

import { Steps, useRegisterState, TRegisterData } from './Regiser.state'

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

type TRegisterContentProps = {
  closeRequested: boolean
  confirmClose(val: boolean): void
  onFinish(data: TRegisterData): void
}

const RegisterContent = (props: TRegisterContentProps): JSX.Element => {
  const state = useRegisterState()

  const onLastStepPassed = () => {
    props.onFinish({
      username: state.username,
      password: state.password,
      paymentMethod: state.paymentMethod,
      promoCode: state.promoCode,
      exchangeAddress: state.exchangeAddress,
    })
  }

  return (
    <>
      <div
        className={cn(
          'flex w-970px max-w-full h-full',
          props.closeRequested ? 'hidden' : '',
        )}
      >
        <div className='w-1/2 flex-shrink-0 bg-gray-fc py-10 pl-10 pr-7'>
          <div className='flex justify-between'>
            <div>
              <div className='text-gray-800 text-2xl font-extrabold mb-3'>
                Onboarding
              </div>
              <div className='font-medium text-sm text-gray-33 opacity-50'>
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
                <div className='flex-grow flex items-center ml-8'>
                  {item.label}
                  {state.step === item.id &&
                    item.tooltipText &&
                    item.tooltipWidth && (
                      <div className='ml-2'>
                        <Tooltip
                          classnames='text-sm py-1 px-1.5'
                          content={item.tooltipText}
                          type='top'
                          width={item.tooltipWidth}
                          hPosPercent={140}
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

      {props.closeRequested && (
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
              onClick={() => props.confirmClose(true)}
            >
              Close
            </button>
          </div>
          <div className='mt-4 text-center'>
            <button
              className='rounded-full text-sm text-gray-a6 font-medium border border-gray-a6 inline-block w-230px text-center py-3 cursor-pointer'
              onClick={() => props.confirmClose(false)}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default function Register(): JSX.Element {
  const history = useHistory()
  const [closeClicked, setCloseClicked] = useState(false)

  const onCloseClick = () => {
    setCloseClicked(!closeClicked)
  }

  const onCloseConfirmed = (val: boolean) => {
    if (val) {
      history.push(ROUTES.WELCOME_PAGE)
    } else {
      setCloseClicked(false)
    }
  }

  const onFinish = (data: TRegisterData) => {
    // save user data
    console.log(data)
    history.push(ROUTES.REGISTER_PENDING)
  }

  return (
    <OnboardingLayout
      onClose={onCloseClick}
      render={() => (
        <RegisterContent
          closeRequested={closeClicked}
          confirmClose={onCloseConfirmed}
          onFinish={onFinish}
        />
      )}
    />
  )
}
