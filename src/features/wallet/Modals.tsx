import React from 'react'
import { useWalletScreenContext } from './walletScreen.context'
import PaymentModal from './PaymentModal'
import TransactionHistoryModal from './TransactionHistoryModal'
import ExportKeysModal from './ExportKeysModal'
import QRCodeModal from './QRCodeModal'
import AddPastelPromoCodeModal from './AddPastelPromoCodeModal'

export default function Modals(): JSX.Element | null {
  const {
    isPaymentModalOpen,
    isTransactionHistoryModalOpen,
    isExportKeysModalOpen,
    isQRCodeModalOpen,
    isAddPastelPromoCodeModalOpen,
  } = useWalletScreenContext()

  if (isPaymentModalOpen) {
    return <PaymentModal />
  } else if (isTransactionHistoryModalOpen) {
    return <TransactionHistoryModal />
  } else if (isExportKeysModalOpen) {
    return <ExportKeysModal />
  } else if (isQRCodeModalOpen) {
    return <QRCodeModal />
  } else if (isAddPastelPromoCodeModalOpen) {
    return <AddPastelPromoCodeModal />
  }

  return null
}
