import axios, { AxiosRequestConfig } from 'axios'
import log from 'electron-log'
import {
  TArtworkTicket,
  IRegisterResult,
  IArtworkCollectionItem,
  IRegisterTaskResponseBody,
  ITaskState,
  IArtworkImage,
} from './interfaces'
import { walletNodeApiURL } from '../../../common/constants/urls'

const baseUrl: string = walletNodeApiURL + '/artworks'

async function makeRequest<T>(
  params: AxiosRequestConfig,
  goodResponseCodes?: number[],
): Promise<T> {
  params.url = baseUrl + params.url
  const res = await axios.request(params)
  if (!goodResponseCodes) {
    goodResponseCodes = [200]
  }
  const url: string = params.url || ''
  if (!goodResponseCodes.includes(res.status)) {
    log.info(`${url} return status ${res.status} and data:`, res.data)
    throw new Error(`API route ${url} return status ${res.status}`)
  }

  if (res.data.fault) {
    log.info(`${url} failed:`, res.data)
    throw new Error(`API route ${url} return error`)
  }

  return res.data
}

export const artworkRegister = (
  params: TArtworkTicket,
): Promise<IRegisterResult> => {
  return makeRequest<IRegisterResult>(
    {
      method: 'post',
      url: '/register',
      data: params,
    },
    [200, 201], // usually this API respond with 201 if success
  )
}

export const artworkGetList = (): Promise<IArtworkCollectionItem[]> => {
  return makeRequest<IArtworkCollectionItem[]>({
    method: 'get',
    url: '/register',
  })
}

export const artworkUploadImage = (form: FormData): Promise<IArtworkImage> => {
  return makeRequest<IArtworkImage>(
    {
      method: 'post',
      url: '/register/upload',
      data: form,
    },
    [200, 201], // usually this API respond with 201 if success
  )
}

export const artworkFindTask = (
  taskId: string,
): Promise<IRegisterTaskResponseBody> => {
  return makeRequest<IRegisterTaskResponseBody>({
    method: 'get',
    url: `/register/${taskId}`,
  })
}

export const artworkGetTaskState = (taskId: string): Promise<ITaskState> => {
  return makeRequest<ITaskState>({
    method: 'get',
    url: `/register/${taskId}/state`,
  })
}
