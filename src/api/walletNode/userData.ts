import { request } from './request'
import { Override } from '../../common/utils/types'

type TCreateOrUpdateParams = {
  artist_pastelid: string
  artist_pastelid_passphrase: string
  avatar_image?: File
  biography?: string
  categories?: string // The categories of user's work, separate by ,
  cover_photo?: File
  facebook_link?: string
  location?: string
  native_currency?: string // Native currency of user in ISO 4217 Alphabetic Code
  primary_language?: string // Primary language of the user, follow ISO 639-2 standard
  realname?: string
  twitter_link?: string
}

type TCreateOrUpdateResponse = {
  avatar_image?: string
  biography?: string
  categories: string[]
  cover_photo?: string
  detail: string
  facebook_link?: string
  location?: string
  native_currency?: string
  primary_language?: string
  realname?: string
  response_code: number
  twitter_link?: string
}

const createOrUpdate = async (path: string, data: TCreateOrUpdateParams) => {
  const result = await request.post<
    Override<TCreateOrUpdateResponse, { categories: string }>
  >(path, {
    data,
    removeEmpty: true,
  })
  return {
    ...result,
    categories: result.categories ? result.categories.split(',') : [],
  }
}

export const create = (
  data: TCreateOrUpdateParams,
): Promise<TCreateOrUpdateResponse> => createOrUpdate('/userdatas/create', data)

export const update = (
  data: TCreateOrUpdateParams,
): Promise<TCreateOrUpdateResponse> => createOrUpdate('/userdatas/update', data)

type TGetResponse = {
  realname?: string
  facebook_link?: string
  twitter_link?: string
  native_currency?: string
  location?: string
  primary_language?: string
  categories: string[]
  biography?: string
  artist_pastelid: string
  artist_pastelid_passphrase: string
}

export const get = async (params: {
  pastelId: string
}): Promise<TGetResponse> => {
  const result = await request.get<
    Override<TGetResponse, { categories: string }>
  >(`/userdatas/${params.pastelId}`, {
    removeEmpty: true,
    removeNullStrings: true,
  })
  return {
    ...result,
    categories: result.categories ? result.categories.split(',') : [],
  }
}
