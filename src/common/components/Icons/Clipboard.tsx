import React from 'react'
import { TIconProps } from './iconProps'

export type TClipboardProps = TIconProps

export function Clipboard({ size, className }: TClipboardProps): JSX.Element {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.43506 0.330078C3.3848 0.330078 2.52218 1.08166 2.52218 1.99674V8.66341C2.52218 9.57849 3.3848 10.3301 4.43506 10.3301H9.9998C11.0501 10.3301 11.9127 9.57849 11.9127 8.66341V1.99674C11.9127 1.08166 11.0501 0.330078 9.9998 0.330078H4.43506ZM4.43506 1.23917H9.9998C10.4861 1.23917 10.8693 1.57304 10.8693 1.99674V8.66341C10.8693 9.08711 10.4861 9.42099 9.9998 9.42099H4.43506C3.94876 9.42099 3.56557 9.08711 3.56557 8.66341V1.99674C3.56557 1.57304 3.94876 1.23917 4.43506 1.23917ZM1.82659 1.84523L1.40271 2.09144C1.01562 2.31629 0.783203 2.69481 0.783203 3.09996V8.96644C0.783203 10.5564 2.26238 11.8452 4.08727 11.8452H8.7336C9.19896 11.8452 9.6334 11.6427 9.89111 11.3055L10.1737 10.9361H4.08727C2.83868 10.9361 1.82659 10.0543 1.82659 8.96644V1.84523Z'
        fill='currentColor'
      />
    </svg>
  )
}
