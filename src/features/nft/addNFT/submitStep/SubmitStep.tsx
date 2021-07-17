import React from 'react'
import { TNFTData, TAddNFTState, TImage } from '../AddNFT.state'
import ModalLayout from '../ModalLayout'
import { useImagePreview } from '../previewStep/PreviewStep.service'
import { ArrowSlim } from 'common/components/Icons/ArrowSlim'
import { Button } from 'common/components/Buttons'
import { useToggle } from 'react-use'
import FullScreenImage from 'common/components/FullScreenImage/FullScreenImage'
import FullScreenButton from '../fullScreenButton/FullScreenButton'
import Toggle from 'common/components/Toggle'
import { useAppSelector } from 'redux/hooks'
import { artworkRegister, artworkUploadImage } from 'api/artwork-api/artwork'
import { TArtworkTicket } from 'api/artwork-api/interfaces'
import { toast } from 'react-toastify'
import { formatFileSize, formatNumber } from 'common/utils/format'
import icoPreview from 'common/assets/icons/ico-preview.svg'

const InfoPair = ({ title, value }: { title: string; value: string }) => (
  <div className='flex'>
    <div className='text-gray-71 w-36'>{title}</div>
    <div className='text-gray-4a font-medium'>{value}</div>
  </div>
)

type TSubmitStepProps = {
  state: TAddNFTState
  image: TImage
  nftData: TNFTData
}

export default function SubmitStep({
  state: { goBack, goToNextStep, estimatedFee, optimizeImageToKb },
  image,
  nftData,
}: TSubmitStepProps): JSX.Element {
  const {
    info: { currencyName },
  } = useAppSelector(state => state.appInfo)
  const [fullScreen, toggleFullScreen] = useToggle(false)
  const [croppedImage] = useImagePreview({ image })

  if (fullScreen) {
    return <FullScreenImage image={image.url} onClose={toggleFullScreen} />
  }

  const onSubmit = async () => {
    try {
      // TODO: apply real data when user auth/register will be ready
      // it's mock data for local API in debug mode
      const pastelid =
          'jXYJud3rmrR1Sk2scvR47N4E4J5Vv48uCC6se2nzHrBRdjaKj3ybPoi1Y2VVoRqi1GnQrYKjSxQAC7NBtvtEdS',
        pass = 'test',
        spendableAddr = 'PtiqRXn2VQwBjp1K8QXR2uW2w2oZ3Ns7N6j',
        userName = 'John Doe'

      const form = new FormData()
      form.append('file', image.file)
      form.append('filename', image.file.name)
      const responseUpload = await artworkUploadImage(form)

      const regParams: TArtworkTicket = {
        artist_name: userName,
        artist_pastelid: pastelid,
        artist_pastelid_passphrase: pass,
        image_id: responseUpload.image_id,
        issued_copies: nftData.copies,
        maximum_fee: 0.01, // not sure how to get/calc this value, so TODO:
        name: nftData.title,
        spendable_address: spendableAddr,
      }

      if (nftData.website) {
        regParams.artist_website_url = nftData.website
      }

      if (nftData.description) {
        regParams.description = nftData.description
      }

      if (nftData.hashtags) {
        regParams.keywords = nftData.hashtags.join(', ')
      }

      if (nftData.series) {
        regParams.series_name = nftData.series
      }

      if (nftData.video) {
        regParams.youtube_url = nftData.video
      }

      /*const responseRegister = */ await artworkRegister(regParams)
      // not clear if we need responseRegister.task_id here or on next step

      toast('Successfully registered new NFT', { type: 'success' })

      goToNextStep()
    } catch (err) {
      console.log('err on register new NFT', err)
      toast('Register new NFT is failed', { type: 'error' })
    }
  }

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
            <img
              src={image.url}
              className='rounded max-h-[410px]'
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
              <InfoPair
                title='Keyword Hashtags'
                value={nftData.hashtags.join(', ')}
              />
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
              <div className='w-48 h-48'>
                {croppedImage && (
                  <img
                    src={croppedImage.src}
                    className='rounded w-full h-full'
                  />
                )}
              </div>
              {croppedImage?.error && (
                <div className='text-sm text-error font-medium mt-3'>
                  Error text error text
                </div>
              )}
            </div>
            <div className='bg-gray-f8 rounded-lg py-4 mt-3'>
              <div className='flex text-gray-71'>
                <div className='pl-5 w-36'>Image size</div>
                <div>Estimated registration fee</div>
              </div>
              <div className='flex text-gray-4a font-extrabold mt-3'>
                <div className='pl-5 w-36'>
                  {formatFileSize(optimizeImageToKb * 1024)}
                </div>
                <div>
                  {formatNumber(estimatedFee)} {currencyName}
                </div>
              </div>
            </div>
          </div>
          <div className='flex-between mt-3 flex-shrink-0'>
            <button
              type='button'
              className='rounded-full w-10 h-10 flex-center text-gray-b0 border border-gray-b0 transition duration-200 hover:text-gray-a0 hover:border-gray-a0'
              onClick={goBack}
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
