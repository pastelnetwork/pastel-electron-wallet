import React, { useState, ReactNode, useMemo, useCallback } from 'react'
import cx from 'classnames'
import { v4 as uuidv4 } from 'uuid'

import caretDown2Icon from '../../assets/icons/ico-caret-down2.svg'
import caretUp2Icon from '../../assets/icons/ico-caret-up2.svg'
import Checkbox from '../Checkbox/Checkbox'
import reactElementToJSXString from 'react-element-to-jsx-string'
import parse from 'html-react-parser'
import RectangleLoader from 'common/components/Loader'

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
  custom?: (value: any, row: TRow) => ReactNode
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
  searchKey?: string
  extendHeader?: ReactNode
  stickyTopClassName?: string
  extendHeaderClassName?: string
  isLoading?: boolean
}

function TableCheckBox({
  index,
  row,
  selectedRows,
  setSelectedRows,
  selectedRow,
}: {
  index: number
  row: TRow
  selectedRows: Array<number>
  setSelectedRows: (val: Array<number>) => void
  selectedRow?: (row: TRow) => void
}): JSX.Element {
  const handleOnCheckChange = useCallback(() => {
    const temp = selectedRows
    if (selectedRows.includes(index)) {
      for (let i = 0; i < selectedRows.length; i++) {
        if (index === temp[i]) {
          temp.splice(i, 1)
        }
      }
    } else {
      temp.push(index)
    }
    setSelectedRows([...temp])
    if (selectedRow) {
      selectedRow(row)
    }
  }, [])

  return <Checkbox isChecked={false} clickHandler={handleOnCheckChange} />
}

export default function Table({
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
  searchKey,
  extendHeader,
  stickyTopClassName = 'top-0',
  extendHeaderClassName,
  isLoading,
}: TTableProps): JSX.Element {
  const [sortIndex, setSortIndex] = useState<number>(0)
  const [sortOrder, setSortOrder] = useState<number>(0)
  const [selectedRows, setSelectedRows] = useState<Array<number>>([])
  const tableData = useMemo<TRow[]>(() => {
    if (sortOrder === 0) {
      return data
    }

    return data
      .map(each => each)
      .sort(
        (a, b) =>
          sortOrder *
          (a[columns[sortIndex].key] < b[columns[sortIndex].key] ? 1 : -1),
      )
  }, [data, sortIndex, sortOrder])

  const setSort = (index: number) => {
    if (index === sortIndex) {
      setSortOrder(((parseInt(sortOrder.toString(), 10) + 2) % 3) - 1)
    } else {
      setSortIndex(index)
      setSortOrder(1)
    }
  }

  const renderSearchKeyDiv = (param: string, text: ReactNode | string) => {
    return (
      <div>
        {parse(
          reactElementToJSXString(text).replace(
            new RegExp(param, 'gi'),
            match => {
              const vMatch: string = match || ''
              return `<mark class='bg-blue-9b py-1'>${vMatch}</mark>`
            },
          ),
        )}
      </div>
    )
  }

  return (
    <table className='w-full text-gray-71 relative table-auto'>
      {haveHeader && (
        <thead>
          {extendHeader ? (
            <tr>
              <td
                className={cx('sticky bg-white z-30', extendHeaderClassName)}
                colSpan={showCheckbox ? columns.length + 1 : columns.length}
              >
                {extendHeader}
              </td>
            </tr>
          ) : null}
          <tr className={headerTrClasses}>
            {showCheckbox ? (
              <td
                className={cx(
                  'sticky bg-white min-w-[51px] w-[51px]',
                  stickyTopClassName,
                )}
              />
            ) : null}
            {columns.map((column, index) => (
              <td
                key={`${column.key}${column.name}`}
                className={cx(
                  column.align ? 'text-' + column.align : 'text-left',
                  'sticky bg-white z-30',
                  column.colClasses,
                  headerTdClasses,
                  stickyTopClassName,
                )}
              >
                <div
                  className={cx(
                    'flex items-center cursor-pointer select-none',
                    column.headerColClasses,
                  )}
                  onClick={() => setSort(index)}
                  role='button'
                  aria-hidden
                  tabIndex={0}
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
                    alt='Caret'
                  />
                  <img
                    src={caretUp2Icon}
                    className={cx(
                      'ml-2',
                      (index != sortIndex || sortOrder != -1) && 'hidden',
                    )}
                    alt='Caret'
                  />
                </div>
              </td>
            ))}
          </tr>
        </thead>
      )}
      <tbody className={bodyClasses}>
        {isLoading ? (
          <tr className={bodyTrClasses}>
            {showCheckbox ? (
              <td className='pl-4 md:pl-30px w-5'>
                <RectangleLoader colorClass='text-gray-dd' />
              </td>
            ) : null}
            {columns.map(column => (
              <td
                key={column.key}
                className={cx(column.colClasses, bodyTdClasses)}
              >
                <RectangleLoader colorClass='text-gray-dd' />
              </td>
            ))}
          </tr>
        ) : null}
        {tableData.map((row: TRow, index: number) => (
          <tr
            key={uuidv4()}
            className={cx(
              bodyTrClasses,
              selectedRows.includes(index) && 'bg-blue-fa',
            )}
          >
            {showCheckbox ? (
              <td className='pl-4 md:pl-30px w-5'>
                <TableCheckBox
                  index={index}
                  row={row}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  selectedRow={selectedRow}
                />
              </td>
            ) : null}
            {columns.map(column => (
              <td
                key={`${column.key}-${column.name}`}
                className={cx(column.colClasses, bodyTdClasses)}
              >
                {column.custom
                  ? searchKey
                    ? renderSearchKeyDiv(
                        searchKey,
                        column.custom(row[column.key], row),
                      )
                    : column.custom(row[column.key], row)
                  : searchKey
                  ? renderSearchKeyDiv(searchKey, row[column.key])
                  : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

TableCheckBox.defaultProps = {
  selectedRow: undefined,
}
