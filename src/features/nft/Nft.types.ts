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
  status: 'listed'
  price: number
  currencyName: 'PSL'
  time: Dayjs
  bids: number
  author: {
    avatar: string
    name: string
  }
  copies: number
  owner: string
  collection: string
  category: string
  tags: string[]
  description: string
}
