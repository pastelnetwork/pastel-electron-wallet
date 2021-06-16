import * as React from 'react'

import * as Styles from './Radio.styles'

interface RadioProps {
  isChecked: boolean
  clickHandler: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void
  children: React.ReactNode
}

function Radio({ children, isChecked, clickHandler }: RadioProps): JSX.Element {
  return (
    <Styles.Container className='radioContainer' onClick={clickHandler}>
      {children}
      <Styles.Input type='radio' checked={isChecked} onChange={() => null} />
      <Styles.Span className='radioCheckmark' />
    </Styles.Container>
  )
}

export default Radio
