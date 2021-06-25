import * as React from 'react'
import { X } from 'common/components/Icons'

export type TOnboardingLayoutProps = {
  onClose?(): void
  render(): React.ReactNode
}

const OnboardingLayout = (props: TOnboardingLayoutProps): JSX.Element => {
  return (
    <div className='fixed inset-0 z-10 bg-gray-1a bg-opacity-60 flex-center'>
      <div className='relative paper overflow-hidden max-h-11/12 max-w-11/12'>
        <button
          className='absolute top-6 right-6 flex-center w-7 h-7 rounded-md transition duration-200 text-gray-b0 hover:text-gray-8e border border-gray-8e border-opacity-30 hover:border-opacity-40 z-20'
          onClick={props.onClose}
        >
          <X size={8} />
        </button>
        {props.render()}
      </div>
    </div>
  )
}

export default OnboardingLayout
