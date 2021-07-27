import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import caretDown2Icon from '../../assets/icons/ico-caret-down2.svg'
import caretUp2Icon from '../../assets/icons/ico-caret-up2.svg'
import Checkbox from '../Checkbox/Checkbox'

export type TRow = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}

export type TColumn = {
  colClasses?: string
  headerColClasses?: string
  name: string
  key: string
  align?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom?: (value: any, row?: TRow | undefined) => JSX.Element
}

export type TTableProps = {
  columns: Array<TColumn>
  data: Array<TRow>
  haveHeader?: boolean
  headerTdClasses?: string
  headerTrClasses?: string
  bodyTrClasses?: string
  bodyTdClasses?: string
  bodyClasses?: string
  showCheckbox?: boolean
  selectedRow?: (row: TRow) => void
}

const Table = ({
  columns,
  data,
  haveHeader = true,
  headerTrClasses = 'h-12 text-gray-4a  border-b border-gray-a0',
  bodyTrClasses = 'h-67px',
  headerTdClasses,
  bodyTdClasses,
  bodyClasses = 'h-220px overflow-y-scroll',
  showCheckbox = false,
  selectedRow,
}: TTableProps): JSX.Element => {
  const [sortIndex, setSortIndex] = useState(0)
  const [sortOrder, setSortOrder] = useState(0)
  const [tableData, setTableData] = useState(Array<TRow>())
  const [selectedRows, setSelectedRows] = useState<Array<number>>([])

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
            (a[columns[sortIndex].key] < b[columns[sortIndex].key] ? 1 : -1),
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
    <table className='w-full text-gray-71 relative table-auto'>
      {haveHeader && (
        <thead>
          <tr className={headerTrClasses}>
            {showCheckbox ? <td className='sticky top-0 bg-white'></td> : null}
            {columns.map((column, index) => (
              <td
                key={index}
                className={cx(
                  column.align ? 'text-' + column.align : 'text-left',
                  'sticky top-0 bg-white',
                  column.colClasses,
                  'sticky top-0 bg-white',
                  headerTdClasses,
                )}
              >
                <div
                  className={cx(
                    'flex items-center cursor-pointer select-none',
                    column.headerColClasses,
                  )}
                  onClick={() => setSort(index)}
                >
                  {column.name}
                  <img
                    src={caretDown2Icon}
                    className={cx(
                      'ml-2 mt-px',
                      sortOrder == 0 || sortIndex != index
                        ? 'invisible'
                        : (index != sortIndex || sortOrder != 1) && 'hidden',
                    )}
                  />
                  <img
                    src={caretUp2Icon}
                    className={cx(
                      'ml-2',
                      (index != sortIndex || sortOrder != -1) && 'hidden',
                    )}
                  />
                </div>
              </td>
            ))}
          </tr>
        </thead>
      )}
      <tbody className={bodyClasses}>
        {tableData.map((row: TRow, index: number) => (
          <tr
            key={index}
            className={cx(
              bodyTrClasses,
              selectedRows.includes(index) && 'bg-blue-00 bg-opacity-2.61',
            )}
          >
            {showCheckbox ? (
              <td className='pl-4 md:pl-30px w-5'>
                <Checkbox
                  isChecked={false}
                  clickHandler={() => {
                    const temp = selectedRows
                    if (selectedRows.includes(index)) {
                      for (let i = 0; i < temp.length; i++) {
                        index === temp[i] && temp.splice(i, 1)
                      }
                    } else {
                      temp.push(index)
                    }
                    setSelectedRows([...temp])
                    selectedRow && selectedRow(row)
                  }}
                ></Checkbox>
              </td>
            ) : null}
            {columns.map((column, index) => (
              <td key={index} className={cx(column.colClasses, bodyTdClasses)}>
                {column.custom
                  ? column.custom(row[column.key], row)
                  : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
