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
