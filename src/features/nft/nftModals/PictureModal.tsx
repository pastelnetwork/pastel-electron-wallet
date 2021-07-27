import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Slider from './slider'
import img_astronaut from 'common/assets/images/img-astronaut.png'
import ico_minus from 'common/assets/icons/ico-minus.svg'
import ico_plus from 'common/assets/icons/ico-plus.svg'
import ButtonClose from 'common/components/Buttons/CloseButton'

export type TPictureModal = {
  isOpen: boolean
  handleClose: () => void
}

const PictureModal = ({ isOpen, handleClose }: TPictureModal): JSX.Element => {
  const [zoom, setZoom] = useState<number>(42)
  const imageSize = (1382 * zoom) / 100
  return (
    <ReactModal
      isOpen={isOpen}
      className='relative bg-transparent shadow-xSmall max-h-full overflow-visible mx-auto focus:outline-none'
      overlayClassName='fixed top-0 left-0 right-0 bottom-0 flex items-center bg-gray-1a bg-opacity-60 p-4'
      contentLabel='modal'
      onRequestClose={handleClose}
    >
      <ButtonClose
        onClick={handleClose}
        className='absolute top-0 -right-10 filter brightness-125 bg-gray-71 bg-opacity-10 z-10'
      />
      <div className='w-full height-full min-w-[200px] min-h-[200px] rounded-3xl overflow-auto'>
        <img
          className='m-auto'
          src={img_astronaut}
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            maxWidth: 'initial',
          }}
        />
      </div>
      <div className='absolute bottom-30px left-1/2 rounded-lg transform -translate-x-1/2 w-180px h-34px bg-gray-1a bg-opacity-60 flex items-center'>
        <button className='ml-3 mr-6px'>
          <img src={ico_minus} />
        </button>
        <Slider value={zoom} setValue={setZoom} />
        <button className='mr-3 ml-6px'>
          <img src={ico_plus} />
        </button>
      </div>
    </ReactModal>
  )
}

export default PictureModal
