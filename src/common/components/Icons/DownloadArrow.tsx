import React from 'react'

export type TDownloadArrowProps = {
  size?: number
  className?: string
}

export function DownloadArrow({
  size = 24,
  className = 'text-blue-3f',
}: TDownloadArrowProps): JSX.Element {
  return (
    <svg
      width={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <mask
        id='path-1-outside-1'
        maskUnits='userSpaceOnUse'
        x='3.36523'
        y='3'
        width='17'
        height='18'
        fill='#000000'
      >
        <rect fill='#FFFFFF' x='3.36523' y='3' width='17' height='18' />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M11.3654 15.293V4.5C11.3654 4.22386 11.5893 4 11.8654 4C12.1415 4 12.3654 4.22386 12.3654 4.5V15.293L15.5114 12.146C15.7069 11.9505 16.0239 11.9505 16.2194 12.146C16.4149 12.3415 16.4149 12.6585 16.2194 12.854L12.2194 16.854C12.1256 16.948 11.9982 17.0009 11.8654 17.0009C11.7326 17.0009 11.6052 16.948 11.5114 16.854L7.5114 12.854C7.31589 12.6585 7.31589 12.3415 7.5114 12.146C7.70691 11.9505 8.02389 11.9505 8.2194 12.146L11.3654 15.293ZM4.86523 20C4.58909 20 4.36523 19.7761 4.36523 19.5C4.36523 19.2239 4.58909 19 4.86523 19H18.8652C19.1414 19 19.3652 19.2239 19.3652 19.5C19.3652 19.7761 19.1414 20 18.8652 20H4.86523Z'
        />
      </mask>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.3654 15.293V4.5C11.3654 4.22386 11.5893 4 11.8654 4C12.1415 4 12.3654 4.22386 12.3654 4.5V15.293L15.5114 12.146C15.7069 11.9505 16.0239 11.9505 16.2194 12.146C16.4149 12.3415 16.4149 12.6585 16.2194 12.854L12.2194 16.854C12.1256 16.948 11.9982 17.0009 11.8654 17.0009C11.7326 17.0009 11.6052 16.948 11.5114 16.854L7.5114 12.854C7.31589 12.6585 7.31589 12.3415 7.5114 12.146C7.70691 11.9505 8.02389 11.9505 8.2194 12.146L11.3654 15.293ZM4.86523 20C4.58909 20 4.36523 19.7761 4.36523 19.5C4.36523 19.2239 4.58909 19 4.86523 19H18.8652C19.1414 19 19.3652 19.2239 19.3652 19.5C19.3652 19.7761 19.1414 20 18.8652 20H4.86523Z'
        fill='currentColor'
      />
      <path
        d='M11.3654 15.293L11.224 15.4344L11.5654 15.776V15.293H11.3654ZM12.3654 15.293H12.1654V15.776L12.5068 15.4344L12.3654 15.293ZM15.5114 12.146L15.37 12.0046L15.37 12.0046L15.5114 12.146ZM16.2194 12.854L16.3608 12.9954L16.2194 12.854ZM12.2194 16.854L12.078 16.7126L12.0778 16.7128L12.2194 16.854ZM11.5114 16.854L11.653 16.7128L11.6528 16.7126L11.5114 16.854ZM7.5114 12.854L7.36998 12.9954L7.5114 12.854ZM8.2194 12.146L8.36084 12.0046L8.36082 12.0046L8.2194 12.146ZM11.5654 15.293V4.5H11.1654V15.293H11.5654ZM11.5654 4.5C11.5654 4.33431 11.6997 4.2 11.8654 4.2V3.8C11.4788 3.8 11.1654 4.1134 11.1654 4.5H11.5654ZM11.8654 4.2C12.0311 4.2 12.1654 4.33431 12.1654 4.5H12.5654C12.5654 4.1134 12.252 3.8 11.8654 3.8V4.2ZM12.1654 4.5V15.293H12.5654V4.5H12.1654ZM12.5068 15.4344L15.6528 12.2874L15.37 12.0046L12.224 15.1516L12.5068 15.4344ZM15.6528 12.2874C15.7702 12.17 15.9606 12.17 16.078 12.2874L16.3608 12.0046C16.0872 11.731 15.6436 11.731 15.37 12.0046L15.6528 12.2874ZM16.078 12.2874C16.1954 12.4048 16.1954 12.5952 16.078 12.7126L16.3608 12.9954C16.6344 12.7218 16.6344 12.2782 16.3608 12.0046L16.078 12.2874ZM16.078 12.7126L12.078 16.7126L12.3608 16.9954L16.3608 12.9954L16.078 12.7126ZM12.0778 16.7128C12.0215 16.7692 11.9451 16.8009 11.8654 16.8009V17.2009C12.0514 17.2009 12.2297 17.1269 12.361 16.9952L12.0778 16.7128ZM11.8654 16.8009C11.7857 16.8009 11.7093 16.7692 11.653 16.7128L11.3698 16.9952C11.5011 17.1269 11.6794 17.2009 11.8654 17.2009V16.8009ZM11.6528 16.7126L7.65282 12.7126L7.36998 12.9954L11.37 16.9954L11.6528 16.7126ZM7.65282 12.7126C7.53542 12.5952 7.53542 12.4048 7.65282 12.2874L7.36998 12.0046C7.09636 12.2782 7.09636 12.7218 7.36998 12.9954L7.65282 12.7126ZM7.65282 12.2874C7.77022 12.17 7.96057 12.17 8.07798 12.2874L8.36082 12.0046C8.08721 11.731 7.64359 11.731 7.36998 12.0046L7.65282 12.2874ZM8.07795 12.2874L11.224 15.4344L11.5068 15.1516L8.36084 12.0046L8.07795 12.2874ZM4.86523 19.8C4.69955 19.8 4.56523 19.6657 4.56523 19.5H4.16523C4.16523 19.8866 4.47864 20.2 4.86523 20.2V19.8ZM4.56523 19.5C4.56523 19.3343 4.69955 19.2 4.86523 19.2V18.8C4.47864 18.8 4.16523 19.1134 4.16523 19.5H4.56523ZM4.86523 19.2H18.8652V18.8H4.86523V19.2ZM18.8652 19.2C19.0309 19.2 19.1652 19.3343 19.1652 19.5H19.5652C19.5652 19.1134 19.2518 18.8 18.8652 18.8V19.2ZM19.1652 19.5C19.1652 19.6657 19.0309 19.8 18.8652 19.8V20.2C19.2518 20.2 19.5652 19.8866 19.5652 19.5H19.1652ZM18.8652 19.8H4.86523V20.2H18.8652V19.8Z'
        fill='currentColor'
        mask='url(#path-1-outside-1)'
      />
    </svg>
  )
}
