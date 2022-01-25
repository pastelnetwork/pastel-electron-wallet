import React, { ReactNode, useMemo, memo } from 'react'
import {
  EliminationIcon,
  ShieldedBalance,
  TotalBalance,
  TransparencyBalance,
} from 'common/components/Icons'
import Tooltip from 'common/components/Tooltip'
import cn from 'classnames'
import { useCurrencyName } from 'common/hooks/appInfo'
import { formatPrice } from 'common/utils/format'
import RectangleLoader from 'common/components/Loader'
import { useWalletScreenContext } from './walletScreen.context'
import { translate } from 'features/app/translations'

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

const BalanceCards = memo(function BalanceCards(): JSX.Element {
  const { activeTab, setActiveTab, totalBalances } = useWalletScreenContext()
  const currencyName = useCurrencyName()
  const loaderItem = (
    <div className='h-8 flex items-center'>
      <RectangleLoader
        className='h-3'
        width={80}
        height={12}
        colorClass='text-gray-dd'
      />
    </div>
  )

  const balanceCards = useMemo<TBalanceCard[]>(
    () => [
      {
        style: {
          type: 'total_balance',
          info: false,
        },
        psl: totalBalances.data?.total,
        activeIcon: <TotalBalance />,
        inactiveIcon: <TotalBalance variant='inactive' />,
        info: translate('totalBalance'),
      },
      {
        style: {
          type: 'transparent',
          info: false,
        },
        psl: totalBalances.data?.transparent,
        activeIcon: <TransparencyBalance />,
        inactiveIcon: <TransparencyBalance variant='inactive' />,
        info: translate('transparentInformation'),
      },
      {
        style: {
          type: 'shielded',
          info: false,
        },
        psl: totalBalances.data?.private,
        activeIcon: <ShieldedBalance />,
        inactiveIcon: <ShieldedBalance variant='inactive' />,
        info: translate('shieldedInformation'),
      },
    ],
    [totalBalances],
  )

  const renderBalanceTab = (
    index: number,
    card: TBalanceCard,
    isActive: boolean,
  ) => (
    <div className='pl-42px'>
      <div
        className={cn(
          'pt-9 text-h2-heavy',
          index === activeTab ? 'text-gray-2d' : 'text-gray-71',
        )}
      >
        {card.psl === undefined
          ? loaderItem
          : formatPrice(card.psl, currencyName, 2)}
      </div>
      {card.style.type === 'total_balance' ? (
        <div
          className={cn(
            'mt-2 text-h6-leading-20-medium',
            isActive ? 'text-gray-71' : 'text-gray-a0',
          )}
        >
          {translate('totalBalance')}
        </div>
      ) : card.style.type === 'transparent' ? (
        <div
          className={cn(
            'mt-2 text-h6-leading-20-medium',
            isActive ? 'text-gray-71' : 'text-gray-a0',
          )}
        >
          {translate('transparent')}
        </div>
      ) : (
        <div
          className={cn(
            'mt-2 text-h6-leading-20-medium',
            isActive ? 'text-gray-71' : 'text-gray-a0',
          )}
        >
          {translate('shielded')}
        </div>
      )}
    </div>
  )

  return (
    <div className='flex justify-between'>
      {balanceCards.map((card, index) => {
        const isActive = activeTab === index

        return (
          <div
            key={card.info}
            onClick={() => {
              setActiveTab(index)
            }}
            className={cn(
              'relative cursor-pointer w-1/3',
              index < balanceCards.length - 1 && 'mr-17px',
            )}
            role='button'
            aria-hidden
            tabIndex={0}
          >
            <div className='absolute top-15px right-15px'>
              {card.style.info ? (
                <Tooltip
                  classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                  content={card.info}
                  width={108}
                  type='top'
                >
                  <EliminationIcon
                    size={20}
                    className='text-gray-8e hover:rounded-full hover:bg-gray-f6 active:bg-gray-ec transition duration-300'
                  />
                </Tooltip>
              ) : null}
            </div>
            <div
              className={cn(
                'font-extrabold flex h-124px border-gray-e7 border rounded-lg',
                isActive && 'bg-white',
              )}
            >
              <div className='pl-4 md:pl-4 lg:pl-4 xl:pl-39px flex items-center'>
                {isActive ? card.activeIcon : card.inactiveIcon}
              </div>
              {renderBalanceTab(index, card, isActive)}
            </div>
          </div>
        )
      })}
    </div>
  )
})

export default BalanceCards
