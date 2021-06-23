import * as React from 'react'
import cn from 'classnames'

interface FormLoadingProps {
  className: string
}

const FormLoading: React.FC<FormLoadingProps> = ({
  className = 'mr-[6px] h-[6px] w-[92px]',
}) => <div className={cn('rounded', className)} />

export default FormLoading
