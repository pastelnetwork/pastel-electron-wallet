import React, { useCallback, useState } from 'react'
import { useToggle } from 'react-use'

import Modal from './modal'
import Button from 'common/components/Buttons/Button'
import Checkbox from 'common/components/Checkbox/Checkbox'
import TransferHistoryModal from 'features/nft/nftModals/TransferHistoryModal'
import { translate } from 'features/app/translations'

import iconInfo from 'common/assets/icons/ico-info.svg'

export type TTransferAuthorshipModal = {
  isOpen: boolean
  handleClose: () => void
}

function TransferAuthorshipModal({
  isOpen,
  handleClose,
}: TTransferAuthorshipModal): JSX.Element {
  const data = {
    history:
      'Twee chartreuse etsy, +1 dreamcatcher lumbersexual before they sold out drinking vinegar pinterest mumblecore tousled occupy brunch whatever ugh.',
    pastelID: 'ps19jxlfdl8mhn',
  }
  const [isChecked, setChecked] = useState(true)
  const [pastelID, setPastelID] = useState(data.pastelID)
  const [showTransferHistory, toggleShowTransferHistory] = useToggle(false)

  const onCheckboxChange = useCallback(() => {
    setChecked(!isChecked)
  }, [isChecked])

  const onPastelIDChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPastelID(e.target.value)
    },
    [pastelID],
  )

  const onCloseModal = useCallback(() => {
    handleClose()
  }, [])

  const renderModalTitle = () => (
    <div className='text-gray-2d'>
      <div>{translate('transferRoyalty')}</div>
      <div className='flex items-center'>
        {translate('compensationRights')}{' '}
        <img src={iconInfo} className='ml-2' alt='Pastel Network' />
      </div>
    </div>
  )

  const renderTransferAuthorshipContent = () => (
    <div>
      <div className='mt-22px text-gray-71 leading-tight font-medium text-base'>
        {translate('pastelIDOfRecipient')}
      </div>
      <div className='mt-1.5 h-40px border rounded border-gray-e7 flex items-center'>
        <input
          className='w-full border-none outline-none rounded text-gray-2d px-4'
          value={pastelID}
          onChange={onPastelIDChange}
        />
      </div>
      <div className='mt-5 mb-5 flex text-gray-a0 text-sm leading-tight'>
        <Checkbox isChecked={isChecked} clickHandler={onCheckboxChange} />
        <span className='ml-1 mt-px'>{translate('confirmTransferButton')}</span>
      </div>
    </div>
  )

  const renderSubmitButton = () => (
    <Button
      variant='default'
      className='flex items-center justify-center w-full mb-2'
    >
      <span className='font-medium'>{translate('submit')}</span>
    </Button>
  )

  const renderTransferHistoryButton = () => (
    <div>
      <button
        type='button'
        className='block link text-base font-medium'
        onClick={toggleShowTransferHistory}
      >
        {translate('transferHistory')}
      </button>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onCloseModal}
      size='478px'
      title={renderModalTitle()}
      titleClassName='text-h2 font-extrabold'
      headerClassName='px-10 pb-3'
      infoIcon={false}
    >
      <div>
        {renderTransferHistoryButton()}
        <div className='flex text-gray-4a font-normal text-lg leading-6 mt-3'>
          {data.history}
        </div>
        {renderTransferAuthorshipContent()}

        {renderSubmitButton()}

        <TransferHistoryModal
          isOpen={showTransferHistory}
          handleClose={toggleShowTransferHistory}
        />
      </div>
    </Modal>
  )
}

export default TransferAuthorshipModal
