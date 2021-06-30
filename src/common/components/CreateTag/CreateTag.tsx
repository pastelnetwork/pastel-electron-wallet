import React, { useState } from 'react'
import { Input } from '../Inputs'
import { Button } from '../Buttons'

export type TCreateTag = {
  onSave: (tag: string) => void
}

const CreateTag = ({ onSave }: TCreateTag): JSX.Element => {
  const [tag, setTag] = useState<string>('')

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setTag(event.target.value)
  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    if (tag !== '') {
      onSave(tag)
      setTag('')
    }
  }

  return (
    <form
      className='w-80 bg-white rounded-md shadow-sm p-3 pb-4'
      onSubmit={handleSubmit}
    >
      <h5 className='text-gray-71 font-medium mb-2'>Create new tag</h5>
      <Input
        placeholder='tag name'
        className='mb-3 w-full'
        onChange={handleInput}
        value={tag}
      />
      <Button variant='default' type='submit' className='w-full'>
        Save
      </Button>
    </form>
  )
}

export default CreateTag
