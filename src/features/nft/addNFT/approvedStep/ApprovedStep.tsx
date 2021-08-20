import React from 'react'
import { TNFTData, TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import FullScreenButton from '../common/fullScreenButton/FullScreenButton'
import { useToggle } from 'react-use'
import FullScreenImage from 'common/components/FullScreenImage/FullScreenImage'
import ImageShadow from '../common/ImageShadow'
import { useImagePreview } from '../previewStep/PreviewStep.service'
import { useCurrencyName } from 'common/hooks/appInfo'

const InfoPair = ({ title, value }: { title: string; value: string }) => (
  <div className='flex'>
    <div className='text-gray-71 w-48'>{title}</div>
    <div className='text-green-45 font-extrabold'>{value}</div>
  </div>
)

type TApprovedStepProps = {
  state: TAddNFTState
  image: TImage
  displayUrl: string
  nftData: TNFTData
}

export default function ApprovedStep({
  state: { goToNextStep },
  image,
  displayUrl,
  nftData,
}: TApprovedStepProps): JSX.Element {
  const currencyName = useCurrencyName()
  const [fullScreen, toggleFullScreen] = useToggle(false)
  const [croppedImage] = useImagePreview({ image })

  if (fullScreen) {
    return <FullScreenImage image={image.url} onClose={toggleFullScreen} />
  }

  const titleString = `NFT approved: “${nftData.title}”`

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
            />
          </div>
        </div>
      }
      rightColumnContent={
        <div className='h-full flex-between flex-col pt-5'>
          <div className='w-full space-y-4'>
            <InfoPair title='Patel rareness score' value='67%' />
            <InfoPair title='Internet rareness score' value='99%' />
            <InfoPair title='NSFW' value='100%' />
            <div>
              <div className='font-medium text-gray-71 mb-3'>
                Thumbnail preview
              </div>
              <div className='w-48 h-48'>
                {croppedImage && (
                  <img
                    src={croppedImage.src}
                    className='rounded w-full h-full'
                  />
                )}
              </div>
            </div>
          </div>
          <div className='w-full mt-3'>
            <div className='bg-gray-f8 rounded-lg py-22px px-18px flex-between text-sm'>
              <div className='text-gray-71'>Final registration fee</div>
              <div className='text-gray-45 font-extrabold'>
                110,000 {currencyName}
              </div>
            </div>
            <button
              type='button'
              className='btn btn-primary w-full mt-5'
              onClick={goToNextStep}
            >
              Proceed to final registration fee payment
            </button>
          </div>
        </div>
      }
    />
  )
}
