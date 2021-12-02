import axios, { AxiosRequestConfig } from 'axios'
import log from 'electron-log'
import querystring from 'query-string'
import {
  TArtworkTicket,
  IRegisterResult,
  IArtworkCollectionItem,
  IRegisterTaskResponseBody,
  ITaskState,
  IArtworkImage,
  TArtworkSearchParams,
  TArtworkSearchResponseProps,
  TArtworksDetailProps,
} from './interfaces'
import { walletNodeApiURL } from '../../../common/constants/urls'
import { readUsersInfo } from 'common/utils/User'

const baseUrl: string = walletNodeApiURL + '/artworks'

async function makeRequest<T>(
  params: AxiosRequestConfig,
  goodResponseCodes?: number[],
): Promise<T> {
  params.url = baseUrl + params.url
  const users = await readUsersInfo()
  if (users.length) {
    params.headers = {
      user_pastelid: users[0].pastelId,
      user_passphrase: `${users[0].password}${users[0].username}`,
    }
  }
  const res = await axios.request(params)
  if (!goodResponseCodes) {
    goodResponseCodes = [200]
  }
  const url: string = params.url || ''
  if (!goodResponseCodes.includes(res.status)) {
    const status: string = res.status?.toString()
    log.info(`${url} return status ${status} and data:`, res.data)
    throw new Error(`API route ${url} return status ${status}`)
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

export const artworkGetDetail = async (
  taskId: string,
): Promise<TArtworksDetailProps> => {
  return makeRequest<TArtworksDetailProps>({
    method: 'get',
    url: taskId,
  })
}

export const artworkSearch = async (
  params: TArtworkSearchParams,
): Promise<TArtworksDetailProps[]> => {
  const response = await makeRequest<TArtworkSearchResponseProps>({
    method: 'get',
    url: `/search?${querystring.stringify(params)}`,
  })
  const results: TArtworksDetailProps[] = []
  if (response) {
    const arts = response.artwork
    for (let i = 0; i < arts.length; i++) {
      const detail = await artworkGetDetail(arts[i].txid)
      if (detail) {
        results.push(detail)
      }
    }
  }

  return results
}
