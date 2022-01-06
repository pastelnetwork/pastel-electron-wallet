import React, { useCallback } from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './PastelPhotopeaModal.module.css'
import { closePastelPhotopeaModal } from './PastelPhotopeaModalSlice'

export default function PastelPhotopeaModal(): JSX.Element {
  const { modalIsOpen } = useAppSelector(state => state.pastelPhotopeaModal)
  const dispatch = useAppDispatch()

  const onCloseModal = useCallback(() => {
    dispatch(closePastelPhotopeaModal())
  }, [])

  const renderIframeContent = () => (
    <div className={styles.iframe}>
      <iframe
        id='photopea'
        src='https://www.photopea.com'
        title='Photopea tool'
      />
    </div>
  )

  return (
    <Modal
      isOpen
      onRequestClose={onCloseModal}
      className={styles.modalWrapper}
      overlayClassName={`${styles.overlay} ${modalIsOpen ? styles.open : ''}`}
    >
      <div className={styles.modalContent}>
        <button
          type='button'
          className={styles.btn_close}
          onClick={onCloseModal}
        >
          X
        </button>
        {renderIframeContent()}
      </div>
    </Modal>
  )
}
