import * as React from 'react'

import * as Styles from './FormLoading.styles'

interface FormLoadingProps {
  background: string
}

const FormLoading: React.FC<FormLoadingProps> = ({ background }) => (
  <Styles.Container background={background} />
)

export default FormLoading
