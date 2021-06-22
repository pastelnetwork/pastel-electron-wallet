import React, { useState } from 'react'
import Checkbox from 'common/components/Checkbox'
import cn from 'classnames'
import _ from 'lodash'

const ProfileCommentFilter = (): JSX.Element => {
  const data = {
    filters: [
      {
        name: 'Friends',
        isChecked: true,
      },
      {
        name: 'Followers',
        isChecked: true,
      },
      {
        name: 'Others',
        isChecked: false,
      },
    ],
  }
  const [filters, setFilters] = useState(data.filters)
  const [checkedAll, setCheckedAll] = useState<boolean>(false)

  const onClickCheckedAll = () => {
    setCheckedAll(!checkedAll)
    setFilters(filters.map(filter => ({ ...filter, isChecked: !checkedAll })))
  }

  const onClickFilter = (index: number) => {
    const newFilters = _.cloneDeep(filters)
    newFilters[index].isChecked = !filters[index].isChecked
    let isCheckedAll = true
    newFilters.forEach(filter => !filter.isChecked && (isCheckedAll = false))
    setFilters(newFilters)
    setCheckedAll(isCheckedAll)
  }

  return (
    <div className='flex flex-col w-270px space-y-4 pl-72px'>
      <div className='font-medium'>Filter by:</div>
      <div className='flex flex-col space-y-19px'>
        <Checkbox isChecked={checkedAll} clickHandler={onClickCheckedAll}>
          All
        </Checkbox>
        {filters.map((filter, index) => (
          <Checkbox
            key={index}
            isChecked={filter.isChecked}
            clickHandler={() => onClickFilter(index)}
          >
            <div
              className={cn(filter.isChecked ? 'font-medium' : '', 'text-sm')}
            >
              {filter.name}
            </div>
          </Checkbox>
        ))}
      </div>
    </div>
  )
}

export default ProfileCommentFilter
