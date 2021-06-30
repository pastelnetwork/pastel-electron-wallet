import React, { FunctionComponent, ReactNode } from 'react'
import ArrowToolTip from '../../assets/icons/ico-triangle.svg'
import cn from 'classnames'
import CSS from 'csstype'

export type TTooltipProps = {
  type: 'left' | 'right' | 'top' | 'bottom'
  classnames?: string
  content: ReactNode
  width: number
}

const Tooltip: FunctionComponent<TTooltipProps> = ({
  type,
  classnames,
  content,
  width,
  children,
}) => {
  const styles = {
    top: {
      width: `${width}px`,
      bottom: '150%',
      left: `calc(50% - ${width / 2}px)`,
    },
    bottom: {
      width: `${width}px`,
      top: '150%',
      left: `calc(50% - ${width / 2}px)`,
    },
    right: {
      width: `${width}px`,
      left: 'calc(100% + 10px)',
    },
    left: {
      width: `${width}px`,
      right: 'calc(100% + 10px)',
    },
  }
  const arrow_styles = {
    top: {
      width: '10px',
      top: 'calc(150% - 8px)',
      left: '50%',
      marginLeft: '-5px',
    },
    bottom: {
      width: '10px',
      bottom: 'calc(150% - 8px)',
      left: '50%',
      marginLeft: '-5px',
      transform: 'rotate(180deg)',
    },
    left: {
      width: '10px',
      left: 'calc(100% + 3px)',
      top: '50%',
      transform: 'rotate(-90deg)',
      marginTop: '-5px',
    },
    right: {
      width: '10px',
      right: 'calc(100% + 3px)',
      top: '50%',
      transform: 'rotate(90deg)',
      marginTop: '-5px',
    },
  }
  let style: CSS.Properties, arrowStyle: CSS.Properties
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
    <div className='relative tooltip'>
      {children}
      <img
        style={arrowStyle}
        className='absolute tooltiparrow invisible'
        src={ArrowToolTip}
      />
      <div
        style={style}
        className={cn(
          'absolute bg-black text-white text-center rounded-lg z-10 tooltiptext invisible',
          classnames,
        )}
      >
        {content}
      </div>
    </div>
  )
}

export default Tooltip
