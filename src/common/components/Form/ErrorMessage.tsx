import React, { useCallback } from 'react'
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
  className = 'text-red-fe mt-2',
}: TErrorMessageProps): JSX.Element {
  const renderErrorMsg = useCallback(
    error => <div className={className}>{error.message}</div>,
    [],
  )

  return (
    <OriginalErrorMessage
      errors={form.formState.errors}
      name={name}
      render={renderErrorMsg}
    />
  )
}
