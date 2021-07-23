import React from 'react'
import { TIconProps } from './iconProps'

type TDir = 'top' | 'right' | 'bottom' | 'left'

export type TArrowSlimProps = TIconProps & {
  to?: TDir
}

const rotate: Record<TDir, number> = {
  top: 90,
  right: 180,
  bottom: -90,
  left: 0,
}

export const ArrowSlim = ({
  size,
  to = 'right',
  className,
}: TArrowSlimProps): JSX.Element => {
  const style = { transform: `rotate(${rotate[to]}deg)` }

  return (
    <svg
      width={size}
      style={style}
      className={className}
      viewBox='0 0 14 9'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.90906 8.73479C4.50324 9.1094 3.87058 9.0841 3.49597 8.67828L0.265202 5.17832C-0.0883959 4.79526 -0.0883996 4.20482 0.265194 3.82176L3.49597 0.321716C3.87057 -0.0841062 4.50323 -0.109416 4.90905 0.265186C5.31487 0.639787 5.34018 1.27245 4.96558 1.67827L3.28397 3.50003L13 3.50003C13.5523 3.50003 14 3.94775 14 4.50003C14 5.05232 13.5523 5.50003 13 5.50003L3.28401 5.50003L4.96557 7.32171C5.34018 7.72753 5.31487 8.36019 4.90906 8.73479Z'
        fill='currentColor'
      />
    </svg>
  )
}
