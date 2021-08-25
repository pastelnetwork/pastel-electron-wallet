import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'

import { WalletRPC } from 'api/pastel-rpc'
import { TitleModal } from 'common/components/Modal'
import Spinner from 'common/components/Spinner'

type TQRCodeModalProps = {
  isOpen: boolean
  address: string
  handleClose: () => void
}

export default function QRCodeModal({
  isOpen,
  address,
  handleClose,
}: TQRCodeModalProps): JSX.Element {
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
  }, [address])

  return (
    <TitleModal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      title='Address QR'
      classNames='w-[598px]'
    >
      <div className='flex items-center justify-center pt-6 pb-4'>
        {loading ? (
          <Spinner className='w-8 h-8 text-blue-3f' />
        ) : (
          <>
            <QRCode value={privateKey} renderAs='svg' size={480} />
          </>
        )}
      </div>
    </TitleModal>
  )
}
