import React, { useState, useCallback, memo, useEffect } from 'react'
import log from 'electron-log'
import { v4 as uuidv4 } from 'uuid'

import ProfileCard from '../components/MyProfileCard'
import ProfileComments from '../components/ProfileComments'
import { nativeCurrencyOptions } from '../myProfile/MyProfile'
import Checkbox from 'common/components/Checkbox'
import { TComment } from '../components/CommentCard'
import * as ROUTES from 'common/utils/constants/routes'
import { TGetResponse } from 'api/walletNode/userData'
import { translate } from 'features/app/translations'

import avatar1 from 'common/assets/images/avatars/oval-1.svg'
import avatar2 from 'common/assets/images/avatars/oval-2.svg'
import avatar3 from 'common/assets/images/avatars/oval-3.svg'
import avatar4 from 'common/assets/images/avatars/oval-4.svg'
import { TOption } from '../../../common/components/Select'

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
      'Iām baby readymade mikshk tatooed actually activated charcoal godard listicle. Mumblecore cronut kickstarter, bushwick wolf copper mug woke chia put a bird on it viral gentrify keytar synth. Twee chartreuse etsy, +1',
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
    comment: 'Love this so much! š',
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
    comment: 'Awesome! š',
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
    comment: 'Awesome! š',
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

const ProfileCommentList = memo(function ProfileCommentList({
  handleOnReply,
  handleOnLikeClick,
}: {
  handleOnLikeClick: (val: number) => void
  handleOnReply: (replyId: number, reply: string) => void
}): JSX.Element {
  const onLikeClick = useCallback((commentId: number) => {
    handleOnLikeClick(commentId)
  }, [])

  const onReply = useCallback((replyId: number, reply: string) => {
    handleOnReply(replyId, reply)
  }, [])

  return (
    <div className='w-full lg:w-4/5'>
      <ProfileComments
        comments={commentsData}
        onReply={onReply}
        onLikeClick={onLikeClick}
      />
    </div>
  )
})

const FilterCheckbox = memo(function FilterCheckbox({
  isChecked,
  value,
  onClickFilter,
  name,
}: {
  isChecked: boolean
  value: string
  onClickFilter: (val: string) => void
  name: string
}): JSX.Element {
  const onChange = useCallback(() => {
    onClickFilter(value)
  }, [value])

  return (
    <Checkbox isChecked={isChecked} clickHandler={onChange}>
      <span className='text-sm leading-18px font-medium text-gray-11'>
        {name}
      </span>
    </Checkbox>
  )
})

function MyComments({
  user,
  updateUserData,
}: {
  user?: TGetResponse
  updateUserData: () => void
}): JSX.Element {
  const filters = [
    {
      id: uuidv4(),
      name: translate('all'),
      isChecked: false,
      value: '',
    },
    {
      id: uuidv4(),
      name: translate('friends'),
      isChecked: true,
      value: 'friends',
    },
    {
      id: uuidv4(),
      name: translate('followers'),
      isChecked: true,
      value: 'followers',
    },
    {
      id: uuidv4(),
      name: translate('others'),
      isChecked: false,
      value: 'others',
    },
  ]
  const [editMode, setEditMode] = useState(false)
  const [nativeCurrency, setNativeCurrency] = useState<TOption | null>(
    nativeCurrencyOptions[0],
  )
  const [userData, setUserData] = useState<TGetResponse | undefined>()

  useEffect(() => {
    if (user && !userData) {
      setUserData(user)
    }
  }, [])

  const handleOnReply = useCallback((replyId: number, reply: string) => {
    log.log(replyId, reply)
  }, [])

  const handleOnLikeClick = useCallback((commentId: number) => {
    log.log(commentId)
  }, [])

  const onClickFilter = useCallback((value: string) => {
    log.log(value)
  }, [])

  const renderFilter = () => (
    <div className='lg:ml-72px w-full lg:w-137px mb-10 lg:mb-0'>
      <p className='mb-0 text-base font-medium text-gray-42'>
        {translate('filterBy')}:
      </p>
      <ul className='mt-4 flex lg:block'>
        {filters.map(filter => (
          <li className='lg:mb-3 mr-3 lg:mr-0' key={filter.id}>
            <FilterCheckbox
              onClickFilter={onClickFilter}
              isChecked={filter.isChecked}
              name={filter.name}
              value={filter.value}
            />
          </li>
        ))}
      </ul>
    </div>
  )

  const renderProfileCard = () => (
    <div className='flex flex-col items-center'>
      <ProfileCard
        editMode={editMode}
        setEditMode={setEditMode}
        nativeCurrencyOptions={nativeCurrencyOptions}
        nativeCurrency={nativeCurrency}
        onNativeCurrencyChange={setNativeCurrency}
        user={user}
        userData={userData}
        handleUpdateUserData={updateUserData}
      />
    </div>
  )

  const renderCommentContent = () => (
    <div className='flex pl-50px justify-between flex-col-reverse lg:flex-row flex-grow'>
      <ProfileCommentList
        handleOnLikeClick={handleOnLikeClick}
        handleOnReply={handleOnReply}
      />
      {renderFilter()}
    </div>
  )

  return (
    <div className='flex flex-col flex-grow items-center'>
      <div className='wrapper flex px-60px pb-8 justify-center pt-9 w-full'>
        {renderProfileCard()}
        {renderCommentContent()}
      </div>
    </div>
  )
}

export default MyComments

MyComments.defaultProps = {
  user: undefined,
}
