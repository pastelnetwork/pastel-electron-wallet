import React from 'react'
import Rate from 'rc-rate'

const ProfileGeneral = (): JSX.Element => {
  return (
    <div className='flex-grow divide-y divide-grey-400 w-full xl:w-1/2 xl:pr-12 px-4'>
      {/* First Row Group of General */}
      <div className='w-full py-10 pt-4'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-4a'>Location</div>
          <div className='flex flex-grow text-gray-71'>
            <div>New York, US</div>
            <div className='mx-auto -mt-2'>#121</div>
          </div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-4a'>Language</div>
          <div className='flex flex-grow text-gray-71'>English</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-4a'>Categories</div>
          <div className='flex flex-grow text-gray-71'>
            motion graphics, illustration, <br />
            abstract
          </div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-4a'>Buyer reputation</div>
          <div className='flex flex-grow text-gray-71 flex-col xl:flex-row'>
            <Rate value={4.7} allowHalf={true} allowClear={false} />
            <div className='xl:pl-2 text-gray-500'>4.89 reputation</div>
          </div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-4a'>Buyer bans</div>
          <div className='text-blue-400'>3</div>
        </div>
      </div>
      {/* Second Row Group of General */}
      <div className='w-full py-10'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-4a'>
            Highest fee recieved
          </div>
          <div className='flex-grow text-gray-71'>136,200,000k PSL</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-4a'>Total sales amount</div>
          <div className='flex-grow text-gray-71'>560,600,00k PSL</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-4a'>Total items sold</div>
          <div className='flex-grow text-gray-71'>14</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-4a'>
            Top category persentage
          </div>
          <div className='flex-grow text-gray-71'>motion graphics 30%</div>
        </div>
      </div>
      {/* Third Row Group of General */}
      <div className='w-full py-10'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-4a'>Bio</div>
        </div>
        <div className='flex pt-2'>
          <div className='flex-grow text-gray-71'>
            I'am baby readymade mikshk tatooed actually activated charcoal
            godard listicle. Mumblecore cronut kickstarter, bushwick wolf copper
            mug woke chia put a bird on it viral gentrify keytar synth. Twee
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
