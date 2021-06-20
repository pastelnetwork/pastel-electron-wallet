import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './SearchResultsModal.css'
import { closeSearchResultsModal } from './SearchResultsModalSlice'

const SearchResultsModal = (): JSX.Element => {
  const { modalIsOpen } = useAppSelector(state => state.searchResultsModal)
  console.log('modalIsOpen', modalIsOpen)
  const dispatch = useAppDispatch()

  if (!modalIsOpen) {
    return <></>
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(closeSearchResultsModal())}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
    >
      <div className={[styles.verticalflex].join(' ')}>
        <div
          className={styles.marginbottomlarge}
          style={{
            textAlign: 'center',
          }}
        >
          Search Results
        </div>

        <div
          className={styles.well}
          style={{
            textAlign: 'center',
            wordBreak: 'break-all',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        ></div>
      </div>

      <div className={''}>
        <button
          type='button'
          className={''}
          onClick={() => dispatch(closeSearchResultsModal())}
        >
          x
        </button>
        SEARCH RES
      </div>
    </Modal>
  )
}

export default SearchResultsModal
