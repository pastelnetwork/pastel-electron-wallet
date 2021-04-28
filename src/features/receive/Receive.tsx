import cx from 'classnames'
import React from 'react'
import { Accordion } from 'react-accessible-accordion'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import { AddressBalance } from '../../legacy/components/AppState'
import cstyles from '../../legacy/components/Common.module.css'
import ScrollPane from '../../legacy/components/ScrollPane'
import Utils from '../../legacy/utils/utils'
import PastelPaperWalletModal from '../pastelPaperWalletGenerator'
import { AddressBlock } from './AddressBlock'
import styles from './Receive.module.css'

export interface IAddressesWithBalance {
  address: string
  balance: number
}
export interface IAddressBook {
  address: string
  label: string
}
export interface IInfo {
  currencyName: string
  // deprecated, see Utils.getPslToUsdString
  pslPrice: number
}
export interface IReceiveProps {
  addresses: string[]
  addressesWithBalance: IAddressesWithBalance[]
  addressPrivateKeys: { [addr: string]: string }
  addressViewKeys: { [addr: string]: string }
  addressBook: IAddressBook[]
  info: IInfo
  receivePageState?: {
    newAddress: string
  }
  fetchAndSetSinglePrivKey(addr: string): void
  hidePrivKey(): void
  fetchAndSetSingleViewKey(addr: string): void
  createNewAddress(isZaddr: boolean): void
  rerenderKey: string
}

export const Receive = (props: IReceiveProps): JSX.Element => {
  const {
    addresses,
    addressesWithBalance,
    addressPrivateKeys,
    addressViewKeys,
    addressBook,
    info,
    receivePageState,
    fetchAndSetSinglePrivKey,
    hidePrivKey,
    fetchAndSetSingleViewKey,
    createNewAddress,
    rerenderKey,
  } = props

  const addressMap = addressesWithBalance.reduce((map, a) => {
    map[a.address] = a.balance
    return map
  }, {} as { [addr: string]: number })

  const zaddrs = addresses
    .filter(a => Utils.isSapling(a))
    .slice(0, 100)
    .map(a => new AddressBalance(a, addressMap[a]))

  let defaultZaddr = zaddrs.length ? zaddrs[0].address : ''
  if (receivePageState && Utils.isSapling(receivePageState.newAddress)) {
    // move this address to the front, since the scrollbar will reset when we re-render
    defaultZaddr = receivePageState.newAddress
    zaddrs.sort((x, y) => {
      return x.address === defaultZaddr
        ? -1
        : y.address === defaultZaddr
        ? 1
        : 0
    })
  }

  const taddrs = addresses
    .filter(a => Utils.isTransparent(a))
    .slice(0, 100)
    .map(a => new AddressBalance(a, addressMap[a]))

  let defaultTaddr = taddrs.length ? taddrs[0].address : ''
  if (receivePageState && Utils.isTransparent(receivePageState.newAddress)) {
    // move this address to the front, since the scrollbar will reset when we re-render
    defaultTaddr = receivePageState.newAddress
    taddrs.sort((x, y) => {
      return x.address === defaultTaddr
        ? -1
        : y.address === defaultTaddr
        ? 1
        : 0
    })
  }

  const addressBookMap = addressBook.reduce((map, obj) => {
    map[obj.address] = obj.label
    return map
  }, {} as { [addr: string]: string })

  return (
    <div className={styles.receivecontainer}>
      <Tabs>
        <TabList>
          <Tab>Shielded</Tab>
          <Tab>Transparent</Tab>
        </TabList>
        <TabPanel key={`z${rerenderKey}`}>
          <ScrollPane offsetHeight={100}>
            <Accordion preExpanded={[defaultZaddr]}>
              {zaddrs.map(a => (
                <AddressBlock
                  key={a.address}
                  addressBalance={a}
                  currencyName={info.currencyName}
                  label={addressBookMap[a.address]}
                  pslPrice={info.pslPrice}
                  privateKey={addressPrivateKeys[a.address]}
                  viewKey={addressViewKeys[a.address]}
                  fetchAndSetSinglePrivKey={fetchAndSetSinglePrivKey}
                  hidePrivKey={hidePrivKey}
                  fetchAndSetSingleViewKey={fetchAndSetSingleViewKey}
                />
              ))}
            </Accordion>
            <button
              className={cx(
                cstyles.primarybutton,
                cstyles.margintoplarge,
                cstyles.marginbottomlarge,
              )}
              onClick={() => createNewAddress(true)}
              type='button'
            >
              New Shielded Address
            </button>
          </ScrollPane>
        </TabPanel>
        <TabPanel key={`t${rerenderKey}`}>
          <ScrollPane offsetHeight={100}>
            <Accordion preExpanded={[defaultTaddr]}>
              {taddrs.map(a => (
                <AddressBlock
                  key={a.address}
                  addressBalance={a}
                  currencyName={info.currencyName}
                  pslPrice={info.pslPrice}
                  privateKey={addressPrivateKeys[a.address]}
                  viewKey={addressViewKeys[a.address]}
                  fetchAndSetSinglePrivKey={fetchAndSetSinglePrivKey}
                  hidePrivKey={hidePrivKey}
                  fetchAndSetSingleViewKey={fetchAndSetSingleViewKey}
                />
              ))}
            </Accordion>
            <button
              className={cx(
                cstyles.primarybutton,
                cstyles.margintoplarge,
                cstyles.marginbottomlarge,
              )}
              type='button'
              onClick={() => createNewAddress(false)}
            >
              New Transparent Address
            </button>
          </ScrollPane>
        </TabPanel>
      </Tabs>
      <PastelPaperWalletModal info={info} />
    </div>
  )
}
