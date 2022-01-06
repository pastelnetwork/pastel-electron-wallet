import React, { useCallback, useState } from 'react'
import Modal from './modal'
import Button from 'common/components/Buttons/Button'

export type TAuthorshipClaimModal = {
  isOpen: boolean
  handleClose: () => void
}

function AuthorshipClaimModal({
  isOpen,
  handleClose,
}: TAuthorshipClaimModal): JSX.Element {
  const data = {
    nftName: 'i.e banksy168',
    pastelId: 'i.e banksy168',
  }
  const [text, setText] = useState('')

  const onCloseModal = useCallback(() => {
    handleClose()
  }, [])

  const renderOkButton = () => (
    <Button variant='default' className='w-full mt-[30px] mb-2'>
      <div className='flex items-center justify-center ml-6'>
        <span className='font-bold'>Ok</span>
      </div>
    </Button>
  )

  const onClaimChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value)
    },
    [text],
  )

  const renderClaimDetailsForm = () => (
    <div>
      <div className='mt-30px text-gray-71 leading-tight text-base font-medium'>
        Claim Details
      </div>
      <div className='mt-[9px] h-[173px] border rounded border-gray-e7 flex items-center relative'>
        <div className='absolute bottom-2 right-2 text-gray-a0 text-sm'>
          {200 - text.length}/200
        </div>
        <textarea
          className='w-full h-full py-2 border-none rounded outline-none text-gray-a0 px-4 resize-none'
          value={text}
          onChange={onClaimChange}
          maxLength={200}
        />
      </div>
    </div>
  )

  const renderNFT = () => (
    <div className='flex space-x-50px text-base font-medium'>
      <div className='w-1/2'>
        <div className='mt-[6px] text-gray-71 leading-tight'>NFT name</div>
        <div className='mt-2'>{data.nftName}</div>
      </div>
      <div className='w-1/2'>
        <div className='mt-[6px] text-gray-71 leading-tight'>
          Current author’s PastelID
        </div>
        <div className='mt-2'>{data.pastelId}</div>
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onCloseModal}
      size='690px'
      title={'Claim Petition'}
      titleClassName='font-extrabold text-3xl text-gray-2d'
      infoIcon
    >
      <div className='md:w-[610px]'>
        {renderNFT()}
        {renderClaimDetailsForm()}
        {renderOkButton()}
      </div>
    </Modal>
  )
}

export default AuthorshipClaimModal
