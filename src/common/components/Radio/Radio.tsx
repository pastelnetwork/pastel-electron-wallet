import * as React from 'react'

import * as Styles from './Radio.styles'

interface RadioProps {
  isChecked: boolean
  clickHandler: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void
}

const Radio: React.FC<RadioProps> = ({ children, isChecked, clickHandler }) => {
  return (
    <Styles.Container className='radioContainer' onClick={clickHandler}>
      {children}
      <Styles.Input type='radio' checked={isChecked} onChange={() => null} />
      <Styles.Span className='radioCheckmark' />
    </Styles.Container>
  )
}

export default Radio
