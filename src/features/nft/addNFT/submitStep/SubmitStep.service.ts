import log from 'electron-log'
import { toast } from 'react-toastify'
import path from 'path'
import fs from 'fs'

import {
  artworkRegister,
  artworkUploadImage,
} from 'api/walletNode/artwork-api/artwork'
import { getPastelIdTickets } from 'api/pastel-rpc'
import { TArtworkTicket } from 'api/walletNode/artwork-api/interfaces'
import { TAddNFTState, TImage, TNFTData } from '../AddNFT.state'
import { getStorageFee, TGetStorageFee } from 'api/estimate-fee'
import { readUsersInfo } from 'common/utils/User'
import { calcFileSize } from 'common/utils/file'
import store from '../../../../redux/store'

const getImageFile = (
  state: TAddNFTState,
  image: TImage,
): Promise<File | Blob> =>
  new Promise((resolve, reject) => {
    const optimizedFile = state.optimizationService.selectedFile

    const url =
      state.isLossLess || !optimizedFile ? image.url : optimizedFile.fileUrl
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'

    xhr.onload = () => {
      if (xhr.status !== 200) {
        return reject(new Error('Error accessing optimized image'))
      }
      const metadata = {
        type: image.type,
      }
      const tempPath = store.getState().appInfo.tempPath
      const file = new File(
        [xhr.response],
        path.join(tempPath, image.name),
        metadata,
      )
      resolve(file)
    }

    xhr.send()
  })

export const submit = async ({
  state,
  image,
  nftData,
  spendableAddr,
  setTaskId,
}: {
  state: TAddNFTState
  image: TImage
  nftData: TNFTData
  spendableAddr?: string
  setTaskId: (val: string) => void
}): Promise<void> => {
  try {
    const tempPath = store.getState().appInfo.tempPath
    const tickets = await getPastelIdTickets()
    const storageFee: TGetStorageFee = await getStorageFee()
    if (!storageFee) {
      toast('Register new NFT is failed', { type: 'error' })
      return
    }

    if (!tickets) {
      toast("PastelID isn't exists", { type: 'error' })
      return
    }

    if (!spendableAddr) {
      toast("The address isn't exists", { type: 'error' })
      return
    }

    const users = await readUsersInfo()
    const pastelid = tickets[0].ticket.pastelID,
      pass = `${users[0].password}${users[0].username}`,
      userName = users[0].username

    const form = new FormData()
    const file = await getImageFile(state, image)
    form.append('file', file)
    form.append('filename', image.name)
    const responseUpload = await artworkUploadImage(form)
    const fileSize =
      calcFileSize(
        state.optimizationService.selectedFile?.size || state.image?.size,
      ) || 0
    const regParams: TArtworkTicket = {
      artist_name: userName,
      artist_pastelid: pastelid,
      artist_pastelid_passphrase: pass,
      image_id: responseUpload.image_id,
      issued_copies: nftData.copies,
      maximum_fee:
        storageFee.networkFee * fileSize + storageFee.nftTicketFee * 5,
      name: nftData.title,
      spendable_address: spendableAddr,
      green: nftData.green,
      royalty: nftData.royalty,
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

    if (state.isImageCrop && state.crop) {
      // TODO: calc crop position
      // regParams.thumbnail_coordinate = {
      //   bottom_right_x: state.crop.x + state.crop.width,
      //   bottom_right_y: state.crop.y,
      //   top_left_x: state.crop.x,
      //   top_left_y: state.crop.y + state.crop.height,
      // }
    }

    const { task_id } = await artworkRegister(regParams)
    if (task_id) {
      setTaskId(task_id)
    }
    toast('Successfully registered new NFT', { type: 'success' })
    if (fs.existsSync(path.join(tempPath, image.name))) {
      fs.promises.unlink(path.join(tempPath, image.name))
    }
    state.goToNextStep()
  } catch (err) {
    const message: string = err.message || ''
    log.error(
      `features nft addNFT submitStep SubmitStep.service submit error: ${message}`,
      err,
    )
    toast('Register new NFT is failed', { type: 'error' })
  }
}
