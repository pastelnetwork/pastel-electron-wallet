import Modal from 'react-modal'
import React from 'react'
import cstyles from '../../components/Common.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { closeErrorModal } from './errorModalSlice'

export default function ErrorModal(): JSX.Element {
  const { title, body, opened } = useAppSelector(state => state.errorModal)
  const dispatch = useAppDispatch()

  return (
    <Modal
      isOpen={opened}
      onRequestClose={() => dispatch(closeErrorModal())}
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
          {body}
        </div>
      </div>

      <div className={cstyles.buttoncontainer}>
        <button
          type='button'
          className={cstyles.primarybutton}
          onClick={() => dispatch(closeErrorModal())}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
