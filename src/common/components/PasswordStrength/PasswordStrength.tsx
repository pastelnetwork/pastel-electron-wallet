import React from 'react'
import cn from 'classnames'

export enum PasswordStrengths {
  EmptyPassword,
  Weak,
  Moderate,
  Good,
  Excellent,
}

export type TPasswordStrengthProps = {
  strength: PasswordStrengths
  className?: string
}

type TSegmentsClassesProps = {
  id: number
  class: string
}

export default function PasswordStrength({
  strength,
  className,
}: TPasswordStrengthProps): JSX.Element {
  let colorClass = ''

  // colors logic
  switch (strength) {
    case PasswordStrengths.Weak:
      colorClass = 'bg-red-fe'
      break

    case PasswordStrengths.Good:
    case PasswordStrengths.Moderate:
      colorClass = 'bg-yellow-ff'
      break

    case PasswordStrengths.Excellent:
      colorClass = 'bg-green-00'
      break
  }

  const segmentsClasses: TSegmentsClassesProps[] = []

  for (let i = 0; i < 4; i++) {
    segmentsClasses.push({
      id: i,
      class: i < strength ? colorClass : 'bg-gray-a6 opacity-20',
    })
  }

  return (
    <div
      className={cn(
        'mt-3 grid grid-cols-4 gap-x-1.5',
        className ? className : '',
      )}
    >
      {segmentsClasses.map(segClass => (
        <div
          key={segClass.id}
          className={cn('h-1.5 rounded-full ', segClass.class)}
        ></div>
      ))}
    </div>
  )
}
