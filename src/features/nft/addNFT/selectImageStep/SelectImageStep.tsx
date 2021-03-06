import React, { useCallback, useEffect, useState } from 'react'

import { TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../common/ModalLayout'
import { ArrowSlim, Info, UploadFile, Checkmark } from 'common/components/Icons'
import SelectImageArea from './SelectImageArea'
import { useSelectImageService } from './SelectImageStep.service'
import { allowedTypeNames, ImageType } from '../AddNft.constants'
import { useCurrencyName } from 'common/hooks/appInfo'
import Tooltip from 'common/components/Tooltip'
import ProgressCircle from 'common/components/ProgressCircle'
import { copyFile } from 'common/utils/file'
import { setSelectedFile, setFileUploaded } from '../AddNFT.store'
import { translate } from 'features/app/translations'

export type TSelectStepProps = {
  state: TAddNFTState
}

export type TImageFile = TImage & {
  arrayBuffer: ArrayBuffer
}

let currentPercentage = 0

function UploadProgress({
  state,
  startProcessing,
  imageFile,
}: {
  startProcessing: boolean
  imageFile?: TImageFile
  state: TAddNFTState
}): JSX.Element {
  const service = useSelectImageService(state)
  const { isProcessing } = service
  const [percentage, setPercentage] = useState<number>(0)
  const [progressPoint, setProgressPoint] = useState<number>(0)
  let percentageTime: NodeJS.Timeout | null = null

  const randomPercentage = () => {
    if (currentPercentage < 85) {
      const step = Math.floor(Math.random() * 10) + 1
      currentPercentage = currentPercentage + step
      state.setPercentage(currentPercentage)
      setPercentage(currentPercentage)
    }

    if (!isProcessing && currentPercentage >= 85) {
      setPercentage(100)
      currentPercentage = 0
      if (percentageTime) {
        clearInterval(percentageTime)
      }
    }
  }

  useEffect(() => {
    if (startProcessing && state.percentage < 100) {
      currentPercentage = 0
      percentageTime = setInterval(() => {
        randomPercentage()
      }, 1000)
    }

    return () => {
      if (percentageTime) {
        clearInterval(percentageTime)
      }
    }
  }, [startProcessing])

  useEffect(() => {
    if (progressPoint === 100) {
      state.setPercentage(100)
    }
  }, [progressPoint])

  return (
    <ProgressCircle
      percentage={state.percentage !== 100 ? percentage : state.percentage}
      onCallback={setProgressPoint}
    >
      {(percentage === 100 && progressPoint === 100) ||
      state.percentage === 100 ? (
        <div className='mb-[20px] flex-center flex-col'>
          <Checkmark size={35} className='text-success' />
        </div>
      ) : null}
      <div className='block flex-center flex-col'>
        <UploadFile size={26} className='mb-3' />
        <div
          title={imageFile?.name}
          className='mb-1 text-lg leading-6 font-medium text-gray-4a truncate max-w-[160px]'
        >
          {state.image?.name || imageFile?.name}
        </div>
        <div className='text-gray-77 text-sm font-normal'>
          {state.percentage !== 100 ? progressPoint : state.percentage}%{' '}
          {translate('ready')}
        </div>
      </div>
    </ProgressCircle>
  )
}

export default function SelectImageStep({
  state,
}: TSelectStepProps): JSX.Element {
  const service = useSelectImageService(state)
  const {
    imageForPreview,
    error,
    isProcessing,
    imageToConvert,
    isAnimated,
    imageFile,
    resetImageState,
    selectFile,
  } = service
  const currencyName = useCurrencyName()

  useEffect(() => {
    if (!imageForPreview) {
      state.setPercentage(0)
    }
  }, [imageForPreview])

  const handleBack = useCallback(() => {
    state.goBack()
  }, [])
  const handleImageOptimizationSubmit = useCallback(() => {
    const saveNftDataStore = async () => {
      if (service.selectedFile) {
        setSelectedFile({
          size: service.selectedFile.size,
          fileUrl: service.selectedFile.path,
          quality: 100,
          index: 6,
        })
        const file = await copyFile(
          service.selectedFile.path,
          service.selectedFile.name,
        )
        setFileUploaded(file)
      }
    }
    saveNftDataStore()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
    service.submit()
  }, [service])

  const handleConvertToJPG = useCallback(() => {
    if (imageToConvert) {
      service
        .convertImage(imageToConvert, ImageType.JPG)
        .then(() => {
          // noop
        })
        .catch(() => {
          // noop
        })
        .finally(() => {
          // noop
        })
    }
  }, [imageToConvert, service])

  const handleConvertToPNG = useCallback(() => {
    if (imageToConvert) {
      service
        .convertImage(imageToConvert, ImageType.PNG)
        .then(() => {
          // noop
        })
        .catch(() => {
          // noop
        })
        .finally(() => {
          // noop
        })
    }
  }, [imageToConvert, service])

  const handleCancelUpload = useCallback(() => {
    resetImageState()
    selectFile(undefined)
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
    state.setPercentage(0)
    currentPercentage = 0
  }, [])

  const renderImageOptimizationButton = () => (
    <div className='flex-between'>
      <button
        type='button'
        className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
        onClick={handleBack}
      >
        <ArrowSlim to='left' size={14} />
      </button>
      <button
        className='btn btn-primary px-[30px]'
        onClick={handleImageOptimizationSubmit}
        disabled={!imageForPreview || state.percentage !== 100}
        type='button'
      >
        {translate('goToImageOptimization')}
      </button>
    </div>
  )

  const renderSelectImageFile = () => (
    <div className='flex items-center text-gray-71 font-medium mb-3'>
      <span className='mr-3 text-base'>
        {translate('uploadImageFileLimit')}
      </span>
      <Tooltip
        type='top'
        content={translate('uploadImageFileTooltip')}
        width={50}
      >
        <Info size={14} className='cursor-pointer' />
      </Tooltip>
    </div>
  )

  return (
    <ModalLayout
      title={translate('selectImage')}
      titleClass='mb-3'
      subtitle={translate('theImageFileForYourNFT')}
      step={2}
      fixedHeight
      contentClass='pt-2'
      leftColumnWidth={imageForPreview?.maxWidth || 463}
      leftColumnContent={
        <SelectImageArea service={service}>
          <div className='h-full text-gray-77 text-xs'>
            {isProcessing || (!isProcessing && state.percentage) ? (
              <div className='border border-gray-ec rounded-lg px-7 pt-[62px] pb-43px w-[308px]'>
                <UploadProgress
                  state={state}
                  startProcessing
                  imageFile={imageFile}
                />
                <div className='mt-[15px] text-center'>
                  <button
                    type='button'
                    onClick={handleCancelUpload}
                    className='cursor-pointer text-sm font-medium text-gray-71'
                  >
                    {translate('cancel')}
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex-center flex-col bg-gray-f4 rounded-md h-full w-full cursor-pointer'>
                <UploadFile size={26} className='mb-3' />
                <div className='mb-2'>
                  {allowedTypeNames.join(', ')} {translate('max100Mb')}
                </div>
                <div className='text-gray-a0'>
                  {translate('dragOrChooseYourFileToUpload')}
                </div>
              </div>
            )}
          </div>
        </SelectImageArea>
      }
      rightColumnClass='w-[355]'
      rightColumnContent={
        <div className='h-full flex justify-between flex-col'>
          <div className='text-sm'>
            {renderSelectImageFile()}
            <div className='text-gray-71 mb-2'>
              {translate('noteTheImageFileSizeAndTheRegistrationFee')}
            </div>
            <div className='text-gray-71 mb-4'>
              {translate('noteTheImageFileSizeAndTheRegistrationFeeExample', {
                currencyName,
              })}
            </div>
            {imageToConvert && (
              <>
                <div className='mb-3 text-gray-4a space-y-2'>
                  <div>{translate('onlyJpgOrPngImageFilesAreSupported')}</div>
                  {isAnimated && (
                    <div>{translate('animationsAreCurrentlyNotSupported')}</div>
                  )}
                  <div>{translate('wouldYouLikeToConvertYourImage')}</div>
                </div>
                <div className='flex'>
                  <button
                    type='button'
                    className='btn btn-primary px-4 mr-2'
                    onClick={handleConvertToPNG}
                  >
                    {translate('convertToPNG')}
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary px-4'
                    onClick={handleConvertToJPG}
                  >
                    {translate('convertToJPG')}
                  </button>
                </div>
              </>
            )}
            {error && (
              <div className='text-red-fe font-medium mt-2 text-md'>
                {error}
              </div>
            )}
          </div>
          {renderImageOptimizationButton()}
        </div>
      }
    />
  )
}

UploadProgress.defaultProps = {
  imageFile: undefined,
}
