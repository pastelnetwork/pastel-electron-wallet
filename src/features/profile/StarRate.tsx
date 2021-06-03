import React from 'react'
import svg_star from '../../common/assets/icons/star.svg'
import svg_star2 from '../../common/assets/icons/star2.svg'

type StarRateProps = {
  rate: number
}

const StarRate = (props: StarRateProps): JSX.Element => {
  const rate = props.rate
  const rateDigit = Math.floor(rate)
  const starImgs = []

  for (let i = 0; i < rateDigit; i++) {
    starImgs.push(<img src={svg_star} key={i} className='pr-1px' />)
  }
  if (rate > rateDigit) {
    starImgs.push(<img src={svg_star2} key={rateDigit} className='mt-2px' />)
  }

  return <div className='flex'>{starImgs}</div>
}

export default StarRate
