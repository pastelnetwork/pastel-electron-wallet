import { TMemberCard } from 'features/members/MemberCard'
import { TNFTCard } from '../../common/components/NFTCard'
import mockAvatar from '../../common/assets/images/avatar2-placeholder.png'
import nftImage from '../../common/assets/images/nft-card-placeholder.png'
import { TOption } from 'common/components/Select/Select'
import { v4 as uuidv4 } from 'uuid'
import { TMemberStripProps } from '../members/MemberStrip'
import mockMemberImage from 'common/assets/images/member-image-placeholder.png'

export const categoriesData = [
  { value: 'ALL', label: 'ALL' },
  { value: 'AI', label: 'AI' },
]
export const typesData = [
  { value: 'ALL', label: 'ALL' },
  { value: 'Auctions', label: 'Auctions' },
]
export const timesData = [
  { value: 'ALL', label: 'ALL' },
  { value: 'Future', label: 'Future' },
]
export const rarenessesData = [
  { value: 'ALL', label: 'ALL' },
  { value: 'High', label: 'High' },
]

export const rankingData = [{ value: 'Ranking', label: 'Ranking' }]

export const soldData = [{ value: 'Sold', label: 'Sold' }]

export const followersData = [{ value: 'Followers', label: 'Followers' }]

export const mockMembers: TMemberCard[] = [
  {
    avatar: mockAvatar,
    followers: 161,
    name: 'Sally Fadel',
    isVerified: false,
    followedByUser: false,
  },
  {
    avatar: mockAvatar,
    followers: 326,
    name: 'Anyia Harber',
    isVerified: true,
    followedByUser: true,
  },
  {
    avatar: mockAvatar,
    followers: 124,
    name: 'Edwardo Bearnulioli',
    isVerified: false,
    followedByUser: false,
  },
  {
    avatar: mockAvatar,
    followers: 588,
    name: 'Reymundo',
    isVerified: true,
    followedByUser: true,
  },
  {
    avatar: mockAvatar,
    followers: 208,
    name: 'Emilio Canzoni',
    isVerified: true,
    followedByUser: false,
  },
  {
    avatar: mockAvatar,
    followers: 443,
    name: 'Romario Alabente',
    isVerified: true,
    followedByUser: false,
  },
  {
    avatar: mockAvatar,
    followers: 502,
    name: 'Petro Doroshenko',
    isVerified: true,
    followedByUser: true,
  },
  {
    avatar: mockAvatar,
    followers: 588,
    name: 'Reymundo',
    isVerified: true,
    followedByUser: true,
  },
  {
    avatar: mockAvatar,
    followers: 208,
    name: 'Emilio Canzoni',
    isVerified: true,
    followedByUser: false,
  },
  {
    avatar: mockAvatar,
    followers: 443,
    name: 'Romario Alabente',
    isVerified: true,
    followedByUser: false,
  },
  {
    avatar: mockAvatar,
    followers: 502,
    name: 'Petro Doroshenko',
    isVerified: true,
    followedByUser: true,
  },
]

const mockCardProps: TNFTCard = {
  author: 'zndrson_longname',
  avatarSrc: mockAvatar,
  imageSrc: nftImage,
  likes: 23,
  onSale: true,
  price: '222K',
  currencyName: 'PSL',
  title: 'Cosmic Perspective',
  liked: true,
  followers: 0,
  isLastBid: false,
}

export const mockNFTs: TNFTCard[] = Array.from({ length: 6 }).map((_, i) => {
  return {
    ...mockCardProps,
    author: ['zndrson_longname', 'zndrson_bansname'][
      Math.floor(Math.random() * 2)
    ],
    title: [
      'Cosmic Perspective Bansky...',
      'Cosmic Perspective Longna...',
      'Cosmic Bansay Longna...',
      'Bans Perspective Longna...',
    ][Math.floor(Math.random() * 4)],
    onSale: i % 2 ? true : false,
    isLastBid: i % 3 ? true : false,
  }
})

export const mockTimeRanges: TOption[] = [
  { value: 'All', label: 'All' },
  { value: 'range1', label: 'range1' },
]

const stripMockImages = Array.from({ length: 10 }).map(() => mockMemberImage)

export const mockMemberStrips: TMemberStripProps[] = [
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 161,
      name: 'Bansky82',
      isVerified: false,
      followedByUser: false,
    },
    heighestSold: '1,700,000K',
    totalSold: '1,500K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 326,
      name: 'theRealBansky',
      isVerified: true,
      followedByUser: true,
    },
    heighestSold: '1,700,000K',
    totalSold: '1,500K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 124,
      name: 'Banskyyyy',
      isVerified: false,
      followedByUser: false,
    },
    heighestSold: '1,700,000K',
    totalSold: '1,500K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 588,
      name: 'IheartBansy',
      isVerified: true,
      followedByUser: true,
    },
    heighestSold: '1,700,000K',
    totalSold: '1,500K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
]
