import React from 'react'

type PastelIDSuccessModalProps = {
  pastelid: string
  txid: string
}

export default function PastelIDSuccessModal({
  txid,
  pastelid,
}: PastelIDSuccessModalProps): JSX.Element {
  return (
    <div>
      <div>PastelID: {pastelid}</div>
      <div>TXID: {txid}</div>
    </div>
  )
}
