import React from 'react'

export type TPreviewIcoProps = {
  size?: number
  className?: string
}

export const PreviewIco = ({
  size = 18,
  className = 'text-white',
}: TPreviewIcoProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.79167 2.5C3.52792 2.5 2.5 3.52833 2.5 4.79167V5.41667V15.2083C2.5 16.4742 3.52583 17.5 4.79167 17.5H15.2083C16.4742 17.5 17.5 16.4742 17.5 15.2083V5.41667V4.79167C17.5 3.52833 16.4721 2.5 15.2083 2.5H4.79167ZM3.75 5.41667H16.25V15.2083C16.25 15.7837 15.7837 16.25 15.2083 16.25H4.79167C4.21625 16.25 3.75 15.7837 3.75 15.2083V5.41667ZM10 8.75C7.57083 8.75 6.36389 10.7264 6.31348 10.8105C6.22889 10.9535 6.22889 11.1299 6.31348 11.2728C6.36389 11.3565 7.57083 13.3333 10 13.3333C12.4292 13.3333 13.6361 11.357 13.6865 11.2728C13.7711 11.1303 13.7711 10.953 13.6865 10.8105C13.6361 10.7264 12.4292 8.75 10 8.75ZM10 9.79167C10.6904 9.79167 11.25 10.3512 11.25 11.0417C11.25 11.7321 10.6904 12.2917 10 12.2917C9.30958 12.2917 8.75 11.7321 8.75 11.0417C8.75 10.3512 9.30958 9.79167 10 9.79167Z'
        fill='currentColor'
      />
    </svg>
  )
}
