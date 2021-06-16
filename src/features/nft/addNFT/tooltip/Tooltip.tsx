import * as React from 'react'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'
import style from './Tooltip.module.css'

export type TTooltipProps = {
  text: string
  children(ref: (el: HTMLElement | null) => void): React.ReactNode
}

export default function Tooltip({
  text,
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
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className:
              'flex-center bg-gray-14 border border-gray-e1 rounded-lg h-6 px-1.5 font-extrabold text-white text-xs',
          })}
        >
          <div
            {...getArrowProps({
              className: `${style.arrow} ${style.arrowDown}`,
            })}
          />
          {text}
        </div>
      )}
    </>
  )
}
