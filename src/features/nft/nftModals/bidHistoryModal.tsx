import React from 'react'
import cn from 'classnames'
// Components
import { Modal } from 'common/components/Modal'
import Scrollbar from 'common/components/Scrollbar'
import Bid from 'common/components/Bid'

type THistoryItem = {
  id: string | number
  avatar: string
  name: string
  bid: string | number
  date: Date
}

export type TBidHistoryModal = {
  history: Array<THistoryItem>
  isOpen: boolean
  handleClose: () => void
}

const BidHistoryModal = ({
  history,
  isOpen,
  handleClose,
}: TBidHistoryModal): JSX.Element => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-lg'>
      <h2 className='mb-6 text-gray-2d'>Bid History</h2>
      <Scrollbar maxHeight='400'>
        {history.map(({ id, avatar, bid, date, name }, idx) => (
          <div key={id} className={cn(idx !== history.length - 1 && 'mb-6')}>
            <Bid avatar={avatar} bid={bid} date={date} name={name} />
          </div>
        ))}
      </Scrollbar>
    </Modal>
  )
}

export default BidHistoryModal
