import React, { useState } from 'react'
import cx from 'classnames'

import Typography, { TypographyVariant } from 'common/components/Typography'
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
        <div className='flex items-end pt-8px'>
          {['Comments', 'Notes'].map((each, index) => (
            <div
              key={index}
              onClick={() => setTab(each)}
              className={cx(
                'px-4 cursor-pointer transition duration-300 pt-10px',
                each == tab && 'text-gray-71 border-b border-gray-71 pb-8px',
              )}
            >
              <Typography
                variant={
                  tab === each
                    ? TypographyVariant.h6_14_20_heavy
                    : TypographyVariant.h6_14_20_medium
                }
                customColor={tab === each ? 'text-gray-33' : 'text-gray-71'}
              >
                {each}
              </Typography>
            </div>
          ))}
        </div>
        <img
          src={infoIcon}
          className='w-[13px] absolute right-[11px] top-[9px]'
        />
      </div>
      <div className='mt-2 px-2'>
        <textarea
          placeholder='Type something ...'
          className='resize-none w-full focus:outline-none bg-gray-e4 bg-opacity-[0.2] text-sm font-normal h-[103px] px-12px pt-11px'
        />
      </div>
      <div className='flex justify-end px-7'>
        <div onClick={() => onClose()} className='px-1 pb-4 cursor-pointer'>
          <Typography
            variant={TypographyVariant.h6_14_20_roman}
            customColor='text-blue-3f hover:text-blue-600'
          >
            Save
          </Typography>
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
