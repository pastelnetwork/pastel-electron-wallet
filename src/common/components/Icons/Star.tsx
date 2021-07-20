import React from 'react'

export type TStarProps = {
  width?: number
  height?: number
  className?: string
  filled?: boolean
}

export const Star = ({
  width = 18,
  height = 16,
  className = 'text-yello-ffd',
  filled = false,
}: TStarProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 18 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {filled ? (
        <path
          d='M13.6317 15.8368C13.4984 15.8373 13.3669 15.8059 13.2483 15.7451L8.99834 13.5201L4.74834 15.7451C4.61033 15.8177 4.45473 15.8501 4.29923 15.8386C4.14373 15.8271 3.99457 15.7723 3.86869 15.6803C3.74282 15.5882 3.64529 15.4627 3.58718 15.3181C3.52908 15.1734 3.51273 15.0153 3.54 14.8618L4.37334 10.1701L0.940004 6.83676C0.832885 6.72986 0.756897 6.59582 0.720194 6.449C0.683491 6.30219 0.687458 6.14815 0.731671 6.00342C0.779971 5.85532 0.868818 5.72372 0.988129 5.62356C1.10744 5.52339 1.25244 5.45868 1.40667 5.43676L6.15667 4.74509L8.24834 0.470092C8.31657 0.329199 8.42312 0.210377 8.55576 0.127236C8.68841 0.044096 8.84179 0 8.99834 0C9.15488 0 9.30827 0.044096 9.44091 0.127236C9.57356 0.210377 9.6801 0.329199 9.74834 0.470092L11.865 4.73676L16.615 5.42842C16.7692 5.45035 16.9142 5.51506 17.0335 5.61522C17.1529 5.71539 17.2417 5.84699 17.29 5.99509C17.3342 6.13982 17.3382 6.29386 17.3015 6.44067C17.2648 6.58748 17.1888 6.72153 17.0817 6.82842L13.6483 10.1618L14.4817 14.8534C14.5114 15.0097 14.4958 15.1711 14.4368 15.3188C14.3777 15.4665 14.2776 15.5941 14.1483 15.6868C13.9974 15.7925 13.8157 15.8453 13.6317 15.8368Z'
          fill='currentColor'
        />
      ) : (
        <path
          opacity='0.3'
          d='M13.6547 15.3373L13.6422 15.3367L13.6297 15.3368C13.5769 15.337 13.5249 15.3247 13.4778 15.3009L9.23024 13.0771L8.99834 12.9557L8.76643 13.0771L4.51643 15.3021L4.51563 15.3025C4.46043 15.3316 4.39819 15.3445 4.33599 15.3399C4.27379 15.3354 4.21412 15.3134 4.16377 15.2766C4.11342 15.2398 4.07441 15.1896 4.05117 15.1317C4.02793 15.0739 4.02139 15.0106 4.0323 14.9492L4.0323 14.9492L4.86563 10.2575L4.91205 9.99622L4.72163 9.81135L1.2913 6.48094C1.24945 6.4385 1.21973 6.38559 1.20527 6.32773C1.19096 6.27053 1.1921 6.21058 1.20852 6.154C1.22814 6.09657 1.26309 6.04556 1.30961 6.0065C1.35734 5.96644 1.41534 5.94055 1.47703 5.93179L1.47872 5.93154L6.22872 5.23987L6.48983 5.20185L6.60579 4.96484L8.69746 0.68984L8.69834 0.688036C8.72563 0.631679 8.76825 0.584151 8.82131 0.550895C8.87437 0.517638 8.93572 0.5 8.99834 0.5C9.06096 0.5 9.12231 0.517639 9.17537 0.550894C9.22842 0.58415 9.27104 0.631679 9.29834 0.688036L9.29832 0.688046L9.30043 0.692298L11.4171 4.95896L11.5336 5.19377L11.793 5.23154L16.543 5.92321L16.5446 5.92345C16.6063 5.93222 16.6643 5.9581 16.7121 5.99817C16.7586 6.03723 16.7935 6.08824 16.8132 6.14567C16.8296 6.20225 16.8307 6.26219 16.8164 6.3194C16.8019 6.37727 16.7722 6.43019 16.7303 6.47264L13.3 9.80302L13.1096 9.98789L13.156 10.2492L13.9894 14.9409L13.9893 14.9409L13.9905 14.947C14.0024 15.0094 13.9962 15.074 13.9725 15.1331C13.9492 15.1914 13.91 15.2419 13.8593 15.2788C13.7993 15.3201 13.7275 15.3406 13.6547 15.3373Z'
          stroke='currentColor'
        />
      )}
    </svg>
  )
}
