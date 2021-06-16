import React, { useState } from 'react'
import Modal from './modal'
import Button from 'common/components/Buttons/Button'
import Checkbox from 'common/components/Checkbox/Checkbox'
import { useToggle } from 'react-use'
import TransferHistoryModal from 'features/nft/nftModals/TransferHistoryModal'

export type TTransferAuthorshipModal = {
  isOpen: boolean
  handleClose: () => void
}

const TransferAuthorshipModal: React.FC<TTransferAuthorshipModal> = ({
  isOpen,
  handleClose,
}) => {
  const data = {
    history:
      'Twee chartreuse etsy, +1 dreamcatcher lumbersexual before they sold out drinking vinegar pinterest mumblecore tousled occupy brunch whatever ugh.',
    pastelID: 'ps19jxlfdl8mhn',
  }
  const [isChecked, setChecked] = useState(true)
  const [pastelID, setPastelID] = useState(data.pastelID)
  const [showTransferHistory, toggleShowTransferHistory] = useToggle(false)

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='478px'
      title={'Tansfer Royalty\nCompensation Rights'}
      infoIcon={true}
    >
      <div>
        <div>
          <button
            type='button'
            className='block link text-sm font-medium'
            onClick={toggleShowTransferHistory}
          >
            Transfer History
          </button>
        </div>
        <div className='flex text-gray-77 text-18px mt-12px'>
          {data.history}
        </div>
        <div>
          <div className='mt-22px text-gray-71 leading-tight'>
            Pastel ID of recipient
          </div>
          <div className='mt-10px h-40px border rounded border-gray-e7 flex items-center'>
            <input
              className='w-full border-none outline-none rounded text-gray-2d px-4'
              value={pastelID}
              onChange={e => setPastelID(e.target.value)}
            />
          </div>
          <div className='mt-5 mb-5 flex text-gray-a0 text-sm leading-tight'>
            <Checkbox
              isChecked={isChecked}
              clickHandler={() => setChecked(!isChecked)}
            />
            <span className='ml-3'>
              Yes, I confirm the transfer of royalty compensation rights
            </span>
          </div>
        </div>
        <Button
          variant='default'
          className='flex items-center justify-center w-full'
        >
          <span className='font-bold'>Submit</span>
        </Button>

        <TransferHistoryModal
          isOpen={showTransferHistory}
          handleClose={toggleShowTransferHistory}
        />
      </div>
    </Modal>
  )
}

export default TransferAuthorshipModal
