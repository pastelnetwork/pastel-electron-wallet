import React, { useState } from 'react'
import Modal from './modal'
import Button from 'common/components/Button/Button'
import Checkbox from 'common/components/Checkbox/Checkbox'

export type TTransferAuthorshipModal = {
  isOpen: boolean
  handleClose: () => void
}

const TransferAuthorshipModal: React.FC<TTransferAuthorshipModal> = ({
  isOpen,
  handleClose,
}) => {
  const [isChecked, setChecked] = useState(true)

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='478px'
      title={'Tansfer Royalty\nCompensation Rights'}
      infoIcon={true}
    >
      <div>
        <div className='flex text-gray-77 text-18px'>
          Twee chartreuse etsy, +1 dreamcatcher lumbersexual before they sold
          out drinking vinegar pinterest mumblecore tousled occupy brunch
          whatever ugh.
        </div>
        <div>
          <div className='mt-22px text-gray-71 leading-tight'>
            Pastel ID of recipient
          </div>
          <div className='mt-10px h-40px border rounded border-gray-e7 flex items-center'>
            <input
              className='w-full border-none outline-none rounded text-gray-2d px-4'
              value='ps19jxlfdl8mhn'
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
          <Button variant='default'>
            <div className='flex items-center justify-center ml-6'>
              <span className='font-bold'>Submit</span>
            </div>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default TransferAuthorshipModal
