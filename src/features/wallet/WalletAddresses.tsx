import React from 'react'
import cn from 'classnames'
import styles from './WalletScreen.module.css'
import AddressesTable from './AddressesTable'
import Toggle from 'common/components/Toggle'
import Tooltip from 'common/components/Tooltip'
import { ElectricityIcon, EliminationIcon } from 'common/components/Icons'
import { Button } from 'common/components/Buttons'
import { formatPrice } from 'common/utils/format'
import { useCurrencyName } from 'common/hooks/appInfo'
import { useWalletScreenContext } from './walletScreen.context'
import { useCreateNewAddress } from './walletScreen.hooks'

export default function WalletAddresses(): JSX.Element {
  const currencyName = useCurrencyName()
  const {
    tAddresses,
    zAddresses,
    tAddressAmounts,
    zAddressAmounts,
    allAddresses,
    activeTab,
    totalBalances,
    toggleHideEmptyAddresses,
    selectedAmount,
  } = useWalletScreenContext()

  const createNewAddress = useCreateNewAddress()

  return (
    <>
      {(allAddresses.isLoading || allAddresses.data?.length) && (
        <div className='bg-white pt-[30px] rounded-lg mt-[30px] min-w-594px'>
          <div
            className={cn(
              'overflow-y-auto mr-4 pr-4 overflow-x-hidden ml-9',
              styles.walletContent,
            )}
          >
            {activeTab !== 0 && (
              <AddressesTable
                addresses={activeTab === 1 ? tAddresses : zAddresses}
                amounts={activeTab === 1 ? tAddressAmounts : zAddressAmounts}
              />
            )}
            {activeTab == 0 && (
              <div>
                <AddressesTable
                  addresses={tAddresses}
                  amounts={tAddressAmounts}
                  extendHeader={
                    <div className='mb-2.5 ml-[30px] sticky top-0 text-gray-2d text-h5-medium'>
                      Transparent
                    </div>
                  }
                  extendHeaderClassName='h-6 top-[-1px]'
                  stickyTopClassName='top-[23px]'
                />
                <AddressesTable
                  addresses={zAddresses}
                  amounts={zAddressAmounts}
                  extendHeader={
                    <div className='mb-2.5 mt-7 ml-[30px] sticky top-0 text-gray-2d text-h5-medium'>
                      Shielded
                    </div>
                  }
                  extendHeaderClassName='h-6 top-[-30px]'
                  stickyTopClassName='top-[23px]'
                />
              </div>
            )}
          </div>

          <div className='border-t border-gray-e7 flex items-center h-72px justify-between pl-38px pr-30px'>
            <div className='flex items-center text-h6-leading-20'>
              <Toggle
                toggleHandler={toggleHideEmptyAddresses}
                selected={
                  totalBalances.data && totalBalances.data.total > 0
                    ? true
                    : false
                }
              >
                Hide empty addresses
                <div className='ml-2'>
                  <Tooltip
                    classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                    content='Hide empty addresses'
                    width={150}
                    type='top'
                  >
                    <EliminationIcon className='text-gray-8e' size={20} />
                  </Tooltip>
                </div>
              </Toggle>
            </div>
            <div className='flex items-center'>
              <div className='text-gray-71 text-h4'>Selected total:</div>
              <div className='ml-3 text-gray-2d text-h3-heavy'>
                {formatPrice(selectedAmount, currencyName)}
              </div>
            </div>
          </div>
        </div>
      )}

      {allAddresses.data?.length === 0 && (
        <div
          className={cn(
            'bg-white rounded-lg mt-3.5 flex items-center justify-center pb-10',
            styles.walletEmptyContent,
          )}
        >
          <div className='text-center'>
            <div className='mb-3 text-gray-4a text-h5'>
              You have no Addresses
            </div>
            <Button
              variant='secondary'
              className='w-[264px] px-0 mt-3'
              childrenClassName='w-full'
              onClick={createNewAddress}
            >
              <div className='flex items-center ml-[19px]'>
                <ElectricityIcon size={11} className='text-blue-3f py-3' />
                <div className='ml-11px text-blue-3f text-h5-medium'>
                  Generate a new {currencyName} Address
                </div>
              </div>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
