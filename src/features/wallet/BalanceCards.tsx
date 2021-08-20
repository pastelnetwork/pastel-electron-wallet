import React, { ReactNode, useMemo } from 'react'
import {
  EliminationIcon,
  ShieldedBalance,
  TotalBalance,
  TransparencyBalance,
} from '../../common/components/Icons'
import { TTotalBalance } from '../../types/rpc'
import Tooltip from '../../common/components/Tooltip'
import cn from 'classnames'
import { useCurrencyName } from '../../common/hooks/appInfo'
import { formatPrice } from '../../common/utils/format'
import Spinner from '../../common/components/Spinner'

type TBalanceCard = {
  style: {
    type: string
    info: boolean
  }
  psl?: number
  activeIcon: ReactNode
  inactiveIcon: ReactNode
  info: string
}

export default function BalanceCards({
  totalBalances,
  activeTab,
  setActiveTab,
}: {
  totalBalances?: TTotalBalance
  activeTab: number
  setActiveTab(tab: number): void
}): JSX.Element {
  const currencyName = useCurrencyName()

  const balanceCards = useMemo<TBalanceCard[]>(
    () => [
      {
        style: {
          type: 'total_balance',
          info: false,
        },
        psl: totalBalances?.total,
        activeIcon: <TotalBalance />,
        inactiveIcon: <TotalBalance variant='inactive' />,
        info: 'Total Balance',
      },
      {
        style: {
          type: 'transparent',
          info: false,
        },
        psl: totalBalances?.transparent,
        activeIcon: <TransparencyBalance />,
        inactiveIcon: <TransparencyBalance variant='inactive' />,
        info: 'Transparent Information',
      },
      {
        style: {
          type: 'shielded',
          info: false,
        },
        psl: totalBalances?.private,
        activeIcon: <ShieldedBalance />,
        inactiveIcon: <ShieldedBalance variant='inactive' />,
        info: 'Shielded Information',
      },
    ],
    [totalBalances],
  )

  return (
    <div className='flex justify-between'>
      {balanceCards.map((card, index) => {
        const isActive = activeTab === index

        return (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className='relative cursor-pointer'
          >
            <div className='absolute top-15px right-15px'>
              {card.style.info ? (
                <Tooltip
                  classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                  content={card.info}
                  width={108}
                  type='top'
                >
                  <EliminationIcon size={20} className='text-gray-8e' />
                </Tooltip>
              ) : null}
            </div>
            <div
              className={cn(
                'font-extrabold flex sm:w-64 md:w-72 lg:w-335px xl:w-427px h-124px border-gray-e7 border rounded-lg',
                isActive && 'bg-white',
              )}
            >
              <div className='pl-4 md:pl-4 lg:pl-4 xl:pl-39px flex items-center'>
                {isActive ? card.activeIcon : card.inactiveIcon}
              </div>
              <div className='pt-36px pl-2 md:pl-3 lg:pl-[43px]'>
                <div
                  className={cn(
                    'sm:text-xl md:text-2xl leading-6 pt-9',
                    index === activeTab ? 'text-gray-2d' : 'text-gray-71',
                  )}
                >
                  {card.psl === undefined ? (
                    <Spinner className='w-6 h-6 mb-3' />
                  ) : (
                    formatPrice(card.psl, currencyName)
                  )}
                </div>
                {card.style.type === 'total_balance' ? (
                  <div
                    className={cn(
                      'font-medium text-sm mt-2',
                      isActive ? 'text-gray-71' : 'text-gray-a0',
                    )}
                  >
                    Total balance
                  </div>
                ) : card.style.type === 'transparent' ? (
                  <div
                    className={cn(
                      'font-medium text-sm mt-2',
                      isActive ? 'text-gray-71' : 'text-gray-a0',
                    )}
                  >
                    Transparent
                  </div>
                ) : (
                  <div
                    className={cn(
                      'font-medium text-sm mt-2',
                      isActive ? 'text-gray-71' : 'text-gray-a0',
                    )}
                  >
                    Shielded
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
