import { request } from './request'
import { Override } from '../../common/utils/types'
import { getCurrentAccount, readUsersInfo } from 'common/utils/User'

type TCreateOrUpdateParams = {
  artist_pastelid: string
  artist_pastelid_passphrase: string
  avatar_image?: {
    content: string
    filename?: string
  }
  biography?: string
  categories?: string // The categories of user's work, separate by ,
  cover_photo?: {
    content: string
    filename?: string
  }
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

export type TGetResponse = {
  artist_pastelid: string
  artist_pastelid_passphrase: string
  avatar_image?: {
    content: string
    filename?: string
  }
  biography?: string
  categories: string[]
  cover_photo?: {
    content: string
    filename?: string
  }
  facebook_link?: string
  location?: string
  native_currency?: string
  primary_language?: string
  realname?: string
  twitter_link?: string
  username?: string
}

export const defaultUserData = (): TGetResponse | undefined => {
  const currentUsername = getCurrentAccount()
  if (!currentUsername) {
    return undefined
  }

  return {
    artist_pastelid: currentUsername?.pastelId,
    artist_pastelid_passphrase: '',
    avatar_image: {
      content: '',
      filename: '',
    },
    biography: '',
    categories: [],
    cover_photo: {
      content: '',
      filename: '',
    },
    facebook_link: '',
    location: '',
    native_currency: 'USD',
    primary_language: 'en',
    realname: '',
    twitter_link: '',
    username: currentUsername?.username,
  }
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

export const getUserData = async (params: {
  pastelId: string
}): Promise<TGetResponse | null> => {
  const currentUsername = getCurrentAccount()
  try {
    const result = await request.get<
      Override<TGetResponse, { categories: string }>
    >(`/userdatas/${params.pastelId}`, {
      removeEmpty: true,
      removeNullStrings: true,
    })
    return {
      ...result,
      categories: result.categories ? result.categories.split(',') : [],
      username: currentUsername?.username,
    }
  } catch {
    if (currentUsername) {
      const users = await readUsersInfo()
      const user = users.find(
        u =>
          u.pastelId === currentUsername.pastelId &&
          u.username === currentUsername.username,
      )
      if (user) {
        return {
          ...defaultUserData(),
          artist_pastelid: currentUsername.pastelId,
          artist_pastelid_passphrase: `${user.password}${user.username}`,
          categories: [],
        }
      }
    }

    return null
  }
}
