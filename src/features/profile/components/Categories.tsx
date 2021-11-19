import React, { useState, useRef } from 'react'
import cn from 'classnames'
import CustomInput from './CustomInput'
import ico_add from 'common/assets/icons/ico-add.svg'
import ico_close from 'common/assets/icons/ico-close-round.svg'

export type TCategories = {
  value: Array<string>
  onChange(value: Array<string>): void
}

function Categories({ value, onChange }: TCategories): JSX.Element {
  const [isAdding, setAdding] = useState<boolean>(false)
  const [newText, setNewText] = useState('')
  const customInputRef = useRef<HTMLInputElement>(null)

  const onAdd = () => {
    if (!newText) {
      return
    }
    const newValue = [...value, newText]
    onChange(newValue)
    setAdding(false)
    setNewText('')
  }

  const onDeleteCategory = (index: number) => {
    const newValue = [...value]
    newValue.splice(index, 1)
    onChange(newValue)
  }

  const startAdd = () => {
    if (!customInputRef.current) {
      return
    }
    setAdding(true)
    setTimeout(() => customInputRef.current?.focus(), 10)
  }

  const handleAddNewText = () => {
    setAdding(false)
    setNewText('')
  }

  const renderAddNewForm = () => (
    <div
      className={cn(
        'px-2 mx-2 rounded-full text-gray-dd border border-gray-dd flex text-sm items-center mb-2',
        isAdding ? 'flex' : 'hidden',
      )}
    >
      <CustomInput
        ref={customInputRef}
        value={newText}
        onChange={setNewText}
        onEnter={onAdd}
      />
      <button
        className='bg-gray-e6 ml-1 rounded-full h-4 w-4 flex justify-center items-center'
        onClick={handleAddNewText}
        type='button'
      >
        <img src={ico_close} className='cursor-pointer' alt='Close' />
      </button>
    </div>
  )

  const renderCategoryItem = (category: string, index: number) => (
    <div className='px-2 mx-2 rounded-full text-gray-dd border border-gray-dd flex text-sm items-center mb-2'>
      <div className='h-6 text-gray-4a flex items-center'>{category}</div>
      <div
        className='bg-gray-e6 ml-1 rounded-full h-4 w-4 flex justify-center items-center'
        onClick={() => onDeleteCategory(index)}
        role='button'
        tabIndex={0}
        aria-hidden='true'
      >
        <img src={ico_close} className='cursor-pointer' alt='Close' />
      </div>
    </div>
  )

  return (
    <div className='bg-white rounded flex flex-grow shadow-4px flex-wrap p-2 items-center transition duration-300 border border-gray-ec hover:border-blue-3f active:border-blue-3f'>
      {value.map((category: string, index: number) => (
        <div className='flex' key={category}>
          {renderCategoryItem(category, index)}
        </div>
      ))}
      <button
        hidden={isAdding}
        className='mb-2'
        onClick={startAdd}
        type='button'
      >
        <img src={ico_add} className='cursor-pointer w-21px' alt='Add' />
      </button>

      {renderAddNewForm()}
    </div>
  )
}

export default Categories
