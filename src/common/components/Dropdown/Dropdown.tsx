import React, { ReactNode, useState, useEffect } from 'react'
import cn from 'classnames'
import { usePopper } from 'react-popper'
import { Placement, PositioningStrategy } from '@popperjs/core'

export type TDropdown = {
  isOpen: boolean
  handleClose: () => void
  className?: string
  button?: ReactNode
  width?: string
  noStyles?: boolean
  noPaddings?: boolean
  placement?: Placement
  strategy?: PositioningStrategy
  children?: ReactNode
}

const Dropdown = ({
  children,
  className,
  isOpen,
  width,
  button,
  handleClose,
  noStyles,
  noPaddings,
  placement = 'bottom-end',
  strategy = 'fixed',
}: TDropdown): JSX.Element => {
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null)
  const [dropdownBoxRef, setDropdownBoxRef] = useState<HTMLDivElement | null>(
    null,
  )
  const { styles, attributes } = usePopper(dropdownRef, dropdownBoxRef, {
    strategy,
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })

  useEffect(() => {
    document.addEventListener('click', clickOutside)
    return () => {
      document.removeEventListener('click', clickOutside)
    }
  }, [dropdownRef])

  const clickOutside = (event: MouseEvent) => {
    if (!dropdownRef || dropdownRef.contains(event.target as Node)) {
      return
    }
    handleClose()
  }

  const classes = cn('relative inline-flex', className)

  return (
    <div className={classes} ref={setDropdownRef}>
      {button}
      {isOpen && (
        <div
          className={cn(
            !noStyles && 'bg-white rounded-md shadow-sm',
            !noPaddings && 'p-3 pb-4',
            width,
          )}
          ref={setDropdownBoxRef}
          style={styles.popper}
          {...attributes.popper}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown
