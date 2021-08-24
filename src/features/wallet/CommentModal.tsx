import React, { useState } from 'react'
import cx from 'classnames'

import Tooltip from 'common/components/Tooltip'
import { EliminationIcon } from 'common/components/Icons'
import styles from './CommentModal.module.css'

export type TCommentModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CommentModal = ({ isOpen, onClose }: TCommentModalProps): JSX.Element => {
  const [tab, setTab] = useState('Note')
  return (
    <div
      className={cx(
        !isOpen && 'hidden',
        'ml-4 w-371px absolute bottom-12 transform -translate-x-1/2 border border-gray-f3 rounded bg-white shadow-textbox',
      )}
    >
      <div className='px-4 flex text-gray-a0 border-b border-gray-f3 justify-between'>
        <div className='flex items-end pt-8px'>
          {['Note', 'Private Note'].map((each, index) => (
            <div
              key={index}
              onClick={() => setTab(each)}
              className={cx(
                'px-4 cursor-pointer transition duration-300 pt-10px',
                each == tab && 'text-gray-71 border-b border-gray-71 pb-8px',
              )}
            >
              <div
                className={cx(
                  tab === each
                    ? 'text-gray-33 text-h6-leading-20-heavy'
                    : 'text-gray-71 text-h6-leading-20-medium',
                )}
              >
                {each}
              </div>
            </div>
          ))}
        </div>
        <div className='ml-9px absolute right-[11px] top-[9px]'>
          <Tooltip
            classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
            wrapperClassNames='absolute top-0 right-0'
            content='Info'
            width={110}
            type='top'
          >
            <EliminationIcon
              size={13}
              className='text-gray-8e cursor-pointer hover:rounded-full hover:bg-gray-f6 active:bg-gray-ec transition duration-300'
            />
          </Tooltip>
        </div>
      </div>
      <div className='mt-2 px-2'>
        <textarea
          placeholder='Type something ...'
          className='resize-none w-full focus:outline-none bg-gray-e4 bg-opacity-[0.2] text-sm font-normal h-[103px] px-12px pt-11px'
        />
      </div>
      <div className='flex justify-end px-7'>
        <div onClick={() => onClose()} className='px-1 pb-4 cursor-pointer'>
          <div className='text-blue-3f hover:text-blue-600 text-h6-leading-20'>
            Save
          </div>
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
