import * as React from 'react'

import * as Styles from './Checkbox.styles'

interface CheckboxProps {
  isChecked: boolean
  clickHandler: (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    index?: string,
  ) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  isChecked,
  clickHandler,
}) => {
  return (
    <Styles.Container
      className='checkboxContainer pl-41px'
      onClick={clickHandler}
    >
      {children}
      <Styles.Input type='checkbox' checked={isChecked} onChange={() => null} />
      <Styles.Span className='checkboxCheckmark' />
    </Styles.Container>
  )
}

export default Checkbox
