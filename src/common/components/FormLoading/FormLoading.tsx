import * as React from 'react'
import cn from 'classnames'

interface FormLoadingProps {
  className: string
}

const FormLoading = ({
  className = 'mr-[6px] h-[6px] w-[92px]',
}: FormLoadingProps): JSX.Element => (
  <div className={cn('rounded', className)} />
)

export default FormLoading
