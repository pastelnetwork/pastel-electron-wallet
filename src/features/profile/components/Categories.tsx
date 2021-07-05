import React, { useState, useRef } from 'react'
import CustomInput from './CustomInput'
import ico_add from 'common/assets/icons/ico-add.svg'
import ico_close from 'common/assets/icons/ico-close-round.svg'

export type TCategories = {
  value: Array<string>
  onChange(value: Array<string>): void
}

const Categories = ({ value, onChange }: TCategories): JSX.Element => {
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

  return (
    <div className='bg-white border rounded flex flex-grow shadow-4px flex-wrap p-2 items-center'>
      {value.map((category: string, index: number) => (
        <div className='flex' key={index}>
          <div className='px-2 mx-2 rounded-full text-gray-dd border border-gray-dd flex text-sm items-center  mb-2'>
            <div className='h-6 text-gray-4a flex items-center'>{category}</div>
            <div
              className='bg-gray-e6 ml-1 rounded-full h-4 w-4 flex justify-center items-center'
              onClick={() => onDeleteCategory(index)}
            >
              <img src={ico_close} className='cursor-pointer' />
            </div>
          </div>
        </div>
      ))}
      <button hidden={isAdding} className='mb-2' onClick={startAdd}>
        <img src={ico_add} className='cursor-pointer w-21px' />
      </button>

      <div className={isAdding ? 'flex' : 'hidden'}>
        <div className='px-2 mx-2 rounded-full text-gray-dd border border-gray-dd flex text-sm items-center  mb-2'>
          <CustomInput
            ref={customInputRef}
            value={newText}
            onChange={setNewText}
            onEnter={onAdd}
          />
          <button
            className='bg-gray-e6 ml-1 rounded-full h-4 w-4 flex justify-center items-center'
            onClick={() => {
              setAdding(false), setNewText('')
            }}
          >
            <img src={ico_close} className='cursor-pointer' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Categories
