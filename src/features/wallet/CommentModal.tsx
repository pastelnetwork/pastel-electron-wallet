import React, { useState } from 'react'
import cx from 'classnames'
import styled from 'styled-components'
import infoIcon from '../../common/assets/icons/ico-info.svg'

export interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
}

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-top: 16px solid white;
  filter: drop-shadow(1px 1px 1px #e5e7eb);
`

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
        <Triangle className='absolute bottom-0 left-1/2 transform -translate-x-2/4 translate-y-full' />
      </div>
    </div>
  )
}

export default CommentModal
