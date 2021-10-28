import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import cn from 'classnames'
import Tooltip from 'common/components/Tooltip'
import { CloseButton } from 'common/components/Buttons'
import {
  Download,
  CreditCard,
  Refresh,
  CircleCheck,
  Info,
  TriangleElimination,
  LongArrow,
} from 'common/components/Icons'
import CircleSteper from 'common/components/CircleSteper'
import {
  RegisterStoreProvider,
  Steps,
  stepsCount,
  useRegisterStore,
} from './Register.store'

import * as ROUTES from 'common/utils/constants/routes'
import styles from './Register.module.css'

import StepLogin from './StepRegister'
import StepBackup from './StepBackup'
import StepPayment from './StepPayment'
import StepFee from './StepFee'
import RegistrationPending from './RegistrationPending'
import { useInitializeRegister } from './Register.service'
import { TPastelIdWithTxIdAndConfirmed } from '../../../api/pastel-rpc'

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
    id: Steps.Payment,
    iconActive: CreditCard,
    label: 'Payment method',
    stepIconLabel: 'Payment method step',
    tooltipText: 'Payment method',
    tooltipWidth: 150,
  },
  {
    id: Steps.Fee,
    iconActive: Refresh,
    label: 'Registration fee',
    stepIconLabel: 'Registration fee step',
    tooltipText: 'Registration fee',
    tooltipWidth: 150,
  },
  {
    id: Steps.Backup,
    iconActive: Download,
    label: 'Backup access method',
    stepIconLabel: 'Backup access method step',
    tooltipText: 'Backup access method',
    tooltipWidth: 150,
  },
]

const RegisterContent = () => {
  const history = useHistory()
  const [closeRequested, setCloseRequested] = useState(false)

  const step = useRegisterStore(state => state.step)

  if (step === Steps.ProcessingFee) {
    return <RegistrationPending />
  }

  const confirmClose = (val: boolean) => {
    if (val) {
      history.push(ROUTES.WELCOME_PAGE)
    } else {
      setCloseRequested(false)
    }
  }

  return (
    <>
      <CloseButton
        className='absolute top-6 right-6 w-7 h-7'
        onClick={() => {
          setCloseRequested(true)
        }}
      />
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
                totalStep={stepsCount}
                spaceAngle={10}
                currentStep={step}
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
                    step === id ? 'bg-gray-ed' : '',
                  )}
                >
                  {step <= id ? (
                    <Component
                      size={44}
                      className={step === id ? 'text-gray-33' : 'text-gray-ec'}
                      pathColor={step === id ? '#FFFFFF' : '#8894AA'}
                    />
                  ) : (
                    <CircleCheck size={40} className='text-green-45 ml-1' />
                  )}
                  <div
                    className={cn(
                      'flex-grow flex items-center ml-8 text-lg',
                      step === id
                        ? 'font-extrabold text-gray-2d'
                        : step < id
                        ? 'font-medium text-gray-a0'
                        : 'font-medium text-gray-4a',
                    )}
                  >
                    <span>{label}</span>
                    {step === id && tooltipText && tooltipWidth && (
                      <div className='inline-block mx-2'>
                        <Tooltip
                          classnames='font-medium py-2'
                          content={tooltipText}
                          type='top'
                          width={tooltipWidth}
                          vPosPercent={100}
                        >
                          <Info size={17} />
                        </Tooltip>
                      </div>
                    )}
                  </div>

                  {step === id && (
                    <LongArrow size={20} className='text-gray-88' />
                  )}
                </div>
              ),
            )}
          </div>
        </div>

        <div className='w-1/2 flex-shrink-0 pb-10 pl-10 pr-7 mt-7'>
          {step === Steps.Login && <StepLogin />}
          {step === Steps.Payment && <StepPayment />}
          {step === Steps.Fee && <StepFee />}
          {step === Steps.Backup && <StepBackup />}
        </div>
      </div>

      {closeRequested && (
        <div className='p-11 w-494px'>
          <div className='text-center'>
            <TriangleElimination
              size={44}
              className='text-red-fe inline-block'
            />
          </div>
          <div className='mt-27px text-center text-h5 leading-6 font-medium text-gray-4a'>
            Are you sure you want to close the wizard
            <br /> and return to the home screen?
          </div>
          <div className='mt-4 text-center'>
            <button
              className='rounded-full text-sm font-medium text-white bg-red-fe inline-block w-[232px] text-center py-6px cursor-pointer'
              onClick={() => confirmClose(true)}
            >
              Close
            </button>
          </div>
          <div className='mt-4 text-center'>
            <button
              className='rounded-full text-sm text-gray-a6 font-medium border border-gray-a6 inline-block w-[232px] text-center py-6px cursor-pointer'
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

export default function Register({
  fetchedPastelId,
}: {
  fetchedPastelId?: TPastelIdWithTxIdAndConfirmed
}): JSX.Element {
  const store = useInitializeRegister({ fetchedPastelId })

  return (
    <RegisterStoreProvider createStore={() => store}>
      <RegisterContent />
    </RegisterStoreProvider>
  )
}
