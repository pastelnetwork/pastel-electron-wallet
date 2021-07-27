import PastelPaperWalletModal from './PastelPaperWalletModal'
import QRCodeGEnerator from './QRCodeGEnerator'

export type { IPastelPaperWalletModalState } from './PastelPaperWalletModalSlice'
export {
  closePastelPaperWalletModal,
  openPastelPaperWalletModal,
  pastelPaperWalletModalReducer,
} from './PastelPaperWalletModalSlice'

export { QRCodeGEnerator }

export default PastelPaperWalletModal
