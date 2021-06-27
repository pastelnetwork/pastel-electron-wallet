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
  let cl = ''

  // colors logic
  switch (props.strength) {
    case PasswordStrengths.Weak:
      cl = 'bg-orange-63'
      break

    case PasswordStrengths.Moderate:
      cl = 'bg-yellow-ff'
      break

    case PasswordStrengths.Good:
    case PasswordStrengths.Excellent:
      cl = 'bg-green-00'
      break
  }

  const items: string[] = []

  for (let i = 0; i < 4; i++) {
    items.push(i < props.strength ? cl : 'bg-gray-a6 opacity-20')
  }

  return (
    <div
      className={cn(
        'mt-3 grid grid-cols-4 gap-x-1.5',
        props.className ? props.className : '',
      )}
    >
      {items.map((e, i) => (
        <div key={i} className={cn('h-1.5 rounded-full ', e)}></div>
      ))}
    </div>
  )
}

export default PasswordStrength
