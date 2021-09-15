import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closeExportPrivKeyModal } from './index'
import { Button } from 'common/components/Buttons'

export default function ExportPrivKeyModal(): JSX.Element | null {
  const dispatch = useAppDispatch()
  const { exportPrivKeyModalIsOpen } = useAppSelector(state => state.utilities)
  const [exportedPrivKeys, setExportedPrivKeys] = useState<string[]>([])

  if (!exportPrivKeyModalIsOpen) {
    return null
  }

  return (
    <TitleModal
      isOpen={exportPrivKeyModalIsOpen}
      handleClose={() => dispatch(closeExportPrivKeyModal())}
      classNames='max-w-[700px]'
    >
      <div className='mt-2 text-center text-gray-800 text-2xl font-extrabold mb-0.5'>
        Your Wallet Private Keys
      </div>
      <div className='mt-6'>
        These are all the private keys in your wallet. Please store them
        carefully!
      </div>
      <div className='mt-3'>
        <textarea
          placeholder='Private Keys'
          className='w-full rounded shadow-2px py-2 px-4 outline-none h-10 resize-none text-base text-gray-4a font-normal leading-6'
          value={exportedPrivKeys.join('\n')}
          onChange={e => setExportedPrivKeys([e.target.value])}
        />
      </div>
      <div className='mt-4 flex justify-center'>
        <Button
          variant='secondary'
          className='w-[120px] px-0'
          childrenClassName='w-full'
          onClick={() => dispatch(closeExportPrivKeyModal())}
        >
          <div className='flex items-center justify-center'>
            <div className='text-blue-3f text-h5-medium'>Close</div>
          </div>
        </Button>
      </div>
    </TitleModal>
  )
}
