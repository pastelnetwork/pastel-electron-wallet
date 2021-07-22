import React from 'react'

export type TQuestionLogoProps = {
  size?: number
  className?: string
}

export const QuestionLogo = ({
  size = 36,
  className = 'text-gray-2d',
}: TQuestionLogoProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 36 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.2871 11.4985V11.5606C20.4883 11.7522 21.409 12.7954 21.409 14.0498C21.409 15.3039 20.4883 16.3471 19.2871 16.5387V16.617H15.3055V27.636L18.4973 30.8281L18.4946 19.7904L18.8929 19.7898C22.0557 19.7876 24.6289 17.2125 24.6289 14.0498C24.6289 10.9132 22.0774 8.3385 18.9413 8.30996L18.8644 8.30948H11.9346L15.1237 11.4985H19.2871Z'
        fill='currentColor'
      />
      <path
        d='M18 2.45377C26.5721 2.45377 33.5462 9.42765 33.5462 17.9999C33.5462 26.5722 26.5721 33.5463 18 33.5463C9.42765 33.5463 2.45374 26.5722 2.45374 17.9999C2.45374 9.42765 9.42765 2.45377 18 2.45377ZM18 36C27.9252 36 36 27.9251 36 17.9999C36 8.07477 27.9252 0 18 0C8.07477 0 0 8.07477 0 17.9999C0 27.9251 8.07477 36 18 36Z'
        fill='currentColor'
      />
    </svg>
  )
}
