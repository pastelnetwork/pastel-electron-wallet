import React from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import pasteIcon from '../../assets/icons/ico-paste.svg'
import pencilIcon from '../../assets/icons/ico-pencil.svg'
import viewIcon from '../../assets/icons/ico-view.svg'
import AutoComplete from '../../components/AutoComplete/AutoComplete'

export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K
  header: string
  classnames?: string
}

type TableProps<T, K extends keyof T> = {
  data: Array<T>
  columns: Array<ColumnDefinitionType<T, K>>
  checkHandler: (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    index?: string,
  ) => void
}

const Table = <T, K extends keyof T>({
  data,
  columns,
  checkHandler,
}: TableProps<T, K>): JSX.Element => {
  return (
    <table className='w-full'>
      <tbody>
        {data.map((d, i) => (
          <tr
            key={i}
            className='pt-18px pb-19px lg:ml-6 xl:ml-38px pl-31px pr-31px flex border-b border-line-DEFAULT mr-4 justify-between'
          >
            <td className='flex items-center whitespace-nowrap w-5'>
              <Checkbox
                isChecked={true}
                clickHandler={e => {
                  checkHandler(e)
                }}
              ></Checkbox>
            </td>
            {columns.map((c, index) => {
              if (c.key === 'hash') {
                return (
                  <td
                    key={index + i}
                    className='flex items-center whitespace-nowrap'
                  >
                    <span className='text-blue-3f'>{d[c.key]}</span>
                    <img className='ml-7' src={pasteIcon} />
                    <img className='ml-25px' src={pencilIcon} />
                  </td>
                )
              }
              if (c.key === 'qr_code') {
                return (
                  <td
                    key={index + i}
                    className='flex items-center lg:ml-16 xl:ml-75px'
                  >
                    <img src={viewIcon} />
                  </td>
                )
              }
              if (c.key === 'psl') {
                return (
                  <td
                    className='flex items-center md:8 lg:ml-60px'
                    key={index + i}
                  >
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
                )
              }
              return (
                <td className='flex items-center whitespace-nowrap'>
                  <span className={c.classnames}>{d[c.key]}</span>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
