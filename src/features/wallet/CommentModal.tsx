import React, { useState } from 'react'
import cx from 'classnames'
import styles from './CommentModal.module.css'
import infoIcon from '../../common/assets/icons/ico-info.svg'

export interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
}

const CommentModal = ({ isOpen, onClose }: CommentModalProps): JSX.Element => {
  const [tab, setTab] = useState('Comments')
  return (
    <div
      className={cx(
        !isOpen && 'hidden',
        'ml-2 w-371px absolute bottom-12 transform -translate-x-1/2 border border-gray-f3 rounded bg-white shadow-textbox',
      )}
    >
      <div className='px-4 flex text-gray-a0 border-b border-gray-f3 justify-between'>
        <div className='flex'>
          {['Comments', 'Notes'].map((each, index) => (
            <div
              key={index}
              onClick={() => setTab(each)}
              className={cx(
                'px-4 py-2 cursor-pointer',
                each == tab && 'text-gray-71 border-b border-gray-71',
              )}
            >
              {each}
            </div>
          ))}
        </div>
        <img src={infoIcon} />
      </div>
      <div className='px-7 pt-4'>
        <textarea
          placeholder='Type something ...'
          className='resize-none w-full focus:outline-none'
        />
      </div>
      <div className='flex justify-end px-7'>
        <div
          onClick={() => onClose()}
          className='text-blue-3f hover:text-blue-600 px-1 pb-4 cursor-pointer'
        >
          Save
        </div>
      </div>
      <div>
        <div
          className={cx(
            'absolute bottom-0 left-1/2 transform -translate-x-2/4 translate-y-full w-0 h-0',
            styles.triangle,
          )}
        />
      </div>
    </div>
  )
}

export default CommentModal
