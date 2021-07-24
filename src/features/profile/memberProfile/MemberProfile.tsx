import React, { useState } from 'react'

import { useAppSelector } from 'redux/hooks'
import ProfileCard from '../components/ProfileCard'
import ProfileRelations from '../components/ProfileRelations'
import ProfileGeneral from '../components/ProfileGeneral'
import MultiToggleSwitch from '../../../common/components/MultiToggleSwitch'
import Select, { TOption } from '../../../common/components/Select/Select'
import NFTCard, { TNFTCard } from '../../../common/components/NFTCard'
import image from '../../../common/assets/images/nft-card-placeholder.png'
import avatar from '../../../common/assets/images/avatar-placeholder.png'
import MemberCard from '../components/MemberCard'
import Checkbox from '../../../common/components/Checkbox'

const profile_data = {
  username: '@zndrson',
  walletId: '0xc4c16a645aaaa4123b21a',
  reputation: 4.89,
  name: 'Katy Jaison',
  description: 'Cosmic Perspective: Galatic Arch',
  address: 'New York, US',
  social: {
    facebook: 'www.facebook.com/dirk_jaison',
    twitter: 'www.twitter.com/@dirk_jaison',
  },
}

const general_data = {
  location: 'New York, US',
  language: 'English',
  categories: 'motion graphics, illustration, \nabstract',
  reputation: 4.89,
  buyerBans: 3,
  highestFeeRecieved: '136,200 PSL',
  totalSalesAmount: '560,600 PSL',
  totalItemsSold: '124 Copies across 5 NFTs',
  topCategoryPercentage: 'motion graphics 30%',
  bio:
    'I am a digital artist based in Paris, France. My work has been featured in various galleries in Paris and New York City. I love playing with the characteristics of light in all its forms, and I like to challenge the way color is normally perceived in nature. I use various tools to create my work, including Rhino for 3D modeling and and Maxwell for rendering, with other work done in Photoshop and Illustrator.',
}

const categoriesOptions: TOption[] = [
  { value: 'All', label: 'All' },
  { value: 'option_2', label: 'TOption 2' },
  { value: 'option_3', label: 'TOption 3' },
]

const filterData = [
  { label: 'Likes', value: 'Likes', checked: false },
  { label: 'Comments', value: 'Comments', checked: false },
  { label: 'Mention', value: 'Mention', checked: false },
  { label: 'Followers', value: 'Followers', checked: false },
]

const MemberProfile = (): JSX.Element => {
  const {
    info: { currencyName },
  } = useAppSelector(state => state.appInfo)

  const mockCardProps: TNFTCard = {
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName,
    liked: true,
    percentage: 75,
    variant: 'portfolio',
    isLastBid: false,
    hideLikeButton: true,
    author: 'vanecha',
    avatarSrc: avatar,
    imageSrc: image,
    title: 'Infinity I',
    hideFollow: true,
  }

  const [tab, setTab] = useState(2)
  const [category, setCategory] = useState<TOption | null>(categoriesOptions[0])
  const [type, setType] = useState<TOption | null>(categoriesOptions[0])
  const [sort, setSort] = useState<TOption | null>(categoriesOptions[0])
  const [activeIndex, setActiveIndex] = useState(0)

  const onTabToggle = (index: number) => {
    setTab(index)
  }

  return (
    <div>
      <div className='mx-auto w-full flex flex-col text-gray-23 justify-center bg-gray-f8'>
        <div className='wrapper pt-0 h-35px flex items-center'>
          <div className='text-sm text-gray-71'>Member Profile / General</div>
        </div>
        <div className='bg-white'>
          <div className='wrapper flex h-20 items-center bg-white pl-60px pt-0'>
            <div className='font-bold pr-8 text-32px'>Katy Jailson Profile</div>
            <MultiToggleSwitch
              data={[
                { label: 'Info' },
                { label: 'Portfolio' },
                { label: 'Board' },
              ]}
              activeIndex={tab}
              onToggle={onTabToggle}
            />
          </div>
        </div>
        <div className='wrapper flex py-8 pl-60px pr-25px'>
          <div className='flex w-full'>
            <div className='flex flex-col items-center lg:justify-between'>
              <ProfileCard {...profile_data} isMyProfile={true} />
            </div>
            <div className='flex flex-col flex-grow pl-8'>
              {tab === 0 && (
                <div className='flex justify-between flex-col 1200px:flex-row'>
                  <ProfileGeneral {...general_data} />
                  <ProfileRelations />
                </div>
              )}
              {tab === 1 && (
                <div>
                  <div className='flex items-center justify-between text-gray-42 text-base flex-wrap gap-2'>
                    <div className='flex items-center'>
                      <div className='flex items-center mr-6'>
                        <p className='mr-4'>Categories</p>
                        <Select
                          options={categoriesOptions}
                          selected={category}
                          onChange={setCategory}
                          selectClassName='w-113px'
                        />
                      </div>
                      <div className='flex items-center'>
                        <p className='mr-4'>Type</p>
                        <Select
                          options={categoriesOptions}
                          selected={type}
                          onChange={setType}
                          selectClassName='w-113px'
                        />
                      </div>
                    </div>
                    <div className='flex items-center mr-8'>
                      <p className='mr-4'>Sorty by</p>
                      <Select
                        options={categoriesOptions}
                        selected={sort}
                        onChange={setSort}
                        selectClassName='w-113px'
                      />
                    </div>
                  </div>
                  <div className='mt-10 grid grid-cols-3 sm:grid-cols-2 1200px:grid-cols-3  gap-9 text-gray-1a overflow-y-auto pr-33px h-608px'>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <NFTCard {...mockCardProps} key={i} />
                    ))}
                  </div>
                </div>
              )}
              {tab === 2 && (
                <div className='flex justify-between flex-col-reverse md:flex-row'>
                  <div className='w-full h-screen overflow-y-auto'>
                    <div className='pr-22px'>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <MemberCard
                          id={i}
                          active={i === activeIndex}
                          name='Glenn Greer'
                          key={i}
                          iconType='comment'
                          iconPosition='top'
                          behaviour='commented'
                          object='Collab.'
                          avatarSrc={avatar}
                          time='12h ago'
                          description='Love this so much! What tools do you use to create your 3d illustrations?'
                          productURL={image}
                          onClick={setActiveIndex}
                        />
                      ))}
                    </div>
                  </div>
                  <div className='w-[271px] md:pt-34px flex md:block'>
                    {filterData.map((item, index) => (
                      <div
                        key={index}
                        className='pl-33px md:pl-[106px] pb-14px'
                      >
                        <Checkbox isChecked={item.checked}>
                          {item.label}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberProfile
