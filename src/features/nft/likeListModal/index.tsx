import React from 'react'
import cn from 'classnames'
// Components
import Modal from '../../../common/components/Modal'
import Scrollbar from '../../../common/components/Scrollbar'
// Assets
import CaretIcon from '../../../common/assets/icons/ico-caret.svg'
// Data
import likes from './data'
import Icon from '../../../common/components/Icon'

type dataType = {
  id: number
  date: string
  userName: string
  sold: number
  followers: number
}
type sortColumn = 'id' | 'date' | 'userName' | 'sold' | 'followers'
type sortOption = 'asc' | 'desc' | null

interface Title {
  title: string
  name: sortColumn
}

export interface LikesListModalProps {
  isOpen: boolean
  handleClose: React.MouseEventHandler<Element>
}

const titles: Array<Title> = [
  { title: 'Deal', name: 'date' },
  { title: 'Username', name: 'userName' },
  { title: 'Sold', name: 'sold' },
  { title: 'Followers', name: 'followers' },
]

const sortBy = (
  data: Array<dataType>,
  name: sortColumn,
  direction: sortOption,
) => {
  if (direction === 'desc') {
    return [...data].sort((a, b) => (a[name] > b[name] ? -1 : 1))
  } else if (direction === 'asc') {
    return [...data].sort((a, b) => (a[name] > b[name] ? 1 : -1))
  }
  return data
}

const LikesListModal: React.FC<LikesListModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const [sortName, setSortName] = React.useState<sortColumn>('date')
  const [direction, setDirection] = React.useState<sortOption>(null)

  const handleSort = (name: sortColumn) => {
    setDirection(dir => {
      if (!dir) {
        return 'desc'
      } else if (dir === 'desc') {
        return 'asc'
      } else {
        return null
      }
    })
    setSortName(name)
  }

  const caretIconClasses = cn({
    'transition-transform duration-300': true,
    'transform rotate-180': direction === 'asc',
  })

  const sortedLikes = sortBy(likes, sortName, direction)

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} size='4xl'>
      <h2 className='mb-6 text-gray-2d'>“Diamonds in the sky” likes</h2>
      <Scrollbar maxHeight='400'>
        <table
          className='border-separate w-full text-left whitespace-nowrap'
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr>
              {titles.map(({ name, title }, idx) => (
                <th
                  className='sticky top-0 px-5 pb-5 bg-white border-b border-gray-a6'
                  key={idx}
                >
                  <span
                    className='inline-flex items-center cursor-pointer select-none'
                    onClick={() => handleSort(name)}
                  >
                    <span className='font-heavy pr-2 text-gray-4a'>
                      {title}
                    </span>
                    {direction && name === sortName && (
                      <Icon
                        src={CaretIcon}
                        variant='center'
                        className={caretIconClasses}
                      />
                    )}
                  </span>
                </th>
              ))}
              <th className='sticky top-0 px-5 pb-5 bg-white border-b border-gray-a6'>
                <span className='font-heavy pr-2 cursor-default text-gray-4a'>
                  Action
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLikes.map(({ id, date, userName, sold, followers }) => (
              <tr className='border-b border-line-default' key={id}>
                <td className='py-5 px-5 text-gray-8e'>{date}</td>
                <td className='py-5 px-5 text-gray-a6'>{userName}</td>
                <td className='py-5 px-5 text-gray-4a'>{sold}mm PSL</td>
                <td className='py-5 px-5 text-gray-4a'>{followers}K</td>
                <td className='py-5 px-5 text-gray-4a cursor-pointer'>folow</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Scrollbar>
    </Modal>
  )
}

export default LikesListModal
