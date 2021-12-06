export interface TArtworkTicket {
  artist_name: string
  artist_pastelid: string
  artist_pastelid_passphrase: string
  artist_website_url?: string
  description?: string
  image_id: string
  issued_copies: number
  keywords?: string
  maximum_fee: number
  name: string
  series_name?: string
  spendable_address: string
  youtube_url?: string
  green: boolean
  royalty: number
}

export interface IArtworkCollectionItem {
  id: string
  status: string
  ticket: TArtworkTicket
  txid: string
}

export interface IRegisterResult {
  task_id: string
}

export interface IError {
  id: string
  message: string
  name: string
}

export interface IArtworkImage {
  expires_in: string
  image_id: string
}

export interface ITaskState {
  date: string
  status: string
}

export interface IRegisterTaskResponseBody {
  id: string
  states: ITaskState[]
  status: string
  ticket: TArtworkTicket
  txid: string
}

export interface ITaskResponseTiny {
  id: string
  status: string
  ticket: TArtworkTicket
  txid: string
}

export type TArtworkSearchParams = {
  query: string
  artist_name: boolean
  art_title: boolean
  series: boolean
  descr: boolean
  keyword: boolean
  min_nsfw_score: number
  limit: number
}

export type TArtworksProps = {
  artist_name: string
  artist_pastelid: string
  artist_website_url: string
  copies: number
  description: string
  keywords: string
  series_name: string
  thumbnail_1?: string
  thumbnail_2?: string
  title: string
  txid: string
  youtube_url: string
}

type TArtworkSearchMatchesProps = {
  field_type: string
  matched_indexes: number[]
  score: number
  str: string
}

export type TArtworkSearchResponseProps = {
  artwork: TArtworksProps[]
  match_index: number
  matches: TArtworkSearchMatchesProps[]
}

export type TArtworksDetailProps = {
  artist_name: string
  artist_pastelid: string
  artist_website_url: string
  copies: number
  description: string
  drawing_nsfw_score: number
  green_address: boolean
  hentai_nsfw_score: number
  internet_rareness_score: 1
  keywords: string
  neutral_nsfw_score: number
  nsfw_score: number
  porn_nsfw_score: number
  rareness_score: number
  royalty: number
  series_name: string
  sexy_nsfw_score: number
  storage_fee: number
  thumbnail_1: string
  thumbnail_2: string
  title: string
  txid: string
  version: number
  youtube_url: string
}
