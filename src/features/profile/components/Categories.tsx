import React, { useState, useRef } from 'react'
import ico_add from '../../../common/assets/icons/ico-add.svg'
import ico_close from '../../../common/assets/icons/ico-close-round.svg'

export type TCategories = {
  value: Array<string>
  onChange: React.Dispatch<React.SetStateAction<Array<string>>>
}

const Categories = ({ value, onChange }: TCategories): JSX.Element => {
  const [isAdding, setAdding] = useState<boolean>(false)
  const inputRef = useRef<HTMLDivElement>(null)

  const onAddCategory = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == 'Enter') {
      const newCategory = inputRef?.current?.innerHTML
      if (!newCategory) {
        return
      }
      const newValue = [...value]
      newValue.push(newCategory)
      onChange(newValue)
      setAdding(false)
    }
  }

  const onDeleteCategory = (index: number) => {
    const newValue = [...value]
    newValue.splice(index, 1)
    onChange(newValue)
  }
  return (
    <div className='bg-white border rounded flex flex-grow shadow-editbox flex-wrap p-2 items-center'>
      {value.map((category: string, index: number) => (
        <div className='flex' key={index}>
          <div className='px-2 mx-2 rounded-full text-gray-dd border border-gray-dd flex text-sm items-center  mb-2'>
            <div className='h-6 text-gray-4a'>{category}</div>
            <div
              className='bg-gray-e6 ml-1 rounded-full h-4 w-4 flex justify-center items-center'
              onClick={() => onDeleteCategory(index)}
            >
              <img src={ico_close} className='cursor-pointer' />
            </div>
          </div>
        </div>
      ))}
      <button
        hidden={isAdding}
        className='cursor-pointer mb-2'
        onClick={() => setAdding(true)}
      >
        <img src={ico_add} className=' w-21px' />
      </button>
      <div className='flex' hidden={!isAdding}>
        <div className='px-2 mx-2 rounded-full text-gray-dd border border-gray-dd flex text-sm items-center  mb-2'>
          <div
            onKeyPress={onAddCategory}
            ref={inputRef}
            className='h-6 text-gray-4a min-w-32px outline-none'
            contentEditable={true}
          />
          <button
            className='bg-gray-e6 ml-1 rounded-full h-4 w-4 flex justify-center items-center cursor-pointer'
            onClick={() => setAdding(false)}
          >
            <img src={ico_close} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Categories
