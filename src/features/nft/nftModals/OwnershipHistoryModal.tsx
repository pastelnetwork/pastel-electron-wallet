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
    >
      <div>
        <Table
          columns={Columns}
          data={tableData}
          fixedHeader={true}
          bodyClassName='h-401px'
        />
      </div>
    </Modal>
  )
}

const Columns = [
  {
    name: 'Deal',
    className: 'text-gray-4a font-bold pl-8',
  },
  {
    name: 'Date',
  },
  {
    name: 'Owner',
    className: 'text-gray-4a',
  },
  {
    name: 'Fee paid',
    className: 'text-gray-4a',
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
