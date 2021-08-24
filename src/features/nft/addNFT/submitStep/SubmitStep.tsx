import React from 'react'
import { TNFTData, TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import { useImagePreview } from '../previewStep/PreviewStep.service'
import { ArrowSlim } from 'common/components/Icons/ArrowSlim'
import { useToggle } from 'react-use'
import FullScreenImage from 'common/components/FullScreenImage/FullScreenImage'
import FullScreenButton from '../common/fullScreenButton/FullScreenButton'
import Toggle from 'common/components/Toggle'
import { formatFileSize, formatNumber } from 'common/utils/format'
import ImageShadow from '../common/ImageShadow'
import { submit } from './SubmitStep.service'
import { useCurrencyName } from 'common/hooks/appInfo'
import { PreviewIco } from 'common/components/Icons'

const InfoPair = ({ title, value }: { title: string; value: string }) => (
  <div className='flex'>
    <div className='text-gray-71 w-36 font-normal text-sm'>{title}</div>
    <div className='text-gray-4a font-medium text-sm'>{value}</div>
  </div>
)

type TSubmitStepProps = {
  state: TAddNFTState
  image: TImage
  displayUrl: string
  nftData: TNFTData
  toggleCloseButton(): void
}

export default function SubmitStep({
  state,
  image,
  displayUrl,
  nftData,
  toggleCloseButton,
}: TSubmitStepProps): JSX.Element {
  const [fullScreen, toggleFullScreen] = useToggle(false)
  const [croppedImage] = useImagePreview({ image })
  const currencyName = useCurrencyName()

  const onFullScreenToggle = () => {
    toggleCloseButton()
    toggleFullScreen()
  }

  if (fullScreen) {
    return <FullScreenImage image={displayUrl} onClose={onFullScreenToggle} />
  }

  const onSubmit = () => submit({ state, image, nftData })

  return (
    <ModalLayout
      title='Submit NFT'
      titleClass='mb-3 text-gray-71'
      subtitle='Description'
      step={4}
      leftColumnWidth={image.maxWidth}
      leftColumnContent={
        <div className='flex-center'>
          <div className='relative flex-center'>
            <FullScreenButton onClick={onFullScreenToggle} />
            <ImageShadow url={image.url} />
            <img
              src={displayUrl}
              className='rounded max-h-[410px] relative'
              style={{ maxWidth: `${image.maxWidth}px` }}
            />
            <button
              className='absolute z-10 bottom-3 px-4 py-[10px] rounded-full bg-rgba-gray-2e flex items-center'
              onClick={onFullScreenToggle}
            >
              <PreviewIco size={20} className='inline-block mr-4 text-white' />
              <span className='text-white text-xs font-medium inline-block whitespace-nowrap'>
                Preview how it will look
              </span>
            </button>
          </div>
        </div>
      }
      rightColumnClass='w-[360px] flex flex-col'
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
            <div className='bg-gray-f8 rounded-lg py-4 mt-3'>
              <div className='flex text-gray-71 font-medium text-base'>
                <div className='pl-5 w-36 text-gray-71'>Image size</div>
                <div className='text-gray-71'>Estimated registration fee</div>
              </div>
              <div className='flex text-gray-2d font-extrabold mt-3'>
                <div className='pl-5 w-36 text-gray-4a'>
                  {formatFileSize(
                    state.optimizationService.selectedFile?.size || image.size,
                  )}
                </div>
                <div className='text-gray-4a font-extrabold'>
                  {state.estimatedFee === undefined
                    ? '0'
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
            <button
              type='button'
              className='btn btn-primary px-3'
              onClick={onSubmit}
            >
              Submit and proceed to fee payment
            </button>
          </div>
        </>
      }
    />
  )
}
