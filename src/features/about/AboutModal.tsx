import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './AboutModal.module.css'
import { closeAboutModal } from './AboutModalSlice'

export default function AboutModal(): JSX.Element {
  const { modalIsOpen } = useAppSelector(state => state.aboutModal)
  const appVersion = useAppSelector(state => state.appInfo.appVersion)
  const dispatch = useAppDispatch()

  const txYear = new Date().getFullYear()

  if (!modalIsOpen) {
    return <></>
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(closeAboutModal())}
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
          Pastelwallet Fullnode
        </div>

        <div
          className={styles.well}
          style={{
            textAlign: 'center',
            wordBreak: 'break-all',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <div className={styles.verticalflex}>
            <div className={styles.margintoplarge}>
              Pastelwallet Fullnode v{appVersion}
            </div>
            <div className={styles.margintoplarge}>
              Built with Electron. Copyright (c) 2018-{txYear}.
            </div>
            <div className={styles.margintoplarge}>
              The MIT License (MIT) Copyright (c) 2018-{txYear} Pastelwallet
              <br />
              <br />
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the &quot;Software&quot;), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
              <br />
              <br />
              The above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.
              <br />
              <br />
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
              ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
              AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttoncontainer}>
        <button
          type='button'
          className={styles.primarybutton}
          onClick={() => dispatch(closeAboutModal())}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
