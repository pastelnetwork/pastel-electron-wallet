import cx from 'classnames'
import React from 'react'

import { Arrow } from '../../common/components/Icons'
import { formatAbbreviatedNumber } from '../../common/utils/format'

export type TForumUpdatedNumberProps = {
  value: string | number
  oldValue: string | number
}

const ForumUpdatedNumber = ({
  value,
  oldValue,
}: TForumUpdatedNumberProps): JSX.Element => {
  const iconType = value > oldValue ? 'top' : 'bottom'
  return (
    <div
      className={cx(
        'flex text-gray-600',
        value > oldValue && 'text-green-300',
        value < oldValue && 'text-red-75',
      )}
    >
      {formatAbbreviatedNumber(+value, 1)}{' '}
      {value !== oldValue && <Arrow size={10} to={iconType} />}
    </div>
  )
}

export default ForumUpdatedNumber
