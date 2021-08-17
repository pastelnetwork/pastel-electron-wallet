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

const PasswordStrength = (props: TPasswordStrengthProps): JSX.Element => {
  let colorClass = ''

  // colors logic
  switch (props.strength) {
    case PasswordStrengths.Weak:
      colorClass = 'bg-red-fe'
      break

    case PasswordStrengths.Moderate:
      colorClass = 'bg-yellow-ff'
      break

    case PasswordStrengths.Good:
    case PasswordStrengths.Excellent:
      colorClass = 'bg-green-00'
      break
  }

  const segmentsClasses: string[] = []

  for (let i = 0; i < 4; i++) {
    segmentsClasses.push(
      i < props.strength ? colorClass : 'bg-gray-a6 opacity-20',
    )
  }

  return (
    <div
      className={cn(
        'mt-3 grid grid-cols-4 gap-x-1.5',
        props.className ? props.className : '',
      )}
    >
      {segmentsClasses.map((segClass, i) => (
        <div key={i} className={cn('h-1.5 rounded-full ', segClass)}></div>
      ))}
    </div>
  )
}

export default PasswordStrength
