import React from 'react'
import Rate from 'rc-rate'

const ProfileGeneral = (): JSX.Element => {
  return (
    <div className='psl-flex-grow psl-divide-y psl-divide-grey-400 psl-w-full xl:psl-w-1/2 xl:psl-pr-12 psl-px-4'>
      {/* First Row Group of General */}
      <div className='psl-w-full psl-py-10 psl-pt-4'>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-w-190px psl-text-sm psl-text-gray-71'>
            Location
          </div>
          <div className='psl-flex psl-flex-grow psl-text-gray-4a'>
            <div>New York, US</div>
            <div className='psl-mx-auto psl--mt-2'>#121</div>
          </div>
        </div>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-w-190px psl-text-sm psl-text-gray-71'>
            Language
          </div>
          <div className='psl-flex psl-flex-grow psl-text-gray-4a'>English</div>
        </div>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-w-190px psl-text-sm psl-text-gray-71'>
            Categories
          </div>
          <div className='psl-flex psl-flex-grow psl-text-gray-4a'>
            motion graphics, illustration, <br />
            abstract
          </div>
        </div>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-w-190px psl-text-sm psl-text-gray-71'>
            Buyer reputation
          </div>
          <div className='psl-flex psl-flex-grow psl-text-gray-4a psl-flex-col xl:psl-flex-row'>
            <Rate value={4.7} allowHalf={true} allowClear={false} />
            <div className='xl:psl-pl-2 text-gray-500'>4.89 reputation</div>
          </div>
        </div>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-w-190px psl-text-sm psl-text-gray-71'>
            Buyer bans
          </div>
          <div className='psl-text-blue-400'>3</div>
        </div>
      </div>
      {/* Second Row Group of General */}
      <div className='psl-w-full psl-py-10'>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-w-190px psl-text-sm psl-text-gray-71'>
            Highest fee recieved
          </div>
          <div className='psl-flex-grow psl-text-gray-4a'>136,200,000k PSL</div>
        </div>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-w-190px psl-text-sm psl-text-gray-71'>
            Total sales amount
          </div>
          <div className='psl-flex-grow psl-text-gray-4a'>560,600,00k PSL</div>
        </div>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-w-190px psl-text-sm psl-text-gray-71'>
            Total items sold
          </div>
          <div className='psl-flex-grow psl-text-gray-4a'>14</div>
        </div>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-w-190px psl-text-sm psl-text-gray-71'>
            Top category persentage
          </div>
          <div className='psl-flex-grow psl-text-gray-4a'>
            motion graphics 30%
          </div>
        </div>
      </div>
      {/* Third Row Group of General */}
      <div className='psl-w-full psl-py-10'>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-w-190px psl-text-sm psl-text-gray-71'>Bio</div>
        </div>
        <div className='psl-flex psl-pt-2'>
          <div className='psl-flex-grow psl-text-gray-4a'>
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
