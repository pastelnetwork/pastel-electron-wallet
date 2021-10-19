import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closeExportPrivKeyModal } from './index'
import { walletRPC } from 'api/pastel-rpc'

import styles from './ExportPrivKeyModal.module.css'

export default function ExportPrivKeyModal(): JSX.Element | null {
  const dispatch = useAppDispatch()
  const { exportPrivKeyModalIsOpen } = useAppSelector(state => state.utilities)
  const [exportedPrivKeys, setExportedPrivKeys] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const addresses = await walletRPC.fetchAllAddresses()
      const privKeys = []
      for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i]
        const privKey = await walletRPC.getPrivKeyAsString(address)
        privKeys.push(`${privKey} #${address}`)
      }

      setExportedPrivKeys(privKeys)
    }

    fetchData()
  }, [exportPrivKeyModalIsOpen])

  if (!exportPrivKeyModalIsOpen) {
    return null
  }

  return (
    <TitleModal
      isOpen={exportPrivKeyModalIsOpen}
      handleClose={() => dispatch(closeExportPrivKeyModal())}
      classNames='max-w-[700px]'
      title='Your Wallet Private Keys'
    >
      <div className='pr-8'>
        <div className='mt-6'>
          These are all the private keys in your wallet. Please store them
          carefully!
        </div>
        <div className='mt-3'>
          <textarea
            placeholder='Private Keys'
            className={cn(
              'w-full rounded shadow-2px py-2 px-4 outline-none h-full resize-none text-base text-gray-4a font-normal leading-6 bg-gray-100',
              styles.exportedPrivKeys,
            )}
            value={exportedPrivKeys.join('\n')}
            onChange={e => setExportedPrivKeys([e.target.value])}
            readOnly
          />
        </div>
      </div>
    </TitleModal>
  )
}
