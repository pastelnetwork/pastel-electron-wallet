import * as React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'
import style from './Tooltip2.module.css'
import cn from 'classnames'

export type TTooltipProps = {
  text: React.ReactNode
  show?: boolean
  className?: string
  children(ref: (el: HTMLElement | null) => void): React.ReactNode
}

export default function Tooltip2({
  text,
  show,
  className,
  children,
}: TTooltipProps): JSX.Element {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    placement: 'top',
  })

  return (
    <>
      {children(setTriggerRef)}
      {(show || visible) && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: cn(
              'flex-center bg-gray-33 rounded-md h-8 px-2 font-extrabold text-white text-xs',
              className,
            ),
          })}
        >
          <div
            {...getArrowProps({
              className: `border-gray-33 absolute left-1/2 pointer-events-none border-solid h-0 w-0 ${style.arrowDown}`,
            })}
          />
          {text}
        </div>
      )}
    </>
  )
}
