import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import caretDown2Icon from '../../../common/assets/icons/ico-caret-down2.svg'
import caretUp2Icon from '../../../common/assets/icons/ico-caret-up2.svg'

export type Row = {
  [index: string]: string | number
}

export type Column = {
  name: string
  align?: string
  custom?: (value: string | number, row?: Row) => JSX.Element
}

export type TableProps = {
  columns: Array<Column>
  data: Array<Row>
}

const Table = ({ columns, data }: TableProps): JSX.Element => {
  const [sortIndex, setSortIndex] = useState(0)
  const [sortOrder, setSortOrder] = useState(0)
  const [tableData, setTableData] = useState(Array<Row>())

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
            (a[columns[sortIndex].name] > b[columns[sortIndex].name] ? 1 : -1),
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
    <table className='w-full text-gray-71'>
      <tbody>
        <tr className='h-12 text-gray-4a  border-b border-gray-a0'>
          {columns.map((column, index) => (
            <th
              key={index}
              className={column.align ? 'text-' + column.align : 'text-left'}
            >
              <div
                className='flex items-center cursor-pointer select-none'
                onClick={() => setSort(index)}
              >
                {column.name}
                <img
                  src={caretDown2Icon}
                  className={cx(
                    'ml-2 mt-1',
                    sortOrder == 0 || sortIndex != index
                      ? 'invisible'
                      : (index != sortIndex || sortOrder != 1) && 'hidden',
                  )}
                />
                <img
                  src={caretUp2Icon}
                  className={cx(
                    'ml-2 mt-1',
                    (index != sortIndex || sortOrder != -1) && 'hidden',
                  )}
                />
              </div>
            </th>
          ))}
        </tr>
        {tableData.map((row: Row, index: number) => (
          <tr key={index} className='h-67px'>
            {columns.map((column, index) => (
              <td key={index}>
                {column.custom
                  ? column.custom(row[column.name], row)
                  : row[column.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
