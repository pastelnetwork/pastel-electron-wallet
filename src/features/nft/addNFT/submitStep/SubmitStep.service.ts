import { artworkRegister, artworkUploadImage } from 'api/artwork-api/artwork'
import { TArtworkTicket } from 'api/artwork-api/interfaces'
import { toast } from 'react-toastify'
import { TAddNFTState, TImage, TNFTData } from '../AddNFT.state'

export const submit = async ({
  state,
  image,
  nftData,
}: {
  state: TAddNFTState
  image: TImage
  nftData: TNFTData
}): Promise<void> => {
  try {
    // TODO: apply real data when user auth/register will be ready
    // it's mock data for local API in debug mode
    const pastelid =
        'jXYJud3rmrR1Sk2scvR47N4E4J5Vv48uCC6se2nzHrBRdjaKj3ybPoi1Y2VVoRqi1GnQrYKjSxQAC7NBtvtEdS',
      pass = 'test',
      spendableAddr = 'PtiqRXn2VQwBjp1K8QXR2uW2w2oZ3Ns7N6j',
      userName = 'John Doe'

    const form = new FormData()
    const file = await getImageFile(state, image)
    form.append('file', file)
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

    state.goToNextStep()
  } catch (err) {
    console.log('err on register new NFT', err)
    toast('Register new NFT is failed', { type: 'error' })
  }
}

const getImageFile = (
  state: TAddNFTState,
  image: TImage,
): Promise<File | Blob> =>
  new Promise((resolve, reject) => {
    const optimizedFile = state.optimizationState.selectedFile

    if (state.isLossLess || !optimizedFile) {
      return resolve(image.file)
    }

    const xhr = new XMLHttpRequest()
    xhr.open('GET', optimizedFile.fileUrl, true)
    xhr.responseType = 'blob'

    xhr.onload = () => {
      if (xhr.status !== 200) {
        return reject(new Error('Error accessing optimized image'))
      }
      resolve(xhr.response)
    }

    xhr.send()
  })
