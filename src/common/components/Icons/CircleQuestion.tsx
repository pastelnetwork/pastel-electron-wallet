import React from 'react'
import cn from 'classnames'

export type TCircleQuestionProps = {
  size?: number
  className?: string
  hasNotification?: boolean
}

export const CircleQuestion = ({
  size = 18,
  className = 'text-gray-33',
  hasNotification = false,
}: TCircleQuestionProps): JSX.Element => {
  return (
    <div className={cn(className, 'relative')}>
      {hasNotification && (
        <div className='absolute -top-px -right-px w-2 h-2 rounded-full bg-orange-63 border border-white' />
      )}
      <svg
        width={size}
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M8.94336 0.818359C4.46582 0.818359 0.818359 4.46582 0.818359 8.94336C0.818359 13.4209 4.46582 17.0684 8.94336 17.0684C13.4209 17.0684 17.0684 13.4209 17.0684 8.94336C17.0684 4.46582 13.4209 0.818359 8.94336 0.818359ZM8.94336 2.06836C12.7471 2.06836 15.8184 5.13965 15.8184 8.94336C15.8184 12.7471 12.7471 15.8184 8.94336 15.8184C5.13965 15.8184 2.06836 12.7471 2.06836 8.94336C2.06836 5.13965 5.13965 2.06836 8.94336 2.06836ZM9.0166 4.56836C7.50293 4.65625 6.26758 5.92578 6.26758 7.46875H7.51758C7.51758 6.45313 8.39648 5.65723 9.4707 5.84277C10.2373 5.97461 10.8428 6.72656 10.8184 7.51758C10.7988 8.21094 10.3936 8.65039 9.79785 8.91406C9.42676 9.08008 9.0752 9.23633 8.77734 9.54883C8.47949 9.86133 8.31836 10.3252 8.31836 10.8184H9.56836C9.56836 10.5352 9.60742 10.4912 9.68555 10.4082C9.75879 10.3301 9.96387 10.208 10.3008 10.0566C11.2334 9.65137 12.0342 8.75781 12.0684 7.55664C12.1123 6.13574 11.0918 4.85156 9.68066 4.60742C9.45605 4.57324 9.23145 4.55859 9.0166 4.56836ZM8.31836 12.0684V13.3184H9.56836V12.0684H8.31836Z'
          fill='currentColor'
        />
      </svg>
    </div>
  )
}
