import React, { useState } from 'react'
import Modal from './modal'

export type TClaimTicketModal = {
  isOpen: boolean
  handleClose: () => void
}

const ClaimTicketModal: React.FC<TClaimTicketModal> = ({
  isOpen,
  handleClose,
}) => {
  const [text, setText] = useState('')

  const data = {
    NFT: 'Diamonds in the sky',
    Claimer: 'Banksy123',
    Recipient: 'Superhumanartist',
    Date: '11/11/21',
    detail:
      "I'm baby readymade mikshk tatooed actually activated charcoal godard listicle. Mumblecore cronut kicktstarter, bushwick wolf copper mug woke chia put a bird on it viral gentrify keytar synth. Twee chartreuse etsy, +1 dreamcatcher lumbersexual before they sold out drinking vinegar pintrest mumblecore tousled occupy brunch whatever ugh",
  }

  const Segment = ({ title, value }: { title: string; value: string }) => (
    <div className='w-1/2'>
      <div className='mt-22px font-medium leading-tight'>{title}</div>
      <div className='mt-10px text-gray-71'>{value}</div>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='874px'
      title={'Authorship claim ticket'}
      infoIcon={true}
    >
      <div>
        <div className='flex space-x-50px'>
          <Segment title='NFT' value={data.NFT} />
          <Segment title='Claimer' value={data.Claimer} />
          <Segment title='Recipient' value={data.Recipient} />
          <Segment title='Date' value={data.Date} />
        </div>
        <div>
          <div className='font-medium text-xl pb-3 pt-10'>
            Make a photo of Claim details
          </div>
          <div className='text-lg text-gray-71'>{data.detail}</div>
        </div>
        <div>
          <div className='mt-30px text-gray-71 leading-tight'>
            Submit your reply
          </div>
          <div className='mt-10px h-180px border rounded border-gray-e7 flex items-center relative'>
            <textarea
              className='w-full h-full py-2 border-none rounded outline-none text-gray-a0 px-4 resize-none'
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={200}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ClaimTicketModal
