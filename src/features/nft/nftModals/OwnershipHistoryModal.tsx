import React from 'react'
import Modal from './modal'
import Table from './table'

export type TOwnershipHistoryModal = {
  isOpen: boolean
  handleClose: () => void
}

const OwnershipHistoryModal: React.FC<TOwnershipHistoryModal> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='874px'
      title={'“Diamonds in the sky”: copy #1 ownership history'}
      infoIcon={true}
      bodyClassName='pr-9 pl-10'
      titleClassName='font-black text-2xl text-gray-2d'
    >
      <div className='md:w-[798px]'>
        <Table
          columns={Columns}
          data={tableData}
          fixedHeader={true}
          bodyClassName='h-401px'
          trClassName='border-b border-gray-f2'
        />
      </div>
    </Modal>
  )
}

const Columns = [
  {
    name: 'Deal',
    className: 'pl-8',
    tdClassName: 'text-gray-71 font-medium',
  },
  {
    name: 'Date',
    tdClassName: 'text-gray-a0 font-medium',
  },
  {
    name: 'Owner',
    tdClassName: 'text-gray-4a font-medium',
  },
  {
    name: 'Fee paid',
    tdClassName: 'text-gray-4a font-medium',
  },
]

const tableData = [
  {
    Deal: '#1',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#2',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#3',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#4',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#5',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#6',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#7',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#8',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#1',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#1',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#1',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
  {
    Deal: '#1',
    Date: '11/11/21 16:55',
    Owner: 'SuperDealer21',
    'Fee paid': '1,1mm PSL',
  },
]

export default OwnershipHistoryModal
