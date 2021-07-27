import React, { useState } from 'react'
import ProfileCard from '../components/MyProfileCard'
import ProfileComments from '../components/ProfileComments'
import { nativeCurrencyOptions } from '../myProfile/MyProfile'
import { TOption } from '../components/Select/Select'
import Checkbox from 'common/components/Checkbox'
import { TComment } from '../components/CommentCard'
import * as ROUTES from 'common/utils/constants/routes'

import avatar1 from 'common/assets/images/avatars/oval-1.svg'
import avatar2 from 'common/assets/images/avatars/oval-2.svg'
import avatar3 from 'common/assets/images/avatars/oval-3.svg'
import avatar4 from 'common/assets/images/avatars/oval-4.svg'

const commentsData: TComment[] = [
  {
    id: 1,
    avatar: avatar1,
    name: 'Glenn Greer',
    liked: 0,
    author: 'Collab',
    time: new Date().getTime(),
    comment:
      'Love this so much! What tools do you use to create your 3d illustrations?',
    replyId: 0,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
  {
    id: 2,
    avatar: avatar2,
    name: 'Reymundo',
    liked: 23,
    author: 'Unity Dashboard kit',
    time: new Date('06/29/2021').getTime(),
    comment:
      'I’m baby readymade mikshk tatooed actually activated charcoal godard listicle. Mumblecore cronut kickstarter, bushwick wolf copper mug woke chia put a bird on it viral gentrify keytar synth. Twee chartreuse etsy, +1',
    replyId: 1,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
  {
    id: 3,
    avatar: avatar3,
    name: 'Edwardo Bea',
    liked: 23,
    author: 'Collab',
    time: new Date('06/29/2021').getTime(),
    comment: 'Love this so much! 🍕',
    replyId: 1,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
  {
    id: 4,
    avatar: avatar4,
    name: 'Reymundo',
    liked: 23,
    author: 'Collab',
    time: new Date('06/28/2021').getTime(),
    comment:
      'Love this so much! What tools do you use to create your 3d illustrations?',
    replyId: 1,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
  {
    id: 5,
    avatar: avatar2,
    name: 'Dirk Jaison',
    liked: 23,
    author: 'Collab',
    time: new Date('06/25/2021').getTime(),
    comment: 'Awesome! 😍',
    replyId: 4,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
  {
    id: 6,
    avatar: avatar4,
    name: 'Glenn Greer',
    liked: 23,
    author: 'Collab',
    time: new Date('06/25/2021').getTime(),
    comment: 'Mumblecore cronut kickstarter!',
    replyId: 4,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
  {
    id: 7,
    avatar: avatar1,
    name: 'Reymundo',
    liked: 23,
    author: 'Collab',
    time: new Date('06/23/2021').getTime(),
    comment:
      'Love this so much! What tools do you use to create your 3d illustrations?',
    replyId: 1,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
  {
    id: 8,
    avatar: avatar3,
    name: 'Dirk Jaison',
    liked: 23,
    author: 'Collab',
    time: new Date('06/22/2021').getTime(),
    comment: 'Awesome! 😍',
    replyId: 7,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
  {
    id: 9,
    avatar: avatar1,
    name: 'Glenn Greer',
    liked: 23,
    author: 'Collab',
    time: new Date('06/22/2021').getTime(),
    comment: 'Mumblecore cronut kickstarter!',
    replyId: 7,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
  {
    id: 10,
    avatar: avatar2,
    name: 'Glenn Greer',
    liked: 0,
    author: 'Collab',
    time: new Date('06/30/2021').getTime(),
    comment:
      'Love this so much! What tools do you use to create your 3d illustrations?',
    replyId: 0,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
  {
    id: 11,
    avatar: avatar3,
    name: 'Glenn Greer',
    liked: 0,
    author: 'Collab',
    time: new Date('06/30/2021').getTime(),
    comment:
      'Love this so much! What tools do you use to create your 3d illustrations?',
    replyId: 0,
    profileUrl: ROUTES.MY_PROFILE,
    portfolioUrl: ROUTES.PORTFOLIO_DETAIL,
  },
]

const filters = [
  {
    name: 'All',
    isChecked: false,
    value: '',
  },
  {
    name: 'Friends',
    isChecked: true,
    value: 'friends',
  },
  {
    name: 'Followers',
    isChecked: true,
    value: 'followers',
  },
  {
    name: 'Others',
    isChecked: false,
    value: 'others',
  },
]

const MyComments = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false)
  const [nativeCurrency, setNativeCurrency] = useState<TOption | null>(
    nativeCurrencyOptions[0],
  )

  const handleOnReply = (replyId: number, reply: string) => {
    console.log(replyId, reply)
  }

  const handleOnLikeClick = (commentId: number) => {
    console.log(commentId)
  }

  const onClickFilter = (value: string) => {
    console.log(value)
  }

  const isEmpty = false

  return (
    <div className='flex flex-col flex-grow items-center'>
      <div className='wrapper flex px-60px pb-8 justify-center pt-9 w-full'>
        <div className='flex flex-col items-center'>
          <ProfileCard
            editMode={editMode}
            setEditMode={setEditMode}
            isEmpty={isEmpty}
            nativeCurrencyOptions={nativeCurrencyOptions}
            nativeCurrency={nativeCurrency}
            onNativeCurrencyChange={setNativeCurrency}
          />
        </div>
        <div className='flex pl-50px justify-between flex-col-reverse lg:flex-row flex-grow'>
          <div className='w-full lg:w-4/5'>
            <ProfileComments
              comments={commentsData}
              onReply={handleOnReply}
              onLikeClick={handleOnLikeClick}
            />
          </div>
          <div className='lg:ml-72px w-full lg:w-137px mb-10 lg:mb-0'>
            <p className='mb-0 text-base font-medium text-gray-42'>
              Filter by:
            </p>
            <ul className='mt-4 flex lg:block'>
              {filters.map((filter, index) => (
                <li className='lg:mb-3 mr-3 lg:mr-0' key={index}>
                  <Checkbox
                    isChecked={filter.isChecked}
                    clickHandler={() => onClickFilter(filter.value)}
                  >
                    <span className='text-sm leading-18px font-medium text-gray-11'>
                      {filter.name}
                    </span>
                  </Checkbox>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyComments
