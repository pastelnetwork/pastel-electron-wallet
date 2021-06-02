import React from 'react'
import svg_star from '../../common/assets/icons/star.svg'
import svg_star2 from '../../common/assets/icons/star2.svg'

const StarRate = (): JSX.Element => {
  return (
    <div className='flex'>
      <img src={svg_star} className='pr-1px' />
      <img src={svg_star} className='pr-1px' />
      <img src={svg_star} className='pr-1px' />
      <img src={svg_star} className='pr-1px' />
      <img src={svg_star2} className='mt-2px' />
    </div>
  )
}

export default StarRate
