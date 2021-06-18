import React from 'react'
import SelectMultiple from 'common/components/SelectMultiple/SelectMultiple'
import Select, { TOption } from 'common/components/Select/Select'
import { PlusCircle } from 'common/components/Icons'
import { categories } from './InputNFTDataStep'
import { UseFormReturn } from 'react-hook-form'

export default function CategoryAndCollection({
  form,
  addCollectionButtonRef,
  onAddCollectionClick,
  collections,
}: {
  form: UseFormReturn
  addCollectionButtonRef(el: HTMLButtonElement | null): void
  onAddCollectionClick(): void
  collections: TOption[]
}): JSX.Element {
  return (
    <div className='flex space-x-4'>
      <SelectMultiple
        form={form}
        label='Category'
        name='categories'
        options={categories}
        className='w-1/2'
        placeholder='choose'
      />
      <div className='flex items-start w-1/2'>
        <Select
          form={form}
          className='w-full'
          label='Collection'
          name='collection'
          options={collections}
          placeholder='choose'
        />
        <button
          ref={addCollectionButtonRef}
          onClick={onAddCollectionClick}
          type='button'
          className='ml-4 mt-10 text-blue-3f flex-shrink-0'
        >
          <PlusCircle bold size={24} />
        </button>
      </div>
    </div>
  )
}
