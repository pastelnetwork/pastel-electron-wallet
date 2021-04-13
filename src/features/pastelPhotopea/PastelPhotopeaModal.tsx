import React, { useState } from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import PastelLoading from '../pastelLoading'
import styles from './PastelPhotopeaModal.module.css'
import { closePastelPhotopeaModal } from './PastelPhotopeaModalSlice'

export default function PastelPhotopeaModal(): JSX.Element {
  const { modalIsOpen } = useAppSelector(state => state.pastelPhotopeaModal)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)

  if (!modalIsOpen) {
    return <></>
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(closePastelPhotopeaModal())}
      className={styles.modalWrapper}
    >
      <div className={styles.modalContent}>
        <button
          type='button'
          className={styles.btn_close}
          onClick={() => dispatch(closePastelPhotopeaModal())}
        >
          X
        </button>
        <div className={styles.iframe}>
          <PastelLoading loadingIsOpen={isLoading} />
          <iframe
            id='photopea'
            src='https://www.photopea.com'
            onLoad={() => setTimeout(() => setIsLoading(false), 100)}
          />
        </div>
      </div>
    </Modal>
  )
}
