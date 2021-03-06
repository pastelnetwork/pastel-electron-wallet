import React, { useState, useEffect, useCallback } from 'react'
import cx from 'classnames'

import Tooltip from 'common/components/Tooltip'
import { EliminationIcon } from 'common/components/Icons'
import { translate } from 'features/app/translations'
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

export default function CommentModal({
  isOpen,
  onClose,
  address,
  onSavePaymentNote,
  defaultsNote,
}: TCommentModalProps): JSX.Element {
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

  const handleSetActiveRecipientTab = useCallback(() => {
    setTab(Tabs.NoteToRecipient)
  }, [tab])

  const handleSetActivePrivateNoteTab = useCallback(() => {
    setTab(Tabs.PrivateNote)
  }, [tab])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      if (tab === Tabs.NoteToRecipient) {
        setNote(value)
      } else {
        setPrivateNote(value)
      }
    },
    [note, privateNote],
  )

  const handleSave = useCallback(() => {
    onSavePaymentNote({
      address,
      recipientNote: note,
      privateNote,
    })
    onClose()
  }, [])

  const renderSaveButton = () => (
    <button
      onClick={handleSave}
      className='px-1 pb-4 cursor-pointer'
      type='button'
    >
      <div className='text-blue-3f hover:text-blue-600 text-h6-leading-20'>
        {translate('save')}
      </div>
    </button>
  )

  const renderIntroIcon = () => (
    <Tooltip
      classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs top-[-46px]'
      wrapperClassNames='absolute top-0 right-0'
      content={
        tab === Tabs.NoteToRecipient
          ? translate('commentNoteToRecipientToolTipContent')
          : translate('commentPrivateNoteToolTipContent')
      }
      width={220}
      type='left'
    >
      <EliminationIcon
        size={13}
        className='text-gray-8e cursor-pointer hover:rounded-full hover:bg-gray-f6 active:bg-gray-ec transition duration-300'
      />
    </Tooltip>
  )

  const renderTabHeader = () => (
    <div className='flex items-end pt-8px'>
      <div
        onClick={handleSetActiveRecipientTab}
        className={cx(
          'px-4 cursor-pointer transition duration-300 pt-10px',
          Tabs.NoteToRecipient == tab &&
            'text-gray-71 border-b border-gray-71 pb-8px',
        )}
        role='button'
        tabIndex={0}
        aria-hidden='true'
      >
        <div
          className={cx(
            tab === Tabs.NoteToRecipient
              ? 'text-gray-33 text-h6-leading-20-heavy'
              : 'text-gray-71 text-h6-leading-20-medium',
          )}
        >
          {translate('noteToRecipient')}
        </div>
      </div>
      <div
        onClick={handleSetActivePrivateNoteTab}
        className={cx(
          'px-4 cursor-pointer transition duration-300 pt-10px',
          Tabs.PrivateNote == tab &&
            'text-gray-71 border-b border-gray-71 pb-8px',
        )}
        role='button'
        tabIndex={0}
        aria-hidden='true'
      >
        <div
          className={cx(
            tab === Tabs.PrivateNote
              ? 'text-gray-33 text-h6-leading-20-heavy'
              : 'text-gray-71 text-h6-leading-20-medium',
          )}
        >
          {translate('privateNote')}
        </div>
      </div>
    </div>
  )

  return (
    <div
      className={cx(
        !isOpen && 'hidden',
        'ml-4 w-371px absolute bottom-12 transform -translate-x-1/2 border border-gray-f3 rounded bg-white shadow-textbox',
      )}
    >
      <div className='px-4 flex text-gray-a0 border-b border-gray-f3 justify-between'>
        {renderTabHeader()}
        <div className='ml-9px absolute right-[11px] top-[9px]'>
          {renderIntroIcon()}
        </div>
      </div>
      <div className='mt-2 px-2'>
        <textarea
          placeholder='Type something ...'
          className='resize-none w-full focus:outline-none bg-gray-e4 bg-opacity-[0.2] text-sm font-normal h-[103px] px-12px pt-11px'
          value={tab === Tabs.NoteToRecipient ? note : privateNote}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex justify-end px-7'>{renderSaveButton()}</div>
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
