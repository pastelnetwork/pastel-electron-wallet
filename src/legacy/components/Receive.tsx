/* eslint-disable */

import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Accordion } from 'react-accessible-accordion'
import styles from './Receive.module.css'
import cstyles from './Common.module.css'
import Utils from '../utils/utils'
import { AddressBalance } from './AppState'
import ScrollPane from './ScrollPane'
import PastelPaperWalletModal from '../../features/pastelPaperWalletGenerator'
import PastelAddressBlock from '../../features/pastelAddressBlock'

export default class Receive extends Component<any> {
  render() {
    const {
      addresses,
      addressesWithBalance,
      addressPrivateKeys,
      addressViewKeys,
      addressBook,
      info,
      receivePageState,
      fetchAndSetSinglePrivKey,
      fetchAndSetSingleViewKey,
      createNewAddress,
      rerenderKey,
      transactions,
    } = this.props // Convert the addressBalances into a map.

    const addressMap = addressesWithBalance.reduce((map: any, a: any) => {
      map[a.address] = a.balance
      return map
    }, {})
    const zaddrs = addresses
      .filter((a: any) => Utils.isSapling(a))
      .slice(0, 100)
      .map((a: any) => new AddressBalance(a, addressMap[a]))
    let defaultZaddr = zaddrs.length ? zaddrs[0].address : ''

    if (receivePageState && Utils.isSapling(receivePageState.newAddress)) {
      defaultZaddr = receivePageState.newAddress // move this address to the front, since the scrollbar will reset when we re-render

      zaddrs.sort((x: any, y: any) => {
        return x.address === defaultZaddr
          ? -1
          : y.address === defaultZaddr
          ? 1
          : 0
      })
    }

    const taddrs = addresses
      .filter((a: any) => Utils.isTransparent(a))
      .slice(0, 100)
      .map((a: any) => new AddressBalance(a, addressMap[a]))
    let defaultTaddr = taddrs.length ? taddrs[0].address : ''

    if (receivePageState && Utils.isTransparent(receivePageState.newAddress)) {
      defaultTaddr = receivePageState.newAddress // move this address to the front, since the scrollbar will reset when we re-render

      taddrs.sort((x: any, y: any) => {
        return x.address === defaultTaddr
          ? -1
          : y.address === defaultTaddr
          ? 1
          : 0
      })
    }

    const addressBookMap = addressBook.reduce((map: any, obj: any) => {
      map[obj.address] = obj.label
      return map
    }, {})
    return (
      <div>
        <div className={styles.receivecontainer}>
          <Tabs>
            <TabList>
              <Tab>Shielded</Tab>
              <Tab>Transparent</Tab>
            </TabList>

            <TabPanel key={`z${rerenderKey}`}>
              {/* Change the hardcoded height */}
              <ScrollPane offsetHeight={100}>
                <Accordion preExpanded={[defaultZaddr]}>
                  {zaddrs.map((a: any) => (
                    <PastelAddressBlock
                      key={a.address}
                      addressBalance={a}
                      currencyName={info.currencyName}
                      label={addressBookMap[a.address]}
                      pslPrice={info.pslPrice}
                      privateKey={addressPrivateKeys[a.address]}
                      viewKey={addressViewKeys[a.address]}
                      fetchAndSetSinglePrivKey={fetchAndSetSinglePrivKey}
                      fetchAndSetSingleViewKey={fetchAndSetSingleViewKey}
                      rerender={(this as any).rerender}
                    />
                  ))}
                </Accordion>

                <button
                  className={[
                    cstyles.primarybutton,
                    cstyles.margintoplarge,
                    cstyles.marginbottomlarge,
                  ].join(' ')}
                  onClick={() => createNewAddress(true)}
                  type='button'
                >
                  New Shielded Address
                </button>
              </ScrollPane>
            </TabPanel>

            <TabPanel key={`t${rerenderKey}`}>
              {/* Change the hardcoded height */}
              <ScrollPane offsetHeight={100}>
                <Accordion preExpanded={[defaultTaddr]}>
                  {taddrs.map((a: any) => (
                    <PastelAddressBlock
                      key={a.address}
                      addressBalance={a}
                      currencyName={info.currencyName}
                      pslPrice={info.pslPrice}
                      privateKey={addressPrivateKeys[a.address]}
                      viewKey={addressViewKeys[a.address]}
                      fetchAndSetSinglePrivKey={fetchAndSetSinglePrivKey}
                      fetchAndSetSingleViewKey={fetchAndSetSingleViewKey}
                      rerender={(this as any).rerender}
                      transactions={transactions}
                    />
                  ))}
                </Accordion>

                <button
                  className={[
                    cstyles.primarybutton,
                    cstyles.margintoplarge,
                    cstyles.marginbottomlarge,
                  ].join(' ')}
                  type='button'
                  onClick={() => createNewAddress(false)}
                >
                  New Transparent Address
                </button>
              </ScrollPane>
            </TabPanel>
          </Tabs>
        </div>
        <PastelPaperWalletModal />
      </div>
    )
  }
}
