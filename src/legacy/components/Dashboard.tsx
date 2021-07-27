/* eslint-disable */

import React from 'react'
import cstyles from './Common.module.css'
import Utils from '../utils/utils'

export const BalanceBlockHighlight = ({
  pslValue,
  usdValue,
  currencyName,
}: any) => {
  const { bigPart, smallPart } = Utils.splitPslAmountIntoBigSmall(pslValue)
  return (
    <div
      style={{
        padding: '1em',
      }}
    >
      <div className={[cstyles.highlight, cstyles.xlarge].join(' ')}>
        <span>
          {currencyName} {bigPart}
        </span>
        <span className={[cstyles.small, cstyles.pslsmallpart].join(' ')}>
          {smallPart}
        </span>
      </div>
      <div className={[cstyles.sublight, cstyles.small].join(' ')}>
        {usdValue}
      </div>
    </div>
  )
}
