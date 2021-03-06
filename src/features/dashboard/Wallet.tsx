import React, { useMemo } from 'react'
import { formatPrice } from '../../common/utils/format'
import TransactionItem, { TTransactionItemProps } from './TransactionItem'
import LinkSection from './LinkSection'
import * as ROUTES from '../../common/utils/constants/routes'
import { useTAndZTransactions, useTotalBalance } from '../../api/pastel-rpc'
import { useCurrencyName } from '../../common/hooks/appInfo'
import { TTransactionType } from '../../types/rpc'
import dayjs from 'dayjs'
import ContentLoader from 'react-content-loader'
import RectangleLoader from '../../common/components/Loader'
import { translate } from 'features/app/translations'

type TTransactionsProps = TTransactionItemProps & { id: string }

export default function Wallet(): JSX.Element {
  const currencyName = useCurrencyName()

  const { data: balance, isLoading: isBalanceLoading } = useTotalBalance()

  const {
    data: transactionsRaw,
    isLoading: isTransactionsLoading,
  } = useTAndZTransactions()

  const transactions = useMemo<TTransactionsProps[]>(
    () =>
      transactionsRaw?.map((transaction, idx) => {
        const txid: string = transaction.txid || ''
        const strIndex: string = idx.toString()
        return {
          type: (transaction.type as TTransactionType) || TTransactionType.ALL,
          amount: transaction.amount || 0,
          date: dayjs.unix(transaction.time).format('DD/MM/YY'),
          id: `${txid}-${strIndex}`,
        }
      }) || [],
    [transactionsRaw],
  )

  const renderLoading = () => (
    <div className='p-3 pr-5 mb-3'>
      <ContentLoader className='h-[50px]'>
        <rect x='36' y='8' rx='4' ry='4' width='88' height='8' />
        <rect x='36' y='32' rx='4' ry='4' width='52' height='8' />
        <rect x='120' y='32' rx='4' ry='4' width='100' height='8' />
        <circle cx='12' cy='12' r='12' />
      </ContentLoader>
    </div>
  )

  const renderTransactionsLoading = () => {
    if (!isTransactionsLoading) {
      return null
    }

    return (
      <>
        {renderLoading()}
        {renderLoading()}
        {renderLoading()}
      </>
    )
  }

  return (
    <div className='paper pt-6 pb-5 w-335px flex flex-col relative h-[388px]'>
      <div className='flex items-center justify-between h-6 mb-4 flex-shrink-0 px-8'>
        <div className='font-extrabold text-gray-2d text-lg'>
          {translate('walletBalance')}
        </div>
        {!isBalanceLoading && balance && (
          <div className='font-extrabold text-gray-2d text-sm'>
            {formatPrice(balance.total, currencyName, 2)}
          </div>
        )}
        {isBalanceLoading && <RectangleLoader colorClass='text-gray-dd' />}
      </div>
      <div className='pl-[30px] pr-4 mr-14px overflow-auto h-[252px]'>
        {renderTransactionsLoading()}
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
        {!isTransactionsLoading && transactions.length === 0 && (
          <div className='flex justify-center mt-[111px]'>
            <span className='text-base text-gray-a0'>
              {translate('youHaveNoPSL', currencyName)}
            </span>
          </div>
        )}
      </div>
      <LinkSection to={ROUTES.WALLET} absolute gradient>
        {translate('walletDetails')}
      </LinkSection>
    </div>
  )
}
