import React from 'react'
import Modal from 'react-modal'

import cstyles from '../../legacy/components/Common.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import styles from './PastelModal.module.css'
import { closePastelModal } from './PastelModalSlice'

export default function PastelModal(): JSX.Element {
  const { title, body, opened } = useAppSelector(
    (state: RootState) => state.pastelModal,
  )
  const dispatch = useAppDispatch()

  function renderModalContent() {
    if (body && body.length > 0) {
      return body.map((content: string, idx: number) => (
        <p className={styles.content} key={idx}>
          {content}
        </p>
      ))
    }

    return null
  }

  return (
    <Modal
      isOpen={opened}
      onRequestClose={() => dispatch(closePastelModal())}
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
          {title}
        </div>

        <div
          className={cstyles.well}
          style={{
            textAlign: 'center',
            wordBreak: 'break-all',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          {renderModalContent()}
        </div>
      </div>

      <div className={cstyles.buttoncontainer}>
        <button
          type='button'
          className={cstyles.primarybutton}
          onClick={() => dispatch(closePastelModal())}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
