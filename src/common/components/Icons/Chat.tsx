import React from 'react'

export type TChatProps = {
  className?: string
  size: number
  clickHandler?: (event: React.MouseEvent<SVGSVGElement>) => void
}

export default function Arrow({
  className,
  size,
  clickHandler,
}: TChatProps): JSX.Element {
  return (
    <svg
      width={size}
      className={className}
      onClick={clickHandler}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      role='a'
    >
      <circle
        cx='16'
        cy='16'
        r='15.5'
        stroke='#E4E4E4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16 10C12.7 10 10 12.325 10 15.25C10 18.175 12.7 20.5 16 20.5C16.3 20.5 16.6 20.5 16.825 20.425L20.5 22V18.7C21.4 17.8 22 16.6 22 15.25C22 12.325 19.3 10 16 10Z'
        fill='currentColor'
      />
    </svg>
  )
}
