import React from 'react'

import pasteIcon from '../../assets/icons/ico-paste.svg'
import pencilIcon from '../../assets/icons/ico-pencil.svg'
import viewIcon from '../../assets/icons/ico-view.svg'

// import Checkbox from '../../components/Checkbox/Checkbox'

import AutoComplete from '../../components/AutoComplete/AutoComplete'

export type TableProps = {
  checkHandler?: (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    index: number,
  ) => void
  data: []
  columns: string[]
}

export default function Table({
  data,
}: // checkHandler,
// columns
TableProps): JSX.Element {
  return (
    <div>
      <table className='w-full'>
        <tbody>
          {data.map((data, index) => (
            <tr
              key={index}
              className='pt-18px pb-19px lg:ml-6 xl:ml-38px pl-31px pr-31px flex border-b border-line-DEFAULT mr-4 justify-between'
            >
              <td className='flex items-center whitespace-nowrap'>
                {/* <Checkbox
                  isChecked={data.checked}
                  clickHandler={e => {
                    checkHandler(e, index)
                  }}
                >
                  <span className='text-blue-3f'>{data.hash}</span>
                </Checkbox> */}
                <img className='ml-7' src={pasteIcon} />
                <img className='ml-25px' src={pencilIcon} />
              </td>
              <td className='flex items-center lg:ml-16 xl:ml-75px'>
                <img src={viewIcon} />
              </td>
              <td className='flex items-center whitespace-nowrap'>
                <span className='text-gray-a0 lg:ml-20 xl:ml-117px'>
                  {data.time}
                </span>
              </td>
              <td className='flex items-center whitespace-nowrap'>
                <span className='text-gray-a0 lg:ml-16 xl:ml-86px'>
                  viewing key
                </span>
              </td>
              <td className='flex items-center whitespace-nowrap'>
                <span className='text-gray-a0 lg:ml-11 xl:ml-59px'>
                  private key
                </span>
              </td>
              <td className='flex items-center md:ml-12 lg:ml-60px'>
                <div>
                  <AutoComplete
                    selected={'20000'}
                    startNumber={20000}
                    endNumber={24000}
                    diffNumber={2000}
                    onChange={value => console.log(value)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
