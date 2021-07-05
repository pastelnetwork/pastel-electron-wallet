import { TMemberCard } from 'features/members/MemberCard'
import { TNFTCard } from '../../common/components/NFTCard'
import mockAvatar from '../../common/assets/images/avatar2-placeholder.png'
import nftImage from '../../common/assets/images/nft-card-placeholder.png'
import { TOption } from 'common/components/Select/Select'

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
  author: 'zndrson',
  avatarSrc: mockAvatar,
  imageSrc: nftImage,
  likes: 23,
  onSale: true,
  price: '222K',
  currencyName: 'PSL',
  title: 'Cosmic Perspective',
  liked: true,
  followers: 256,
  isLastBid: false,
}

export const mockNFTs: TNFTCard[] = Array.from({ length: 6 }).map((_, i) => {
  return {
    ...mockCardProps,
    onSale: i % 2 ? true : false,
    isLastBid: i % 3 ? true : false,
  }
})

export const mockTimeRanges: TOption[] = [
  { value: 'All', label: 'All' },
  { value: 'range1', label: 'range1' },
]
