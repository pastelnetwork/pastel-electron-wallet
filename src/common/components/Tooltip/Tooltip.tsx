import React, { ReactNode } from 'react'
import cn from 'classnames'
import CSS from 'csstype'
import { TooltipArrow } from '../Icons/TooltipArrow'

export type TTooltipProps = {
  type: 'left' | 'right' | 'top' | 'bottom'
  classnames?: string
  content: ReactNode
  width?: number
  autoWidth?: boolean
  padding?: number
  wrapperClassNames?: string
  marginLeft?: string
  marginTop?: string
  vPosPercent?: number
  children: ReactNode
}

function Tooltip({
  type,
  classnames,
  wrapperClassNames,
  content,
  width = 0,
  autoWidth = false,
  children,
  vPosPercent = 150,
  marginLeft = '-5px',
  marginTop = '-5px',
}: TTooltipProps): JSX.Element {
  const styles = {
    top: {
      width: `${width}px`,
      bottom: `${vPosPercent}%`,
      left: `calc(50% - ${width / 2}px)`,
    },
    bottom: {
      width: `${width}px`,
      top: `${vPosPercent}%`,
      left: `calc(50% - ${width / 2}px)`,
    },
    right: {
      width: `${autoWidth ? 'auto' : width.toString() + 'px'}`,
      left: 'calc(100% + 10px)',
    },
    left: {
      width: `${autoWidth ? 'auto' : width.toString() + 'px'}`,
      right: 'calc(100% + 10px)',
    },
  }
  const arrow_styles = {
    top: {
      width: '10px',
      top: `calc(${vPosPercent}% - 3px)`,
      left: '50%',
      marginLeft,
      transform: 'rotate(180deg)',
    },
    bottom: {
      width: '10px',
      bottom: `calc(${vPosPercent}% - 3px)`,
      left: '50%',
      marginLeft,
    },
    left: {
      width: '10px',
      left: 'calc(100% + 4px)',
      top: '50%',
      transform: 'rotate(90deg)',
      marginTop,
    },
    right: {
      width: '10px',
      right: 'calc(100% + 4px)',
      top: '50%',
      transform: 'rotate(-90deg)',
      marginTop,
    },
  }
  let style: CSS.Properties = {
      width: '',
      right: '',
      top: '',
      bottom: '',
      left: '',
      transform: '',
      marginTop: '',
      marginLeft: '',
    },
    arrowStyle: CSS.Properties = {
      width: '',
      right: '',
      top: '',
      bottom: '',
      left: '',
      transform: '',
      marginTop: '',
      marginLeft: '',
    }
  if (type === 'top') {
    style = styles.top
    arrowStyle = arrow_styles.bottom
  } else if (type === 'bottom') {
    style = styles.bottom
    arrowStyle = arrow_styles.top
  } else if (type === 'right') {
    style = styles.right
    arrowStyle = arrow_styles.left
  } else {
    style = styles.left
    arrowStyle = arrow_styles.right
  }
  return (
    <div className={cn('relative tooltip', wrapperClassNames)}>
      {children}
      <div className={'absolute tooltiparrow invisible'} style={arrowStyle}>
        <TooltipArrow size={8} className='text-gray-33' />
      </div>

      <div
        style={style}
        className={cn(
          'absolute bg-gray-33 text-white text-center rounded-lg z-50 tooltiptext invisible text-xs px-1.5',
          classnames,
        )}
      >
        {content}
      </div>
    </div>
  )
}

export default Tooltip
