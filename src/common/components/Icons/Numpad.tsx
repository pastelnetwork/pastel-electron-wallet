import React from 'react'
import { TIconProps } from './iconProps'

export type TNumpadProps = TIconProps

export const Numpad: React.FC<TNumpadProps> = ({ size, className }) => {
  return (
    <svg
      width={size}
      className={className}
      viewBox='0 0 50 50'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M 13.5 0 C 12.416667 0 11.476892 0.44225559 10.876953 1.1171875 C 10.277014 1.7921194 10 2.6527779 10 3.5 C 10 4.3472221 10.277014 5.2078806 10.876953 5.8828125 C 11.476892 6.5577444 12.416667 7 13.5 7 C 14.583333 7 15.523108 6.5577444 16.123047 5.8828125 C 16.722986 5.2078806 17 4.3472221 17 3.5 C 17 2.6527779 16.722986 1.7921194 16.123047 1.1171875 C 15.523108 0.44225559 14.583333 0 13.5 0 z M 23.5 0 C 22.416667 0 21.476892 0.44225559 20.876953 1.1171875 C 20.277014 1.7921194 20 2.6527779 20 3.5 C 20 4.3472221 20.277014 5.2078806 20.876953 5.8828125 C 21.476892 6.5577444 22.416667 7 23.5 7 C 24.583333 7 25.523108 6.5577444 26.123047 5.8828125 C 26.722986 5.2078806 27 4.3472221 27 3.5 C 27 2.6527779 26.722986 1.7921194 26.123047 1.1171875 C 25.523108 0.44225559 24.583333 0 23.5 0 z M 33.5 0 C 32.416667 0 31.476892 0.44225559 30.876953 1.1171875 C 30.277014 1.7921194 30 2.6527779 30 3.5 C 30 4.3472221 30.277014 5.2078806 30.876953 5.8828125 C 31.476892 6.5577444 32.416667 7 33.5 7 C 34.583333 7 35.523108 6.5577444 36.123047 5.8828125 C 36.722986 5.2078806 37 4.3472221 37 3.5 C 37 2.6527779 36.722986 1.7921194 36.123047 1.1171875 C 35.523108 0.44225559 34.583333 0 33.5 0 z M 13.5 2 C 14.083333 2 14.393559 2.1827444 14.626953 2.4453125 C 14.860347 2.7078806 15 3.0972221 15 3.5 C 15 3.9027779 14.860347 4.2921194 14.626953 4.5546875 C 14.393559 4.8172556 14.083333 5 13.5 5 C 12.916667 5 12.606441 4.8172556 12.373047 4.5546875 C 12.139653 4.2921194 12 3.9027779 12 3.5 C 12 3.0972221 12.139653 2.7078806 12.373047 2.4453125 C 12.606441 2.1827444 12.916667 2 13.5 2 z M 23.5 2 C 24.083333 2 24.393559 2.1827444 24.626953 2.4453125 C 24.860347 2.7078806 25 3.0972221 25 3.5 C 25 3.9027779 24.860347 4.2921194 24.626953 4.5546875 C 24.393559 4.8172556 24.083333 5 23.5 5 C 22.916667 5 22.606441 4.8172556 22.373047 4.5546875 C 22.139653 4.2921194 22 3.9027779 22 3.5 C 22 3.0972221 22.139653 2.7078806 22.373047 2.4453125 C 22.606441 2.1827444 22.916667 2 23.5 2 z M 33.5 2 C 34.083333 2 34.393559 2.1827444 34.626953 2.4453125 C 34.860347 2.7078806 35 3.0972221 35 3.5 C 35 3.9027779 34.860347 4.2921194 34.626953 4.5546875 C 34.393559 4.8172556 34.083333 5 33.5 5 C 32.916667 5 32.606441 4.8172556 32.373047 4.5546875 C 32.139653 4.2921194 32 3.9027779 32 3.5 C 32 3.0972221 32.139653 2.7078806 32.373047 2.4453125 C 32.606441 2.1827444 32.916667 2 33.5 2 z M 13.5 12 C 12.416667 12 11.476892 12.442256 10.876953 13.117188 C 10.277014 13.792118 10 14.652778 10 15.5 C 10 16.347222 10.277014 17.207881 10.876953 17.882812 C 11.476892 18.557744 12.416667 19 13.5 19 C 14.583333 19 15.523108 18.557744 16.123047 17.882812 C 16.722986 17.207881 17 16.347222 17 15.5 C 17 14.652778 16.722986 13.792119 16.123047 13.117188 C 15.523108 12.442255 14.583333 12 13.5 12 z M 23.5 12 C 21.535365 12 20 13.707883 20 15.699219 L 20 32.154297 C 16.781401 32.710514 14.936786 36.228483 16.320312 39.193359 L 18.939453 44.804688 C 20.417669 47.971328 23.59965 49.998047 27.09375 49.998047 L 34.332031 50 C 38.597591 50 42 46.277284 42 41.800781 L 42 34 L 42 28.5 C 42 26.578812 40.421188 25 38.5 25 C 37.740912 25 37.040765 25.253237 36.464844 25.669922 C 35.845214 24.674066 34.749768 24 33.5 24 C 32.722033 24 32.036708 24.308464 31.453125 24.744141 C 30.839179 23.722916 29.768913 23 28.5 23 C 27.958311 23 27.459537 23.149735 27 23.373047 L 27 15.699219 C 27 13.707883 25.464635 12 23.5 12 z M 33.5 12 C 32.416667 12 31.476892 12.442256 30.876953 13.117188 C 30.277014 13.792118 30 14.652778 30 15.5 C 30 16.347222 30.277014 17.207881 30.876953 17.882812 C 31.476892 18.557744 32.416667 19 33.5 19 C 34.583333 19 35.523108 18.557744 36.123047 17.882812 C 36.722986 17.207881 37 16.347222 37 15.5 C 37 14.652778 36.722986 13.792119 36.123047 13.117188 C 35.523108 12.442255 34.583333 12 33.5 12 z M 13.5 14 C 14.083333 14 14.393559 14.182744 14.626953 14.445312 C 14.860347 14.707882 15 15.097222 15 15.5 C 15 15.902778 14.860347 16.292119 14.626953 16.554688 C 14.393559 16.817256 14.083333 17 13.5 17 C 12.916667 17 12.606441 16.817256 12.373047 16.554688 C 12.139653 16.292119 12 15.902778 12 15.5 C 12 15.097222 12.139653 14.707881 12.373047 14.445312 C 12.606441 14.182745 12.916667 14 13.5 14 z M 23.5 14 C 24.297365 14 25 14.708554 25 15.699219 L 25 26.5 L 25 30 L 25 30.199219 A 1.0001 1.0001 0 1 0 27 30.199219 L 27 30 L 27 26.5 C 27 25.659188 27.659188 25 28.5 25 C 29.340812 25 30 25.659188 30 26.5 L 30 27.5 L 30 30 L 30 31 A 1.0001 1.0001 0 1 0 32 31 L 32 30 L 32 27.5 C 32 26.659188 32.659188 26 33.5 26 C 34.340812 26 35 26.659188 35 27.5 L 35 28.5 L 35 32 A 1.0001 1.0001 0 1 0 37 32 L 37 28.5 C 37 27.659188 37.659188 27 38.5 27 C 39.340812 27 40 27.659188 40 28.5 L 40 34 L 40 41.800781 C 40 45.27554 37.431541 47.998843 34.333984 48 L 27.09375 47.998047 C 24.37185 47.998047 21.903738 46.426343 20.751953 43.958984 L 18.132812 38.347656 C 17.282622 36.525708 18.374498 34.451581 20.357422 34.121094 L 21.003906 34.013672 A 1.0001 1.0001 0 0 0 21.613281 33.802734 A 1.0001 1.0001 0 0 0 21.621094 33.796875 A 1.0001 1.0001 0 0 0 21.628906 33.789062 A 1.0001 1.0001 0 0 0 21.675781 33.751953 A 1.0001 1.0001 0 0 0 21.728516 33.699219 A 1.0001 1.0001 0 0 0 22 32.796875 L 22 15.699219 C 22 14.708554 22.702635 14 23.5 14 z M 33.5 14 C 34.083333 14 34.393559 14.182744 34.626953 14.445312 C 34.860347 14.707882 35 15.097222 35 15.5 C 35 15.902778 34.860347 16.292119 34.626953 16.554688 C 34.393559 16.817256 34.083333 17 33.5 17 C 32.916667 17 32.606441 16.817256 32.373047 16.554688 C 32.139653 16.292119 32 15.902778 32 15.5 C 32 15.097222 32.139653 14.707881 32.373047 14.445312 C 32.606441 14.182745 32.916667 14 33.5 14 z M 13.5 24 C 12.416667 24 11.476892 24.442256 10.876953 25.117188 C 10.277014 25.792119 10 26.652778 10 27.5 C 10 28.347222 10.277014 29.207882 10.876953 29.882812 C 11.476892 30.557744 12.416667 31 13.5 31 C 14.583333 31 15.523108 30.557744 16.123047 29.882812 C 16.722986 29.207881 17 28.347222 17 27.5 C 17 26.652778 16.722986 25.792118 16.123047 25.117188 C 15.523108 24.442256 14.583333 24 13.5 24 z M 13.5 26 C 14.083333 26 14.393559 26.182744 14.626953 26.445312 C 14.860347 26.707881 15 27.097222 15 27.5 C 15 27.902778 14.860347 28.292118 14.626953 28.554688 C 14.393559 28.817256 14.083333 29 13.5 29 C 12.916667 29 12.606441 28.817256 12.373047 28.554688 C 12.139653 28.292119 12 27.902778 12 27.5 C 12 27.097222 12.139653 26.707882 12.373047 26.445312 C 12.606441 26.182744 12.916667 26 13.5 26 z' />
    </svg>
  )
}
