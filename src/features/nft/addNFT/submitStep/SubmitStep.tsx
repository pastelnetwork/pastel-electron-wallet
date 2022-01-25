import React, { useCallback } from 'react'
import { useToggle } from 'react-use'

import { TNFTData, TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import { useImagePreview } from '../previewStep/PreviewStep.service'
import { ArrowSlim } from 'common/components/Icons/ArrowSlim'
import FullScreenImage from 'common/components/FullScreenImage/FullScreenImage'
import FullScreenButton from '../common/fullScreenButton/FullScreenButton'
import Toggle from 'common/components/Toggle'
import { formatFileSize, formatNumber } from 'common/utils/format'
import ImageShadow from '../common/ImageShadow'
import { useCurrencyName } from 'common/hooks/appInfo'
import { PreviewIco } from 'common/components/Icons'
import { translate } from 'features/app/translations'

function InfoPair({ title, value }: { title: string; value: string }) {
  return (
    <div className='flex'>
      <div className='text-gray-71 min-w-[144px] w-36 font-normal text-sm'>
        {title}
      </div>
      <div className='text-gray-4a font-medium text-sm'>{value}</div>
    </div>
  )
}

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
  const [croppedImage] = useImagePreview({
    image: {
      ...image,
      url: state.optimizationService.selectedFile?.fileUrl || image.url,
    },
  })
  const currencyName = useCurrencyName()
  const onFullScreenToggle = useCallback(() => {
    toggleCloseButton()
    toggleFullScreen()
  }, [])

  const handleBack = useCallback(() => {
    state.goBack()
  }, [])

  const onSubmit = useCallback(() => state.goToNextStep(), [])

  const handleGreenNFTChange = useCallback((val: boolean) => {
    if (state.nftData) {
      state.setNftData({
        ...state.nftData,
        green: val,
      })
    }
  }, [])

  if (fullScreen) {
    return <FullScreenImage image={displayUrl} onClose={onFullScreenToggle} />
  }

  const renderSubmitButton = () => (
    <div className='flex-between mt-5 flex-shrink-0'>
      <button
        type='button'
        className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
        onClick={handleBack}
      >
        <ArrowSlim to='left' size={14} />
      </button>
      <button type='button' className='btn btn-primary px-3' onClick={onSubmit}>
        {translate('submitAndProceedToFeePayment')}
      </button>
    </div>
  )

  const renderImageSize = () => (
    <div className='bg-gray-f8 rounded-lg py-4 mt-3'>
      <div className='flex text-gray-71 font-medium text-base'>
        <div className='pl-5 w-36 text-gray-71'>{translate('imageSize')}</div>
        <div className='text-gray-71'>
          {translate('estimatedRegistrationFee')}
        </div>
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
  )

  const renderThumbnailPreview = () => (
    <div className='mt-5'>
      <div className='font-medium text-gray-71 mb-3'>
        {translate('thumbnailPreview')}
      </div>
      <div className='w-48 h-48 relative'>
        {croppedImage && (
          <>
            <ImageShadow url={state.thumbnail || croppedImage.src} small />
            <img
              src={state.thumbnail || croppedImage.src}
              className='rounded w-full h-full relative'
              alt={translate('thumbnailPreview')}
            />
          </>
        )}
      </div>
      {croppedImage?.error && (
        <div className='text-sm text-error font-medium mt-3'>
          {croppedImage?.error}
        </div>
      )}
    </div>
  )

  const renderPreviewBlock = () => (
    <div className='relative flex-center'>
      <FullScreenButton onClick={onFullScreenToggle} />
      <ImageShadow url={image.url} />
      <img
        src={displayUrl}
        className='rounded max-h-[410px] relative'
        style={{ maxWidth: `${image.maxWidth}px` }}
        alt='Pastel'
      />
      <button
        className='absolute z-10 bottom-3 px-4 py-[10px] rounded-full bg-rgba-gray-2e flex items-center'
        onClick={onFullScreenToggle}
        type='button'
      >
        <PreviewIco size={20} className='inline-block mr-4 text-white' />
        <span className='text-white text-xs font-medium inline-block whitespace-nowrap'>
          {translate('previewHowItWillLook')}
        </span>
      </button>
    </div>
  )

  const renderGreenNFT = () => (
    <div className='flex items-center'>
      <div className='text-gray-71 mr-3'>{translate('greenNFT')}</div>
      <Toggle selected={nftData.green} toggleHandler={handleGreenNFTChange} />
    </div>
  )

  const renderSubmitStepBody = () => (
    <div className='space-y-14px'>
      <InfoPair title={translate('title')} value={nftData.title} />
      {nftData.hashtags.length > 0 && (
        <InfoPair
          title={translate('keywordHashtags')}
          value={nftData.hashtags.join(', ')}
        />
      )}
      {nftData.series && (
        <InfoPair title={translate('series')} value={nftData.series} />
      )}
      <InfoPair
        title={translate('copies')}
        value={translate('copiesValue', { number: 1, total: nftData.copies })}
      />
      <InfoPair
        title={translate('perpetualRoyalty')}
        value={`${nftData.royalty}%`}
      />
      {nftData.website && (
        <InfoPair
          title={translate('creatorsWebsite')}
          value={nftData.website}
        />
      )}
      {nftData.video && (
        <InfoPair title={translate('creationVideo')} value={nftData.video} />
      )}
      {renderGreenNFT()}
    </div>
  )

  return (
    <ModalLayout
      title={translate('submitNFT')}
      titleClass='mb-3 text-gray-71'
      subtitle={translate('submitNFTDescription')}
      step={4}
      leftColumnWidth={image.maxWidth}
      leftColumnContent={
        <div className='flex-center'>{renderPreviewBlock()}</div>
      }
      rightColumnClass='w-[360px] flex flex-col'
      rightColumnContent={
        <>
          <div className='flex-grow w-full text-sm flex flex-col justify-between'>
            {renderSubmitStepBody()}
            {nftData.description && (
              <div>
                <div className='text-gray-71 font-normal text-sm mt-4'>
                  {translate('description')}
                </div>
                <div className='text-gray-4a font-medium text-sm overflow-auto max-h-[60px]'>
                  {nftData.description}
                </div>
              </div>
            )}
            {renderThumbnailPreview()}
            {renderImageSize()}
          </div>
          {renderSubmitButton()}
        </>
      }
    />
  )
}
