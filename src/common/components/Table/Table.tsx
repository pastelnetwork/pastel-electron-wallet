import React, { useState } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox'
import pasteIcon from '../../assets/icons/ico-paste.svg'
import pencilIcon from '../../assets/icons/ico-pencil.svg'
import viewIcon from '../../assets/icons/ico-view.svg'
import Select from '../../components/Select/Select'
import cn from 'classnames'
import Tooltip from '../Tooltip'

export type TColumnDefinitionType<T, K extends keyof T> = {
  key: K
  header: string
  classnames?: string
}

type TableProps<T, K extends keyof T> = {
  data: Array<T>
  columns: Array<TColumnDefinitionType<T, K>>
  checkHandler: (param: number[]) => void
  clickedHandler?: (param: T) => void
}

const Table = <T, K extends keyof T>({
  data,
  columns,
  checkHandler,
  clickedHandler,
}: TableProps<T, K>): JSX.Element => {
  const [selected, setSelected] = useState<number[]>([])
  return (
    <table className='w-full mt-15px'>
      <tbody>
        {data.map((d, i) => (
          <tr
            key={i}
            className={cn(
              'pt-18px pb-19px ml-2 md:ml-3 lg:ml-6 xl:ml-38px pl-4 md:pl-31px pr-4 md:pr-31px flex border-b border-line-DEFAULT mr-4 justify-between',
              selected.includes(i) && 'bg-blue-f8',
            )}
          >
            <td className='flex items-center whitespace-nowrap w-5'>
              <Checkbox
                isChecked={selected.includes(i) ? true : false}
                clickHandler={() => {
                  if (selected.includes(i)) {
                    const ind = selected.indexOf(i)
                    if (ind > -1) {
                      selected.splice(ind, 1)
                    }
                  } else {
                    selected.push(i)
                  }
                  setSelected([...selected])
                  checkHandler(selected)
                }}
              ></Checkbox>
            </td>
            {columns.map((c, index) => {
              if (c.key === 'hash') {
                return (
                  <td
                    key={index + i}
                    className='flex items-center whitespace-nowrap ml-1 md:ml-3'
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
                    <Tooltip
                      classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                      content='View QR Code'
                      width={108}
                      type='top'
                    >
                      <img src={viewIcon} />
                    </Tooltip>
                  </td>
                )
              }
              if (c.key === 'psl') {
                const value = d[c.key]
                if (typeof value == 'number') {
                  return (
                    <td
                      className='flex items-center md:8 lg:ml-60px'
                      key={index + i}
                    >
                      <div>
                        <Select
                          className='text-gray-2d w-28'
                          autocomplete={true}
                          min={10000}
                          max={20000}
                          step={100}
                          value={value}
                          onChange={(value: number | null) => {
                            if (clickedHandler) {
                              d = { ...d, psl: value }
                              clickedHandler(d)
                            }
                          }}
                        />
                      </div>
                    </td>
                  )
                }
              }
              return (
                <td
                  key={index + i}
                  className='flex items-center whitespace-nowrap'
                >
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
