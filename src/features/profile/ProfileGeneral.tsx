import React from 'react'
import StarRate from '../../common/components/Profile/StarRate'

const ProfileGeneral = (): JSX.Element => {
  return (
    <div className='flex-grow divide-y divide-grey-400 w-full xl:w-3/5 xl:pr-14'>
      {/* First Row Group of General */}
      <div className='w-full py-10 pt-4'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Location</div>
          <div className='flex flex-grow text-gray-4a'>
            <div>New York, US</div>
            <div className='mx-auto -mt-1'>#121</div>
          </div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Language</div>
          <div className='flex flex-grow text-gray-4a'>English</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Categories</div>
          <div className='flex flex-grow text-gray-4a'>
            motion graphics, illustration, <br />
            abstract
          </div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Buyer reputation</div>
          <div className='flex flex-grow text-gray-4a flex-wrap'>
            <StarRate />
            <div className='pl-6px text-gray-500'>4.89 reputation</div>
          </div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Buyer bans</div>
          <div className='text-blue-400'>3</div>
        </div>
      </div>
      {/* Second Row Group of General */}
      <div className='w-full py-10'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>
            Highest fee recieved
          </div>
          <div className='flex-grow text-gray-4a'>136,200,000k PSL (#632)</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Total sales amount</div>
          <div className='flex-grow text-gray-4a'>560,600,00k PSL (#211)</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Total items sold</div>
          <div className='flex-grow text-gray-4a'>14</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>
            Top category persentage
          </div>
          <div className='flex-grow text-gray-4a'>motion graphics 30%</div>
        </div>
      </div>
      {/* Third Row Group of General */}
      <div className='w-full py-10'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Bio</div>
        </div>
        <div className='flex pt-2'>
          <div className='flex-grow text-gray-4a'>
            I’m baby readymade mikshk tatooed actually activated charcoal godard
            listicle. Mumblecore cronut kickstarter, bushwick wolf copper mug
            woke chia put a bird on it viral gentrify keytar synth. Twee
            chartreuse etsy, +1 dreamcatcher lumbersexual before they sold out
            drinking vinegar pinterest mumblecore tousled occupy brunch whatever
            ugh.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileGeneral
