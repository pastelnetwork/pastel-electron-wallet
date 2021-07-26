import React from 'react'

export type TQuitProps = {
  size: number
  clickHandler?: () => void
  className: string
}

export const Quit = ({
  size,
  clickHandler,
  className,
}: TQuitProps): JSX.Element => {
  return (
    <svg
      width={size}
      className={className}
      onClick={() => {
        clickHandler && clickHandler()
      }}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.2801 0.0783822C15.2575 0.0790579 15.235 0.0809596 15.2126 0.0840788H9.45898C9.37616 0.0829075 9.29394 0.0982082 9.21708 0.129092C9.14023 0.159975 9.07028 0.205826 9.0113 0.263979C8.95232 0.322131 8.90548 0.391427 8.87351 0.467837C8.84155 0.544248 8.82508 0.626251 8.82508 0.709079C8.82508 0.791907 8.84155 0.873909 8.87351 0.95032C8.90548 1.02673 8.95232 1.09603 9.0113 1.15418C9.07028 1.21233 9.14023 1.25818 9.21708 1.28907C9.29394 1.31995 9.37616 1.33525 9.45898 1.33408H13.7835L7.35042 7.76718C7.29044 7.82477 7.24255 7.89376 7.20956 7.97009C7.17657 8.04642 7.15915 8.12856 7.1583 8.21171C7.15746 8.29486 7.17321 8.37734 7.20464 8.45433C7.23607 8.53131 7.28255 8.60125 7.34135 8.66005C7.40014 8.71885 7.47008 8.76532 7.54707 8.79675C7.62405 8.82819 7.70654 8.84394 7.78969 8.84309C7.87284 8.84225 7.95498 8.82482 8.03131 8.79183C8.10764 8.75884 8.17662 8.71095 8.23421 8.65097L14.6673 2.21787V6.54241C14.6661 6.62523 14.6814 6.70746 14.7123 6.78431C14.7432 6.86117 14.7891 6.93112 14.8472 6.9901C14.9054 7.04908 14.9747 7.09592 15.0511 7.12788C15.1275 7.15985 15.2095 7.17631 15.2923 7.17631C15.3751 7.17631 15.4571 7.15985 15.5336 7.12788C15.61 7.09592 15.6793 7.04908 15.7374 6.9901C15.7956 6.93112 15.8414 6.86117 15.8723 6.78431C15.9032 6.70746 15.9185 6.62523 15.9173 6.54241V0.788018C15.9296 0.698095 15.9222 0.606569 15.8956 0.519801C15.869 0.433033 15.8238 0.353106 15.7631 0.285573C15.7025 0.218041 15.6279 0.164525 15.5445 0.128745C15.461 0.0929647 15.3708 0.075779 15.2801 0.0783822ZM3.20898 1.33408C1.49044 1.33408 0.0839844 2.74054 0.0839844 4.45908V12.7924C0.0839844 14.511 1.49044 15.9174 3.20898 15.9174H11.5423C13.2609 15.9174 14.6673 14.511 14.6673 12.7924V8.62574C14.6685 8.54292 14.6532 8.4607 14.6223 8.38384C14.5914 8.30699 14.5456 8.23704 14.4874 8.17806C14.4293 8.11907 14.36 8.07224 14.2836 8.04027C14.2071 8.00831 14.1251 7.99184 14.0423 7.99184C13.9595 7.99184 13.8775 8.00831 13.8011 8.04027C13.7247 8.07224 13.6554 8.11907 13.5972 8.17806C13.5391 8.23704 13.4932 8.30699 13.4623 8.38384C13.4314 8.4607 13.4161 8.54292 13.4173 8.62574V12.7924C13.4173 13.8355 12.5854 14.6674 11.5423 14.6674H3.20898C2.16586 14.6674 1.33398 13.8355 1.33398 12.7924V4.45908C1.33398 3.41595 2.16586 2.58408 3.20898 2.58408H7.37565C7.45847 2.58525 7.5407 2.56995 7.61755 2.53907C7.69441 2.50818 7.76436 2.46233 7.82334 2.40418C7.88232 2.34603 7.92916 2.27673 7.96112 2.20032C7.99309 2.12391 8.00955 2.04191 8.00955 1.95908C8.00955 1.87625 7.99309 1.79425 7.96112 1.71784C7.92916 1.64143 7.88232 1.57213 7.82334 1.51398C7.76436 1.45583 7.69441 1.40998 7.61755 1.37909C7.5407 1.34821 7.45847 1.33291 7.37565 1.33408H3.20898Z'
        fill='currentColor'
      />
    </svg>
  )
}
