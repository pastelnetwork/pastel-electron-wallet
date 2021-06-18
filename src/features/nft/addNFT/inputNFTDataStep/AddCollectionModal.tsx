import React, { forwardRef } from 'react'
import { Button } from 'common/components/Buttons'
import Input from 'common/components/Form/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  collection: yup.string().required(),
})

export default forwardRef<
  HTMLFormElement,
  { show: boolean; onSubmit(value: string): void }
>(function AddCollectionModal({ show, onSubmit }, ref) {
  const form = useForm({
    resolver: yupResolver(schema),
  })

  const submit = () => {
    onSubmit(form.getValues().collection)
  }

  return (
    <form
      ref={ref}
      className='absolute right-10 paper p-3 space-y-3 z-10 shadow-lg mt-1'
      hidden={!show}
      onSubmit={form.handleSubmit(submit)}
    >
      <Input form={form} name='collection' label='Create new collection' />
      <Button className='w-full font-medium'>Save</Button>
    </form>
  )
})
