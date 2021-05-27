import { TConversation } from './MessagesStore'

interface RESPONSE {
  status: number
  data: TConversation[]
}

const conversations = {
  list: (): Promise<RESPONSE> =>
    new Promise(res =>
      res({
        status: 200,
        data: [],
      }),
    ),
}

export default conversations
