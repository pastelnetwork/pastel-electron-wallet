import React, { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { closeAboutModal } from './AboutModalSlice'
import { TitleModal } from 'common/components/Modal'

export default function AboutModal(): JSX.Element | null {
  const { modalIsOpen } = useAppSelector(state => state.aboutModal)
  const appVersion = useAppSelector(state => state.appInfo.appVersion)
  const dispatch = useAppDispatch()

  const txYear = new Date().getFullYear()

  const onCloseModal = useCallback(() => {
    dispatch(closeAboutModal())
  }, [])

  if (!modalIsOpen) {
    return null
  }

  const renderAboutContent = () => (
    <div className='flex-col'>
      <div>Pastelwallet Fullnode v{appVersion}</div>
      <div className='mt-6'>
        Built with Electron. Copyright (c) 2018-{txYear}.
      </div>
      <div className='mt-6'>
        The MIT License (MIT) Copyright (c) 2018-{txYear} Pastelwallet
        <br />
        <br />
        Permission is hereby granted, free of charge, to any person obtaining a
        copy of this software and associated documentation files (the
        &quot;Software&quot;), to deal in the Software without restriction,
        including without limitation the rights to use, copy, modify, merge,
        publish, distribute, sublicense, and/or sell copies of the Software, and
        to permit persons to whom the Software is furnished to do so, subject to
        the following conditions:
        <br />
        <br />
        The above copyright notice and this permission notice shall be included
        in all copies or substantial portions of the Software.
        <br />
        <br />
        THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
        KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </div>
    </div>
  )

  return (
    <TitleModal
      isOpen={modalIsOpen}
      handleClose={onCloseModal}
      classNames='max-w-4xl'
      title='Pastel Wallet Fullnode'
    >
      <div className='flex-col pr-8'>
        <div className='p-4 text-center break-all max-h-[400px] overflow-y-auto'>
          {renderAboutContent()}
        </div>
      </div>
    </TitleModal>
  )
}
