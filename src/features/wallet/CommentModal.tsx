import React, { useState, useEffect } from 'react'
import cx from 'classnames'

import Tooltip from 'common/components/Tooltip'
import { EliminationIcon } from 'common/components/Icons'
import styles from './CommentModal.module.css'

export type TNote = {
  address: string
  recipientNote: string
  privateNote: string
}

export type TCommentModalProps = {
  isOpen: boolean
  onClose: () => void
  address: string
  onSavePaymentNote: (note: TNote) => void
  defaultsNote: string
}

enum Tabs {
  NoteToRecipient,
  PrivateNote,
}

const CommentModal = ({
  isOpen,
  onClose,
  address,
  onSavePaymentNote,
  defaultsNote,
}: TCommentModalProps): JSX.Element => {
  const [tab, setTab] = useState(Tabs.NoteToRecipient)
  const [note, setNote] = useState(defaultsNote || '')
  const [privateNote, setPrivateNote] = useState('')

  useEffect(() => {
    if (defaultsNote) {
      onSavePaymentNote({
        address,
        recipientNote: defaultsNote,
        privateNote,
      })
    }
  }, [defaultsNote])

  const handleInputChange = (value: string) => {
    if (tab === Tabs.NoteToRecipient) {
      setNote(value)
    } else {
      setPrivateNote(value)
    }
  }

  const handleSave = () => {
    onSavePaymentNote({
      address,
      recipientNote: note,
      privateNote,
    })
    onClose()
  }

  return (
    <div
      className={cx(
        !isOpen && 'hidden',
        'ml-4 w-371px absolute bottom-12 transform -translate-x-1/2 border border-gray-f3 rounded bg-white shadow-textbox',
      )}
    >
      <div className='px-4 flex text-gray-a0 border-b border-gray-f3 justify-between'>
        <div className='flex items-end pt-8px'>
          <div
            onClick={() => setTab(Tabs.NoteToRecipient)}
            className={cx(
              'px-4 cursor-pointer transition duration-300 pt-10px',
              Tabs.NoteToRecipient == tab &&
                'text-gray-71 border-b border-gray-71 pb-8px',
            )}
          >
            <div
              className={cx(
                tab === Tabs.NoteToRecipient
                  ? 'text-gray-33 text-h6-leading-20-heavy'
                  : 'text-gray-71 text-h6-leading-20-medium',
              )}
            >
              Note to Recipient
            </div>
          </div>
          <div
            onClick={() => setTab(Tabs.PrivateNote)}
            className={cx(
              'px-4 cursor-pointer transition duration-300 pt-10px',
              Tabs.PrivateNote == tab &&
                'text-gray-71 border-b border-gray-71 pb-8px',
            )}
          >
            <div
              className={cx(
                tab === Tabs.PrivateNote
                  ? 'text-gray-33 text-h6-leading-20-heavy'
                  : 'text-gray-71 text-h6-leading-20-medium',
              )}
            >
              Private Note
            </div>
          </div>
        </div>
        <div className='ml-9px absolute right-[11px] top-[9px]'>
          <Tooltip
            classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs top-[-46px]'
            wrapperClassNames='absolute top-0 right-0'
            content={
              tab === Tabs.NoteToRecipient
                ? 'You can include a short message to the recipient if the recipient’s address is a shielded PSL address; this message will only be visible to the recipient.'
                : 'This is a short note that is only visible to you; it can be used to record a short note to yourself reminding you of the purpose of the transaction. For example “Sent PSL to brother for cat NFT”'
            }
            width={220}
            type='left'
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
          value={tab === Tabs.NoteToRecipient ? note : privateNote}
          onChange={e => handleInputChange(e.target.value)}
        />
      </div>
      <div className='flex justify-end px-7'>
        <div onClick={handleSave} className='px-1 pb-4 cursor-pointer'>
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
