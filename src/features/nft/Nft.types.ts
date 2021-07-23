import { Dayjs } from 'dayjs'

export type TNFT = {
  id: number
  title: string
  image: string
  pastelRareness: number
  internetRareness: number
  likes: number
  liked: boolean
  views: number
  type: string
  status: number
  price: number
  currencyName: string
  time: Dayjs
  bids: number
  author: {
    avatar: string
    name: string
  }
  copies: number
  royalty: string
  owner: string
  collection: string
  category: string
  tags: string[]
  description: string
}
