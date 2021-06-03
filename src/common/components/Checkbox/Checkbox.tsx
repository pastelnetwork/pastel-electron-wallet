import * as React from 'react'

import * as Styles from './Checkbox.styles'

type TCheckboxProps = {
  isChecked: boolean
  clickHandler: (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    index?: string,
  ) => void
}

const Checkbox: React.FC<TCheckboxProps> = ({
  children,
  isChecked,
  clickHandler,
}) => {
  return (
    <Styles.Container className='checkboxContainer pl-41px mb-4'>
      {children}
      <Styles.Input type='checkbox' checked={isChecked} onChange={() => null} />
      <Styles.Span onClick={clickHandler} className='checkboxCheckmark' />
    </Styles.Container>
  )
}

export default Checkbox
