import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ErrorMessage as OriginalErrorMessage } from '@hookform/error-message'

export type TErrorMessageProps = {
  form: Pick<UseFormReturn, 'formState'>
  name: string
  className?: string
  addClass?: string
}

export default function ErrorMessage({
  form,
  name,
  className = 'text-error mt-2',
}: TErrorMessageProps): JSX.Element {
  return (
    <OriginalErrorMessage
      errors={form.formState.errors}
      name={name}
      render={error => <div className={className}>{error.message}</div>}
    />
  )
}
