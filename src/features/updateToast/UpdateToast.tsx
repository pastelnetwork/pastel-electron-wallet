import { shell } from 'electron'
import React from 'react'

import pkg from '../../../package.json'
import { CloseButton, Button } from '../../common/components/Buttons'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { closeUpdateToast } from './UpdateToastSlice'
import { sendEventToMain } from '../app/rendererEvents'

export default function UpdateToast(): JSX.Element | null {
  const { opened } = useAppSelector(state => state.updateToast)
  const dispatch = useAppDispatch()

  const openLearnMore = () => {
    shell.openExternal(`https://github.com/${pkg.repoName}/releases`)
  }

  const handleUpdate = () => {
    dispatch(closeUpdateToast())
    sendEventToMain('restartApp', null)
  }

  if (!opened) {
    return null
  }

  return (
    <div
      id='updateToast'
      className='fixed bottom-3 right-3 z-100 paper pt-10 px-6 pb-6 w-96'
    >
      <CloseButton
        className='absolute right-4 top-4'
        onClick={() => dispatch(closeUpdateToast())}
      />
      <div className='text-base font-medium text-gray-4a mb-25px mt-6'>
        Would you like to update to the new version of Wallet? Recommended!
      </div>
      <div className='flex justify-center items-center'>
        <Button onClick={handleUpdate} className='mr-4 w-2/5'>
          OK
        </Button>
        <Button onClick={openLearnMore} variant='secondary' className='w-2/5'>
          Learn more
        </Button>
      </div>
    </div>
  )
}
