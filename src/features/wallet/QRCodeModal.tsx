import React, { useCallback, useEffect, useState } from 'react'
import QRCode from 'qrcode.react'

import { WalletRPC } from 'api/pastel-rpc'
import { TitleModal } from 'common/components/Modal'
import Spinner from 'common/components/Spinner'
import { useWalletScreenContext } from './walletScreen.context'
import { translate } from 'features/app/translations'

export default function QRCodeModal(): JSX.Element {
  const {
    currentAddress: address = '',
    setIsQRCodeModalOpen: setIsOpen,
  } = useWalletScreenContext()

  const handleClose = useCallback(() => setIsOpen(false), [])

  const [privateKey, setPrivateKey] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const walletRPC = new WalletRPC()
    const getKeys = async () => {
      setLoading(true)
      const privKey = await walletRPC.getPrivKeyAsString(address)
      setPrivateKey(privKey)
      setLoading(false)
    }
    getKeys()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
  }, [address])

  return (
    <TitleModal
      isOpen
      handleClose={handleClose}
      title={translate('addressQR')}
      classNames='w-[598px]'
    >
      <div className='flex items-center justify-center pt-6 pb-4 pr-22px'>
        {loading ? (
          <Spinner className='w-8 h-8 text-blue-3f' />
        ) : (
          <QRCode value={privateKey} renderAs='svg' size={480} />
        )}
      </div>
    </TitleModal>
  )
}
