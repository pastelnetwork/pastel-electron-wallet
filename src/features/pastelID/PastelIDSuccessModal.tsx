import React from 'react'

type PastelIDSuccessModalProps = {
  pastelid: string
  txid: string
}

export default function PastelIDSuccessModal(
  props: PastelIDSuccessModalProps,
): JSX.Element {
  return (
    <div>
      <div>PastelID: {props.pastelid}</div>
      <div>TXID: {props.txid}</div>
    </div>
  )
}
