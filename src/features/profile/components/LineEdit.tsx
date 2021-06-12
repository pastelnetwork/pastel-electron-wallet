import React from 'react'
import cx from 'classnames'
import ico_close from '../../../common/assets/icons/ico-close-round.svg'

export type TLineEdit = {
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}

const LineEdit = ({ value, onChange }: TLineEdit): JSX.Element => {
  return (
    <div className='border rounded h-10 flex flex-grow shadow-editbox relative'>
      <input
        className='border-none rounded bg-transparent outline-none h-full pl-4 text-gray-4a flex-grow'
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <img
        className={cx('cursor-pointer w-18px mx-2', !value.length && 'hidden')}
        onClick={() => onChange('')}
        src={ico_close}
      />
    </div>
  )
}

export default LineEdit
