import faker from 'faker'

import svg_oval_1 from '../../common/assets/images/avatars/oval-1.svg'
import svg_oval_2 from '../../common/assets/images/avatars/oval-2.svg'
import svg_oval_3 from '../../common/assets/images/avatars/oval-3.svg'
import svg_oval_4 from '../../common/assets/images/avatars/oval-4.svg'
import svg_oval_5 from '../../common/assets/images/avatars/oval-5.svg'
import svg_oval_6 from '../../common/assets/images/avatars/oval-6.svg'
import svg_oval_7 from '../../common/assets/images/avatars/oval-7.svg'
import { TForumMember } from './ForumMembers'

const avatars = [
  svg_oval_1,
  svg_oval_2,
  svg_oval_3,
  svg_oval_4,
  svg_oval_5,
  svg_oval_6,
  svg_oval_7,
]

const generateMembers = (number: number): TForumMember[] => {
  return Array.from(Array(number), () => ({
    name: faker.name.firstName(),
    avatar: avatars[faker.datatype.number(6)],
  }))
}

export const data = [
  {
    topic: 'Truck craches at the 11floor8 bridge and then hits a car',
    favorite: faker.datatype.number(1),
    members: generateMembers(faker.datatype.number(12)),
    replies: {
      value: 1000,
      oldValue: 1000,
    },
    views: {
      value: 600000,
      oldValue: 600000,
    },

    activity: '1m',
  },
  {
    topic: 'Table saws are dangerous',
    favorite: faker.datatype.number(1),
    members: generateMembers(faker.datatype.number(12)),
    replies: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    views: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    activity: '2m',
  },
  {
    topic: 'Superb Owl 2019',
    favorite: faker.datatype.number(1),
    members: generateMembers(faker.datatype.number(12)),
    replies: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    views: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    activity: '3m',
  },
  {
    topic: 'How to flip a coin in your head',
    favorite: faker.datatype.number(1),
    members: generateMembers(faker.datatype.number(12)),
    replies: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    views: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    activity: '5m',
  },
  {
    topic:
      'Crypto CEO dies with password to unlock $200+ million of customers’ Bitcoin',
    favorite: faker.datatype.number(1),
    members: generateMembers(faker.datatype.number(12)),
    replies: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    views: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    activity: '12m',
  },
  {
    topic: 'How to get better at solving puzzies',
    favorite: faker.datatype.number(1),
    members: generateMembers(faker.datatype.number(12)),
    replies: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    views: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    activity: '51m',
  },
  {
    topic: 'A round up of Trumpian events',
    favorite: faker.datatype.number(1),
    members: generateMembers(faker.datatype.number(12)),
    replies: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    views: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    activity: '21m',
  },
  {
    topic:
      'Father of Parkland victim responds to Louis CK’s jokes with a “standup set”',
    favorite: faker.datatype.number(1),
    members: generateMembers(faker.datatype.number(12)),
    replies: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    views: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    activity: '20m',
  },
  {
    topic: 'How to get better at solving puzzies',
    favorite: faker.datatype.number(1),
    members: generateMembers(faker.datatype.number(12)),
    replies: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    views: {
      value: faker.datatype.number(10) * 100,
      oldValue: faker.datatype.number(10) * 100,
    },
    activity: '2m',
  },
]
