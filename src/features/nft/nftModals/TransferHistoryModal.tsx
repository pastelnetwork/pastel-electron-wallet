import React, { useCallback } from 'react'
import Modal from './modal'
import Table from './table'
import { Quit } from 'common/components/Icons'
import Tooltip from 'common/components/Tooltip'
import { translate } from 'features/app/translations'
import SampleAvatar from 'common/assets/images/avatar-placeholder.png'

export type TTransferHistoryModal = {
  isOpen: boolean
  handleClose: () => void
}

const getTooltip = () => {
  return (
    <div className='p-2 text-xs'>
      <div>{translate('pastelExplorer')}</div>
      <div className='text-gray-a0'>
        {translate('linkToTheBlockchainTransaction')}
      </div>
    </div>
  )
}

const tableData = [
  {
    Date: '11/04/21 01:43',
    Sender: 'Banksy123',
    Recipient: 'Reymundo',
  },
  {
    Date: '11/04/21 01:43',
    Sender: 'Gerald',
    Recipient: 'Harber',
  },
]

function TransferHistoryModal({
  isOpen,
  handleClose,
}: TTransferHistoryModal): JSX.Element {
  const Columns = [
    {
      name: translate('date'),
      key: 'Date',
      className: 'pl-4 w-[180px]',
      sortable: true,
    },
    {
      name: translate('sender'),
      key: 'Sender',
      className: 'pl-4 w-[200px]',
      sortable: true,
      custom: (value: string) => (
        <div className='flex items-center'>
          <img
            className='mr-2'
            src={SampleAvatar}
            width={18}
            height={18}
            alt='sender avatar'
          />
          <div className='font-medium'>{value}</div>
        </div>
      ),
    },
    {
      name: translate('recipient'),
      key: 'Recipient',
      sortable: true,
      className: 'w-[140px]',
      custom: (value: string) => (
        <div className='flex items-center'>
          <img
            className='mr-2'
            src={SampleAvatar}
            width={18}
            height={18}
            alt='sender avatar'
          />
          <div className='font-medium'>{value}</div>
        </div>
      ),
    },
    {
      name: translate('transactionID'),
      key: 'Transaction ID',
      align: 'center',
      custom: () => (
        <div className='flex justify-center'>
          <Tooltip type='top' width={210} content={getTooltip()}>
            <Quit size={16} className='text-blue-3f' />
          </Tooltip>
        </div>
      ),
    },
  ]

  const renderTransferHistoryTable = () => (
    <div className='mr-8'>
      <Table
        columns={Columns}
        data={tableData}
        className='h-401px'
        trClassName='border-b border-gray-f2'
      />
    </div>
  )

  const handleModalClose = useCallback(() => {
    handleClose()
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleModalClose}
      size='874px'
      title={translate('royaltyRightsTransferHistory')}
      titleClassName='text-2xl font-black text-gray-2d'
      infoIcon
      bodyClassName='px-0'
    >
      <div className='ml-10 mr-9 mb-6 w- overflow-auto w-[798px]'>
        {renderTransferHistoryTable()}
      </div>
    </Modal>
  )
}

export default TransferHistoryModal
