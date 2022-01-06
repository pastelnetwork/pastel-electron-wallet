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
import { artworkGetTaskDetail } from 'api/walletNode/artwork-api/artwork'

export type TAddNFTProps = { open: boolean } & TUseAddNFTProps

function AddNFTContent({
  toggleCloseButton,
  setTaskId,
  ...props
}: TUseAddNFTProps & {
  toggleCloseButton(): void
  setTaskId: (val: string) => void
}) {
  const state = useAddNFTState(props)
  const { step } = state

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
      onClose()
    }
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

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      closeButton={showCloseButton}
      render={renderModalContent}
    />
  )
}
