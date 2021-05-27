import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { AppDispatch, RootState } from '../../../redux/store'
import {
  fetchConversations,
  pastelMessageReducer,
  updateConversationList,
} from '../MessagesStore'
import conversationMock from '../conversation-mock'

jest.mock('../conversation-mock', () => ({
  list: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureMockStore<RootState, AppDispatch>(middlewares)
const store = mockStore()

const CONVERSATIONS = [
  {
    id: 'id1',
    name: 'Hanh Tran',
    thumbnail: 'https://randomuser.me/api/portraits/women/6.jpg',
    lastMessage: 'Hello Thuat Nguyen',
    messages: [
      {
        id: 'id2',
        author: 'orange',
        message: 'Hello Thuat Nguyen',
        image: [],
        record: '',
        timestamp: new Date('5/5/2021').getTime(),
      },
    ],
    timestamp: new Date('5/5/2021').getTime(),
  },
]

describe('fetchConversations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('correctly fetch conversations ', async () => {
    // Arrange
    const conversationSpy = jest
      .spyOn(conversationMock, 'list')
      .mockResolvedValue({
        status: 200,
        data: CONVERSATIONS,
      })

    // Acts
    await store.dispatch(fetchConversations())

    expect(conversationSpy).toBeCalledTimes(0)
    expect(store.getActions()).toEqual([
      {
        payload: CONVERSATIONS,
        type: 'messages/updateConversationList',
      },
    ])
  })
})

describe('pastelMessage reducer', () => {
  test('returns correct default state', () => {
    // Act
    const s = pastelMessageReducer(undefined, { type: 'test' })

    // Assert
    expect(s).toEqual({
      isLoading: false,
      currentConversationId: '',
      conversations: [],
    })
  })

  test('updates state correctly', () => {
    // Act
    const s = pastelMessageReducer(
      undefined,
      updateConversationList(CONVERSATIONS),
    )

    // Assert
    expect(s).toEqual({
      isLoading: false,
      currentConversationId: 'id1',
      conversations: CONVERSATIONS,
    })
  })
})
