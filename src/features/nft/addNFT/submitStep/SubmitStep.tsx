import React from 'react'
import { TNFTData, TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import { useImagePreview } from '../previewStep/PreviewStep.service'
import { ArrowSlim } from 'common/components/Icons/ArrowSlim'
import { Button } from 'common/components/Buttons'
import { useToggle } from 'react-use'
import FullScreenImage from 'common/components/FullScreenImage/FullScreenImage'
import FullScreenButton from '../common/fullScreenButton/FullScreenButton'
import Toggle from 'common/components/Toggle'
import { formatFileSize, formatNumber } from 'common/utils/format'
import icoPreview from 'common/assets/icons/ico-preview.svg'
import ImageShadow from '../common/ImageShadow'
import { submit } from './SubmitStep.service'
import { useCurrencyName } from 'common/hooks/appInfo'

const InfoPair = ({ title, value }: { title: string; value: string }) => (
  <div className='flex'>
    <div className='text-gray-71 w-36'>{title}</div>
    <div className='text-gray-4a font-medium'>{value}</div>
  </div>
)

type TSubmitStepProps = {
  state: TAddNFTState
  image: TImage
  displayUrl: string
  nftData: TNFTData
}

export default function SubmitStep({
  state,
  image,
  displayUrl,
  nftData,
}: TSubmitStepProps): JSX.Element {
  const [fullScreen, toggleFullScreen] = useToggle(false)
  const [croppedImage] = useImagePreview({ image })
  const currencyName = useCurrencyName()

  if (fullScreen) {
    return <FullScreenImage image={displayUrl} onClose={toggleFullScreen} />
  }

  const onSubmit = () => submit({ state, image, nftData })

  return (
    <ModalLayout
      title='Submit NFT'
      titleClass='mb-3'
      subtitle='Description'
      step={4}
      leftColumnWidth={image.maxWidth}
      leftColumnContent={
        <div className='flex-center'>
          <div className='relative flex-center'>
            <FullScreenButton onClick={toggleFullScreen} />
            <ImageShadow url={image.url} />
            <img
              src={displayUrl}
              className='rounded max-h-[410px] relative'
              style={{ maxWidth: `${image.maxWidth}px` }}
            />
            <button
              className='absolute z-10 bottom-3 px-4 py-3 rounded-full bg-rgba-gray-2e flex items-center'
              onClick={toggleFullScreen}
            >
              <img src={icoPreview} className='inline-block mr-4' />
              <span className='text-white font-extrabold inline-block whitespace-nowrap'>
                Preview how it will look
              </span>
            </button>
          </div>
        </div>
      }
      rightColumnClass='w-[349px] flex flex-col'
      rightColumnContent={
        <>
          <div className='flex-grow w-full text-sm flex flex-col justify-between'>
            <div className='space-y-14px'>
              <InfoPair title='Title' value={nftData.title} />
              {nftData.hashtags.length > 0 && (
                <InfoPair
                  title='Keyword Hashtags'
                  value={nftData.hashtags.join(', ')}
                />
              )}
              {nftData.series && (
                <InfoPair title='Series' value={nftData.series} />
              )}
              {/* TODO: figure out what to display in Copies */}
              <InfoPair title='Copies' value={`1 of ${nftData.copies}`} />
              <InfoPair
                title='Perpetual Royalty'
                value={`${nftData.royalty}%`}
              />
              {nftData.website && (
                <InfoPair title="Creator's website" value={nftData.website} />
              )}
              {nftData.video && (
                <InfoPair title='Creation video' value={nftData.video} />
              )}
              <div className='flex items-center'>
                <div className='text-gray-71 mr-3'>GreenNFT</div>
                <Toggle selected={nftData.green} />
              </div>
            </div>
            {nftData.description && (
              <div className='mt-4 text-blue-3f'>{nftData.description}</div>
            )}
            <div className='mt-5'>
              <div className='font-medium text-gray-71 mb-3'>
                Thumbnail preview
              </div>
              <div className='w-48 h-48 relative'>
                {croppedImage && (
                  <>
                    <ImageShadow url={croppedImage.src} small />
                    <img
                      src={croppedImage.src}
                      className='rounded w-full h-full relative'
                    />
                  </>
                )}
              </div>
              {croppedImage?.error && (
                <div className='text-sm text-error font-medium mt-3'>
                  Error text error text
                </div>
              )}
            </div>
            <div className='bg-gray-f8 rounded-lg py-4 mt-6'>
              <div className='flex text-gray-71'>
                <div className='pl-5 w-36'>Image size</div>
                <div>Estimated registration fee</div>
              </div>
              <div className='flex text-gray-4a font-extrabold mt-3'>
                <div className='pl-5 w-36'>
                  {formatFileSize(
                    state.optimizationState.selectedFile?.size ||
                      image.file.size,
                  )}
                </div>
                <div>
                  {state.estimatedFee === undefined
                    ? 'unknown'
                    : `${formatNumber(state.estimatedFee)} ${currencyName}`}
                </div>
              </div>
            </div>
          </div>
          <div className='flex-between mt-5 flex-shrink-0'>
            <button
              type='button'
              className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
              onClick={state.goBack}
            >
              <ArrowSlim to='left' size={14} />
            </button>
            <Button
              type='button'
              className='font-extrabold px-3'
              onClick={onSubmit}
            >
              Submit and proceed to fee payment
            </Button>
          </div>
        </>
      }
    />
  )
}
