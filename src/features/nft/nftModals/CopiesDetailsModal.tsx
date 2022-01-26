import React, { useCallback } from 'react'

import Modal from './modal'
import Table from './table'
import { translate } from 'features/app/translations'

export type TCopiesDetailsModal = {
  isOpen: boolean
  handleClose: () => void
}

function CopiesDetailsModal({
  isOpen,
  handleClose,
}: TCopiesDetailsModal): JSX.Element {
  const Columns = [
    {
      name: translate('copyID'),
      key: 'copyID',
      className: 'pl-4 w-139px',
    },
    {
      name: translate('owner'),
      key: 'owner',
    },
  ]

  const tableData = [
    {
      copyID: 1,
      owner: 'Banksy123',
    },
    {
      copyID: 2,
      owner: 'Superhumanartist',
    },
    {
      copyID: 3,
      owner: 'Banksy123',
    },
    {
      copyID: 4,
      owner: 'Snikers288',
    },
    {
      copyID: 5,
      owner: 'Banksy123',
    },
    {
      copyID: 6,
      owner: 'Banksy123',
    },
    {
      copyID: 7,
      owner: 'Banksy123',
    },
    {
      copyID: 8,
      owner: 'Banksy123',
    },
    {
      copyID: 9,
      owner: 'Banksy123',
    },
    {
      copyID: 10,
      owner: 'Banksy123',
    },
    {
      copyID: 11,
      owner: 'Banksy123',
    },
    {
      copyID: 12,
      owner: 'Banksy123',
    },
  ]

  const onClose = useCallback(() => {
    handleClose()
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onClose}
      size='432px'
      title={translate('listFfNFTCopies')}
      titleClassName='font-black text-2xl text-gray-2d mt-2'
      infoIcon
    >
      <div className='w-[350px]'>
        <Table
          columns={Columns}
          data={tableData}
          fixedHeader
          bodyClassName='h-401px'
          trClassName='border-b border-gray-f2'
        />
      </div>
    </Modal>
  )
}

export default CopiesDetailsModal
