import React from 'react'
import Modal from './modal'
import Table from './table'

export type TTransferHistoryModal = {
  isOpen: boolean
  handleClose: () => void
}

const TransferHistoryModal: React.FC<TTransferHistoryModal> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='874px'
      title={'Royalty rights transfer history'}
      titleClassName='text-2xl font-black text-gray-2d'
      infoIcon={true}
      bodyClassName='px-0'
    >
      <div className='ml-10 mr-9 mb-6 w- overflow-auto w-[798px]'>
        <div className='mr-8'>
          <Table
            columns={Columns}
            data={tableData}
            className='h-401px'
            trClassName='border-b border-gray-f2'
          />
        </div>
      </div>
    </Modal>
  )
}

const Columns = [
  {
    name: 'Date',
    className: 'pl-4 w-234px',
  },
  {
    name: 'Sender',
    className: 'pl-4 w-200px',
  },
  {
    name: 'Recipient',
  },
]

const tableData = [
  {
    Date: '11/04/21 01:43',
    Sender: 'Banksy123',
    Recipient: '2654843-5933',
  },
]

export default TransferHistoryModal
