import React, { useCallback, useState, useEffect } from 'react'
import { useToggle } from 'react-use'
import { toast } from 'react-toastify'

import {
  TNFTData,
  Step,
  TUseAddNFTProps,
  useAddNFTState,
  TImage,
} from './AddNFT.state'
import Modal from 'common/components/AnimatedModal'
import SelectImageStep from './selectImageStep/SelectImageStep'
import AfterUploadStep from './afterSelectStep/AfterSelectStep'
import PreviewStep from './previewStep/PreviewStep'
import SubmitStep from './submitStep/SubmitStep'
import ApprovedStep from './approvedStep/ApprovedStep'
import InputNFTDataStep from './inputNFTDataStep/InputNFTDataStep'
import { walletWebSocketURL } from 'common/constants/urls'
import { Button } from 'common/components/Buttons'
import { artworkGetTaskDetail } from 'api/walletNode/artwork-api/artwork'
import { getNFTDataStore, removeNFTData } from './AddNFT.store'

export type TAddNFTProps = { open: boolean } & TUseAddNFTProps

function AddNFTContent({
  toggleCloseButton,
  setTaskId,
  ...props
}: TUseAddNFTProps & {
  toggleCloseButton(): void
  setTaskId: (val: string) => void
}) {
  const nftStore = getNFTDataStore()
  const state = useAddNFTState(props)
  const { step } = state

  useEffect(() => {
    if (nftStore.step) {
      state.setStep(nftStore.step)
    }
    if (nftStore.nftData) {
      state.setNftData(nftStore.nftData)
    }
    if (nftStore.crop) {
      state.setCrop(nftStore.crop)
    }
    if (nftStore.isImageCrop) {
      state.setImageCrop(nftStore.isImageCrop)
    }
    if (nftStore.image) {
      state.setImage({
        ...nftStore.image,
        url: nftStore.fileUploaded || nftStore.image.url,
      })
    }
    if (nftStore.isLossLess) {
      state.setIsLossLess(nftStore.isLossLess)
    }
    if (nftStore.estimatedFee) {
      state.setEstimatedFee(nftStore.estimatedFee)
    }
    if (nftStore.thumbnail) {
      state.setThumbnail(nftStore.thumbnail)
    }
    if (nftStore.percentage && nftStore.percentage === 100) {
      state.setPercentage(nftStore.percentage)
    }
    if (nftStore.files) {
      state.optimizationService.setFiles(nftStore.files)
    }
    if (nftStore.selectedFile) {
      state.optimizationService.setSelectedFile(nftStore.selectedFile)
    }
  }, [])

  if (step === Step.inputData) {
    return <InputNFTDataStep state={state} />
  }

  if (step === Step.select) {
    return <SelectImageStep state={state} />
  }

  const image = state.image as TImage
  const nftData = state.nftData as TNFTData

  const { selectedFile } = state.optimizationService
  const displayUrl =
    state.isLossLess || !selectedFile ? image.url : selectedFile.fileUrl

  if (step === Step.afterSelect) {
    return (
      <AfterUploadStep state={state} image={image} displayUrl={displayUrl} />
    )
  }

  if (step === Step.preview && state.image) {
    return (
      <PreviewStep
        state={state}
        image={image}
        displayUrl={displayUrl}
        toggleCloseButton={toggleCloseButton}
      />
    )
  }

  if (step === Step.submit) {
    return (
      <SubmitStep
        state={state}
        image={image}
        displayUrl={displayUrl}
        nftData={nftData}
        toggleCloseButton={toggleCloseButton}
      />
    )
  }

  if (step === Step.approved) {
    return (
      <ApprovedStep
        state={state}
        image={image}
        displayUrl={displayUrl}
        nftData={nftData}
        setTaskId={setTaskId}
      />
    )
  }

  return null
}

export default function AddNFT({
  open,
  onClose,
  ...props
}: TAddNFTProps): JSX.Element {
  const [showCloseButton, toggleCloseButton] = useToggle(true)
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [taskId, setTaskId] = useState<string>('')

  const getTaskState = () => {
    try {
      const generateTaskMessage = async (webSocketUrl: string) => {
        try {
          const url = webSocketUrl.split('artworks/register/')[1]
          const result = await artworkGetTaskDetail(url.split('/')[0])
          toast(`${result.ticket.name}: ${result.status}`, { type: 'success' })
        } catch (error) {
          toast(error.message, { type: 'error' })
        }
      }
      const wsUrl: string = walletWebSocketURL
      const vTaskId: string = taskId
      const socket = new WebSocket(
        `${wsUrl}/artworks/register/${vTaskId}/state`,
      )

      socket.addEventListener('message', () => {
        generateTaskMessage(socket.url)
          .then(() => {
            // noop
          })
          .catch(() => {
            // noop
          })
          .finally(() => {
            // noop
          })
      })

      socket.addEventListener('error', () => {
        toast('Internal Server Error response.', { type: 'error' })
        socket.close()
      })
    } catch (error) {
      toast(error.message, { type: 'error' })
    }
  }

  useEffect(() => {
    if (taskId) {
      getTaskState()
    }
  }, [taskId])

  const handleCloseModal = useCallback(() => {
    if (onClose) {
      const nftStore = getNFTDataStore()
      if (nftStore.step === Step.approved) {
        setShowConfirmModal(true)
      } else {
        onClose()
      }
    }
  }, [])

  const handleCloseConfirmModal = useCallback(() => {
    setShowConfirmModal(false)
  }, [])

  const handleRemoveNftData = useCallback(() => {
    removeNFTData()
    setShowConfirmModal(false)
    onClose()
  }, [])

  const renderModalContent = useCallback(
    () => (
      <AddNFTContent
        {...props}
        onClose={onClose}
        toggleCloseButton={toggleCloseButton}
        setTaskId={setTaskId}
      />
    ),
    [props],
  )

  const renderConfirmModalControls = () => (
    <div className='flex relative z-10 space-x-5 pt-5 mx-auto min-w-xs'>
      <Button secondary className='w-1/2' onClick={handleCloseConfirmModal}>
        No
      </Button>
      <Button className='w-1/2' onClick={handleRemoveNftData}>
        Yes
      </Button>
    </div>
  )

  const renderConfirmContentModal = useCallback(() => {
    return (
      <div className='paper p-5 w-[350px]'>
        <div className='pt-5'>
          <div className='text-lg font-medium text-center mt-5'>
            Are you sure you want to leave?
          </div>
          {renderConfirmModalControls()}
        </div>
      </div>
    )
  }, [])

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        closeButton={showCloseButton}
        render={renderModalContent}
      />
      <Modal
        open={showConfirmModal}
        onClose={handleCloseConfirmModal}
        closeButton
        render={renderConfirmContentModal}
      />
    </>
  )
}
