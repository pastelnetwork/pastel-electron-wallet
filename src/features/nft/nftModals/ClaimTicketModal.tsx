import React, { useCallback, useState } from 'react'
import Modal from './modal'

export type TClaimTicketModal = {
  isOpen: boolean
  handleClose: () => void
}

type TSegment = {
  title: string
  value: string
}

function Segment({ title, value }: TSegment) {
  return (
    <div className='w-1/2'>
      <div className='font-extrabold text-base text-gray-4a leading-6'>
        {title}
      </div>
      <div className='mt-1 text-gray-71'>{value}</div>
    </div>
  )
}

function ClaimTicketModal({
  isOpen,
  handleClose,
}: TClaimTicketModal): JSX.Element {
  const [text, setText] = useState('')

  const data = {
    NFT: 'Diamonds in the sky',
    Claimer: 'Banksy123',
    Recipient: 'Superhumanartist',
    Date: '11/11/21',
    detail:
      "I'm baby readymade mikshk tatooed actually activated charcoal godard listicle. Mumblecore cronut kicktstarter, bushwick wolf copper mug woke chia put a bird on it viral gentrify keytar synth. Twee chartreuse etsy, +1 dreamcatcher lumbersexual before they sold out drinking vinegar pintrest mumblecore tousled occupy brunch whatever ugh",
  }

  const handleReplyChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value)
    },
    [text],
  )

  const onCloseModal = useCallback(() => {
    handleClose()
  }, [])

  const renderReplyForm = () => (
    <div>
      <div className='mt-[26px] text-gray-71 leading-tight'>
        Submit your reply
      </div>
      <div className='mt-10px h-180px border rounded border-gray-e7 flex items-center relative'>
        <textarea
          className='w-full h-full py-2 border-none rounded outline-none text-gray-a0 px-4 resize-none'
          value={text}
          onChange={handleReplyChange}
          maxLength={200}
        />
      </div>
    </div>
  )

  const renderClaimDetail = () => (
    <div>
      <div className='font-extrabold text-lg pb-2 pt-30px text-gray-4a'>
        Make a photo of Claim details
      </div>
      <div className='text-lg text-gray-4a leading-[26px]'>{data.detail}</div>
    </div>
  )

  const renderSegment = () => (
    <div className='flex space-x-50px'>
      <Segment title='NFT' value={data.NFT} />
      <Segment title='Claimer' value={data.Claimer} />
      <Segment title='Recipient' value={data.Recipient} />
      <Segment title='Date' value={data.Date} />
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onCloseModal}
      size='874px'
      title={'Authorship Claim Ticket'}
      infoIcon
      titleClassName='font-black text-2xl text-gray-2d'
    >
      <div className='md:w-[794px]'>
        {renderSegment()}
        {renderClaimDetail()}
        {renderReplyForm()}
      </div>
    </Modal>
  )
}

export default ClaimTicketModal
