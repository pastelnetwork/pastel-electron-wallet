import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  memo,
} from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closeExportPrivKeyModal } from './index'
import { walletRPC } from 'api/pastel-rpc'

const TextareaControl = memo(function TextareaControl({
  exportedPrivKeys,
  setExportedPrivKeys,
}: {
  exportedPrivKeys: string[]
  setExportedPrivKeys: (val: string[]) => void
}): JSX.Element {
  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setExportedPrivKeys([e.target.value])
  }, [])

  return (
    <div className='mt-3'>
      <textarea
        placeholder='Private Keys'
        className={
          'w-full rounded shadow-2px py-2 px-4 outline-none h-full resize-none text-base text-gray-4a font-normal leading-6 bg-gray-100 min-h-[140px]'
        }
        value={exportedPrivKeys.join('\n')}
        onChange={onChange}
        readOnly
      />
    </div>
  )
})

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
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
  }, [exportPrivKeyModalIsOpen])

  const handleCloseModal = useCallback(() => {
    dispatch(closeExportPrivKeyModal())
  }, [])

  if (!exportPrivKeyModalIsOpen) {
    return null
  }

  return (
    <TitleModal
      isOpen={exportPrivKeyModalIsOpen}
      handleClose={handleCloseModal}
      classNames='max-w-[700px]'
      title='Your Wallet Private Keys'
    >
      <div className='pr-8 pb-2'>
        <div className='mt-6'>
          These are all the private keys in your wallet. Please store them
          carefully!
        </div>
        <TextareaControl
          exportedPrivKeys={exportedPrivKeys}
          setExportedPrivKeys={setExportedPrivKeys}
        />
      </div>
    </TitleModal>
  )
}
