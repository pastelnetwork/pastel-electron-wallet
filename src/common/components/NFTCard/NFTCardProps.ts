export interface NFTCompactCardProps {
  imageSrc: string
  title: string
  likes: number
  className?: string
}

export interface NFTCardProps extends NFTCompactCardProps {
  author: string
  avatarSrc: string
  price: number | string
  onSale: boolean
}
