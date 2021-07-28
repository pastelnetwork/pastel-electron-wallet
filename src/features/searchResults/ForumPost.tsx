import React, { useState } from 'react'
import Select, { TOption } from 'common/components/Select/Select'
import { rankingData } from './mockData'
import Table, { TRow } from 'common/components/Table'
import { Arrow, Star } from 'common/components/Icons'
import Avatar from 'common/assets/images/avatar-placeholder.png'
import AvatarGroup from 'common/components/AvatarGroup'
import cn from 'classnames'

export type TForumPostProps = {
  searchKey: string
}

const ForumPost = (): JSX.Element => {
  const kFormatter = (num: number) => {
    return Math.abs(num) > 999
      ? Math.sign(num) + (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num)
  }

  const columns = [
    {
      key: 'topic',
      name: 'Topic',
      custom: (value: string | number, row: TRow | undefined) => (
        <div className='flex items-center justify-between pr-[68px] pl-[18px]'>
          <div>{value}</div>
          <div className='flex items-center'>
            {row && row.favourite && (
              <Star className='text-yellow-ffd' filled={true} />
            )}
            {row && row.favourite === false && (
              <Star className='text-gray-8e' filled={false} />
            )}
            <AvatarGroup
              className='ml-[39px]'
              urlData={Array(7).fill(Avatar)}
              limitNumber={5}
            />
          </div>
        </div>
      ),
      headerColClasses: 'pl-[18px]',
    },
    {
      key: 'replies',
      name: 'Replies',
      colClasses: 'w-[146px]',
      custom: (value: string | number, row: TRow | undefined) => (
        <div className='text-gray-a0 flex'>
          <span
            className={cn(
              row && row.repliesRise && 'text-green-00',
              row && row.repliesRise === false && 'text-red-75',
            )}
          >
            {value}
          </span>
          {row && row.repliesRise && (
            <Arrow className='ml-1 text-green-00' size={10} to='top' />
          )}
          {row && row.repliesRise === false && (
            <Arrow className='ml-1 text-red-75' size={10} to='bottom' />
          )}
        </div>
      ),
    },
    {
      key: 'views',
      name: 'Views',
      colClasses: 'w-[137px]',
      custom: (value: string | number, row: TRow | undefined) => (
        <div className='text-gray-a0 flex'>
          <span
            className={cn(
              row && row.viewsRise && 'text-green-00',
              row && row.viewsRise === false && 'text-red-75',
            )}
          >
            {typeof value === 'string'
              ? kFormatter(parseInt(value))
              : kFormatter(value)}
          </span>
          {row && row.viewsRise && (
            <Arrow className='ml-1 text-green-00' size={10} to='top' />
          )}
          {row && row.viewsRise === false && (
            <Arrow className='ml-1 text-red-75' size={10} to='bottom' />
          )}
        </div>
      ),
    },
    {
      key: 'activity',
      name: 'Activity',
      custom: (value: string | number) => (
        <div className='text-gray-a0'>{value}m</div>
      ),
    },
  ]

  const data = [
    {
      topic: 'Track craches at the 11floor8 Bans and then hits a car',
      replies: 0,
      views: 0,
      activity: 1,
      favourite: false,
    },
    {
      topic: 'Banscy Table saws are dangerous',
      replies: 180,
      views: 2800,
      activity: 2,
      repliesRise: false,
      viewsRise: false,
      favourite: true,
    },
    {
      topic: 'Superb Owl Banscy 2019',
      replies: 78,
      views: 1200,
      activity: 2,
      repliesRise: true,
      viewsRise: true,
      favourite: false,
    },
    {
      topic: 'Banscy How to flip a coin in your head',
      replies: 4,
      views: 80,
      activity: 1,
      favourite: false,
    },
    {
      topic:
        "Banscy CEO dies with password to unlock $200+ million of customer's Bitcoin",
      replies: 0,
      views: 20,
      activity: 4,
      favourite: false,
    },
  ]

  const [ranking, setRanking] = useState<TOption | null>(rankingData[0])

  return (
    <div>
      <div className='bg-white flex py-[17px] px-[18px]'>
        <Select
          options={rankingData}
          selected={ranking}
          selectClassName='bg-white w-[160px] mr-6'
          onChange={setRanking}
          placeholder='All categories'
        />
      </div>
      <div className='mt-5 bg-white py-[26px] pl-[38px] pr-[35px]'>
        <Table
          headerTrClasses='border-0 h-[55px] text-gray-4a font-extrabold text-base'
          columns={columns}
          data={data}
          bodyTrClasses='border-b border-gray-f2 text-gray-2d h-[55px] font-medium text-base'
        />
      </div>
    </div>
  )
}

export default ForumPost
