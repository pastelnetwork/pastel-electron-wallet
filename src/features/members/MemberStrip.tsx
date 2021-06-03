import React from 'react'
import MemberCard, { TMemberCard } from './MemberCard'

export type TMemberStripProps = {
  id: string
  memberCard: TMemberCard
  heighestSold: number | string
  totalSell: number | string
  images: string[]
  currencyName: string
}

const MemberStrip: React.FC<TMemberStripProps> = ({
  id,
  memberCard,
  heighestSold,
  images,
  totalSell,
  currencyName,
}) => {
  return (
    <div className='flex space-x-30px'>
      {/* Member Card */}
      <div className='w-4/12 md:w-244px h-142px'>
        <MemberCard {...memberCard} />
      </div>
      <div className='w-8/12 md:flex-grow border-b border-navigation-background'>
        <div className='flex space-x-4 h-full'>
          {/* Sale data */}
          <div className='flex flex-col justify-center h-full'>
            <h6 className='text-gray-77 pb-1 text-12'>Highest sold</h6>
            <div className='w-max text-12 font-semibold border py-1 px-2 rounded-4px border-success-pressed text-success-pressed'>
              {heighestSold} {currencyName}
            </div>
            <div className='text-gray-1a font-semibold pt-3 text-12 whitespace-nowrap w-120px overflow-x-hidden'>
              Total sell{' '}
              <div className='font-display'>
                <span className='text-gradient'>{totalSell}</span>
                <span className='text-gradient'> {currencyName}</span>
              </div>
            </div>
          </div>
          {/* Images */}
          <div
            className='flex space-x-5 overflow-x-auto overflow-y-hidden scrollbar-bg-white'
            style={{ height: 'calc(100% + 6px)' }}
          >
            {images.map((imgSrc, i) => (
              <div
                className='flex flex-col justify-center h-full '
                key={`${id}${i}`}
              >
                <div className='w-28 h-101px'>
                  <img src={imgSrc} className='object-cover rounded-xl' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// const MemberCard: React.FC<TMemberCard> = props => {
//   return (
//     <div className='px-5 py-7 bg-background-main rounded-2xl overflow-visible h-142px'>
//       <div className='flex space-x-4 relative'>
//         <img src={props.avatar} className='w-88px h-88px' />
//         {props.isVerified && (
//           <img
//             src={verifiedIcon}
//             className='w-6 h-6 absolute top-63px left-12'
//           />
//         )}
//         <div className='flex flex-col justify-between w-111px'>
//           <h5 className='text-gray-1a font-semibold whitespace-nowrap truncate'>
//             {props.name}
//           </h5>
//           <h6 className='text-gray-a0 text-12 pb-3'>
//             {props.followers} followers
//           </h6>

//           <button className='rounded-3xl border-blue-450 text-blue-450 border py-3px px-3 w-max font-medium'>
//             Follow
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

export default MemberStrip
