import { Dayjs } from 'dayjs'

export type TComment = {
  id: number
  author: {
    avatar: string
    name: string
  }
  message: string
  publishedAt: Dayjs
}
