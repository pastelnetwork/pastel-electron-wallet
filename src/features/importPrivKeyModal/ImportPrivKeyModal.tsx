import React from 'react'
import Modal from 'react-modal'
import TextareaAutosize from 'react-textarea-autosize'

import cstyles from '../../common/Styles.module.css'

interface ImportPrivKeyModalProps {
  modalIsOpen: boolean
  modalInput?: string
  setModalInput: (value: string) => void
  closeModal: () => void
  doImportPrivKeys: () => void
}

export const removeAllBreakChar = (str: string): string => {
  return str.replace(/\u00ad/g, '')
}

export default function ImportPrivKeyModal({
  modalIsOpen,
  modalInput,
  setModalInput,
  closeModal,
  doImportPrivKeys,
}: ImportPrivKeyModalProps): JSX.Element {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={cstyles.modal}
      overlayClassName={cstyles.modalOverlay}
    >
      <div className={[cstyles.verticalflex].join(' ')}>
        <div
          className={cstyles.marginbottomlarge}
          style={{
            textAlign: 'center',
          }}
        >
          Import Private Keys
        </div>

        <div className={cstyles.marginbottomlarge}>
          Please paste your private or viewing keys here (transparent address or
          shielded address), one line per key.
        </div>

        <div
          className={cstyles.well}
          style={{
            textAlign: 'center',
          }}
        >
          <TextareaAutosize
            className={cstyles.inputbox}
            placeholder='Private Keys'
            value={modalInput}
            onChange={e => setModalInput(removeAllBreakChar(e.target.value))}
          />
        </div>
      </div>

      <div className={cstyles.buttoncontainer}>
        <button
          type='button'
          className={cstyles.primarybutton}
          onClick={() => {
            doImportPrivKeys()
            closeModal()
          }}
        >
          Import
        </button>
        <button
          type='button'
          className={cstyles.primarybutton}
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}
