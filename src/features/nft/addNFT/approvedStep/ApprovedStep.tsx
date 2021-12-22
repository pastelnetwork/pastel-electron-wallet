import React, { useCallback } from 'react'
import { TNFTData, TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import FullScreenButton from '../common/fullScreenButton/FullScreenButton'
import { useToggle } from 'react-use'
import FullScreenImage from 'common/components/FullScreenImage/FullScreenImage'
import ImageShadow from '../common/ImageShadow'
import {
  useImagePreview,
  useStorageFee,
  calculateFee,
} from '../previewStep/PreviewStep.service'
import { submit } from '../submitStep/SubmitStep.service'
import { useCurrencyName } from 'common/hooks/appInfo'
import { Size } from 'common/utils/file'

function InfoPair({ title, value }: { title: string; value: string }) {
  return (
    <div className='flex'>
      <div className='text-gray-71 w-48'>{title}</div>
      <div className='text-green-45 font-extrabold'>{value}</div>
    </div>
  )
}

type TApprovedStepProps = {
  state: TAddNFTState
  image: TImage
  displayUrl: string
  nftData: TNFTData
}

export default function ApprovedStep({
  state,
  image,
  displayUrl,
  nftData,
}: TApprovedStepProps): JSX.Element {
  const networkfee = useStorageFee()
  const currencyName = useCurrencyName()
  const [fullScreen, toggleFullScreen] = useToggle(false)
  const [croppedImage] = useImagePreview({ image })

  const fileSizeKb = Math.round(image.size / Size.MB)
  const quality = state.optimizationService.selectedFile?.quality || 100

  const fee = calculateFee({
    networkfee,
    quality,
    fileSizeKb,
  })

  if (fullScreen) {
    return <FullScreenImage image={image.url} onClose={toggleFullScreen} />
  }

  const titleString = `NFT approved: “${nftData.title}”`

  const onSubmit = useCallback(() => submit({ state, image, nftData }), [
    state,
    image,
    nftData,
  ])

  const renderFinalRegistrationFee = () => (
    <div className='w-full mt-3'>
      <div className='bg-gray-f8 rounded-lg py-22px px-18px flex-between text-sm'>
        <div className='text-gray-71'>Final registration fee</div>
        <div className='text-gray-45 font-extrabold'>
          {fee} {currencyName}
        </div>
      </div>
      <button
        type='button'
        className='btn btn-primary w-full mt-5'
        onClick={onSubmit}
      >
        Proceed to final registration fee payment
      </button>
    </div>
  )

  const renderThumbnailPreview = () => (
    <div className='w-full space-y-4'>
      <InfoPair title='Patel rareness score' value='67%' />
      <InfoPair title='Internet rareness score' value='99%' />
      <InfoPair title='NSFW' value='100%' />
      <div>
        <div className='font-medium text-gray-71 mb-3'>Thumbnail preview</div>
        <div className='w-48 h-48'>
          {croppedImage && (
            <img
              src={croppedImage.src}
              className='rounded w-full h-full'
              alt='Pastel Network'
            />
          )}
        </div>
      </div>
    </div>
  )

  return (
    <ModalLayout
      title={titleString}
      titleClass='mb-3'
      fixedHeight
      leftColumnWidth={image.maxWidth}
      leftColumnContent={
        <div className='flex-center'>
          <div className='relative flex-center'>
            <FullScreenButton onClick={toggleFullScreen} />
            <ImageShadow url={displayUrl} />
            <img
              src={displayUrl}
              className='rounded max-h-424px relative'
              style={{ maxWidth: `${image.maxWidth}px` }}
              alt='Pastel'
            />
          </div>
        </div>
      }
      rightColumnContent={
        <div className='h-full flex-between flex-col pt-5'>
          {renderThumbnailPreview()}
          {renderFinalRegistrationFee()}
        </div>
      }
    />
  )
}
