import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import caretDown2Icon from '../../../common/assets/icons/ico-caret-down2.svg'
import caretUp2Icon from '../../../common/assets/icons/ico-caret-up2.svg'
import Checkbox from '../../../common/components/Checkbox/Checkbox'

export type TRow = {
  [index: string]: string | number
}

export type TColumn = {
  colClasses?: string
  name: string
  key: string
  align?: string
  custom?: (value: string | number, row?: TRow | undefined) => JSX.Element
}

export type TableProps = {
  columns: Array<TColumn>
  data: Array<TRow>
  haveHeader?: boolean
  headerTrClasses?: string
  bodyClasses?: string
  showCheckbox?: boolean
  selectedRow?: (index: number, row: TRow, selected: boolean) => void
}

const Table = ({
  columns,
  data,
  haveHeader = true,
  headerTrClasses = 'h-12 text-gray-4a  border-b border-gray-a0',
  bodyClasses = 'h-220px overflow-y-scroll',
  showCheckbox = false,
  selectedRow,
}: TableProps): JSX.Element => {
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
    <table className='w-full text-gray-71 relative'>
      {haveHeader && (
        <thead>
          <tr className={headerTrClasses}>
            {showCheckbox ? <td></td> : null}
            {columns.map((column, index) => (
              <td
                key={index}
                className={cx(
                  column.align ? 'text-' + column.align : 'text-left',
                  'sticky top-0 bg-white',
                )}
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
              </td>
            ))}
          </tr>
        </thead>
      )}
      <tbody className={bodyClasses}>
        {tableData.map((row: TRow, index: number) => (
          <tr key={index} className='h-67px'>
            {showCheckbox ? (
              <td>
                <Checkbox
                  isChecked={false}
                  clickHandler={selected => {
                    selectedRow && selectedRow(index, row, selected)
                  }}
                ></Checkbox>
              </td>
            ) : null}
            {columns.map((column, index) => (
              <td key={index}>
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
