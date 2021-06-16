import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import caretDown2Icon from 'common/assets/icons/ico-caret-down2.svg'
import caretUp2Icon from 'common/assets/icons/ico-caret-up2.svg'
import styles from './Table.module.css'

export type TRow = {
  [index: string]: string | number | Array<number> | Array<string>
}

export type TCustomValue = string | number | Array<string> | Array<number>

export type TColumn = {
  name: string
  align?: string
  custom?(value: TCustomValue, row: TRow): JSX.Element
  className?: string
  tdClassName?: string
  thClassName?: string
}

export type TTable = {
  columns: Array<TColumn>
  data: Array<TRow>
  fixedHeader?: boolean
  className?: string
  bodyClassName?: string
  trClassName?: string
}

const Table = ({
  columns,
  data,
  fixedHeader,
  className,
  bodyClassName,
  trClassName,
}: TTable): JSX.Element => {
  const [sortIndex, setSortIndex] = useState(0)
  const [sortOrder, setSortOrder] = useState(0)
  const [tableData, setTableData] = useState(Array<TRow>())

  useEffect(() => {
    setTableData(data)
  }, [data])

  useEffect(() => {
    console.log(sortIndex, sortOrder)
    if (sortOrder == 0) {
      return
    }
    setTableData(
      data
        .map(each => each)
        .sort(
          (a, b) =>
            sortOrder *
            (a[columns[sortIndex].name] < b[columns[sortIndex].name] ? 1 : -1),
        ),
    )
  }, [sortIndex, sortOrder])

  const setSort = (index: number) => {
    if (index === sortIndex) {
      setSortOrder(((sortOrder + 2) % 3) - 1)
    } else {
      setSortIndex(index)
      setSortOrder(1)
    }
  }

  return (
    <div className={cn(className, 'overflow-y-auto')}>
      <table
        className={cn('w-full text-gray-71', fixedHeader && styles.fixedHeader)}
      >
        <thead>
          <tr className='h-12 text-gray-4a shadow-2px bg-white'>
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  column.className,
                  column.thClassName,
                  column.align ? 'text-' + column.align : 'text-left',
                )}
              >
                <div
                  className='flex items-center cursor-pointer select-none'
                  onClick={() => setSort(index)}
                >
                  {column.name}
                  <img
                    src={caretDown2Icon}
                    className={cn(
                      'ml-2',
                      sortOrder == 0 || sortIndex != index
                        ? 'invisible'
                        : (index != sortIndex || sortOrder != 1) && 'hidden',
                    )}
                  />
                  <img
                    src={caretUp2Icon}
                    className={cn(
                      'ml-2',
                      (index != sortIndex || sortOrder != -1) && 'hidden',
                    )}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn('overflow-y-auto', bodyClassName)}>
          {tableData.map((row: TRow, rowIndex: number) => (
            <tr key={rowIndex} className={cn('h-67px', trClassName)}>
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={cn(column.className, column.tdClassName)}
                >
                  {column.custom
                    ? column.custom(
                        row[column.name],
                        Object.assign({ id: rowIndex }, row),
                      )
                    : row[column.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
