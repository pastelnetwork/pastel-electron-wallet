/* eslint-disable */

import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import QRCode from 'qrcode.react'
import { shell, clipboard } from 'electron'
import styles from './Receive.module.css'
import cstyles from './Common.module.css'
import Utils from '../utils/utils'
import { AddressBalance } from './AppState'
import ScrollPane from './ScrollPane'
import cx from 'classnames'

class AddressBlock extends React.Component<any, any> {
  state = {
    copiedAddr: false,
    copiedPrivKey: '',
  }
  copiedAddrTimerId = 0
  copiedPrivKeyTimerId = 0

  componentWillUnmount() {
    if (this.copiedAddrTimerId) {
      window.clearTimeout(this.copiedAddrTimerId)
    }
  }
  componentDidUpdate() {
    if (this.state.copiedPrivKey === 'loading' && this.props.privateKey) {
      clipboard.writeText(this.props.privateKey)
      this.setState({ copiedPrivKey: 'done' })
      this.copiedPrivKeyTimerId = window.setTimeout(() => {
        this.setState({ copiedPrivKey: '' })
        this.copiedPrivKeyTimerId = 0
      }, 3000)
    }
  }

  onCopyAddrBtnClick = (addr: string) => {
    if (this.state.copiedAddr || this.copiedAddrTimerId) {
      return
    }
    clipboard.writeText(addr)
    this.setState({ copiedAddr: true })
    this.copiedAddrTimerId = window.setTimeout(() => {
      this.setState({ copiedAddr: false })
      this.copiedAddrTimerId = 0
    }, 3000)
  }
  onCopyPrivKeyBtnClick = (addr: string) => {
    if (this.state.copiedPrivKey || this.copiedPrivKeyTimerId) {
      return
    }
    this.props.fetchAndSetSinglePrivKey(addr)
    this.setState({ copiedPrivKey: 'loading' })
  }

  openAddress = () => {
    const {
      currencyName,
      addressBalance: { address },
    } = this.props
    if (currencyName === 'LSP') {
      shell.openExternal(`https://chain.so/address/PSLTEST/${address}`)
    } else {
      shell.openExternal(`https://explorer.pastel.network/address/${address}`)
    }
  }

  render() {
    const {
      addressBalance,
      label,
      currencyName,
      pslPrice,
      viewKey,
      fetchAndSetSingleViewKey,
    } = this.props
    const { copiedAddr, copiedPrivKey } = this.state

    const { address } = addressBalance
    const balance = addressBalance.balance || 0

    return (
      <AccordionItem
        className={cx(cstyles.well, styles.receiveblock)}
        uuid={address}
      >
        <AccordionItemHeading>
          <AccordionItemButton className={cstyles.accordionHeader}>
            {address}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={cx(styles.receiveDetail)}>
          <div className={cx(cstyles.flexspacebetween)}>
            <div className={cx(cstyles.verticalflex, cstyles.marginleft)}>
              {label && (
                <div className={cstyles.margintoplarge}>
                  <div className={cx(cstyles.sublight)}>Label</div>
                  <div className={cx(cstyles.padtopsmall, cstyles.fixedfont)}>
                    {label}
                  </div>
                </div>
              )}

              <div className={cx(cstyles.sublight, cstyles.margintoplarge)}>
                Funds
              </div>
              <div className={cx(cstyles.padtopsmall)}>
                {currencyName} {balance}
              </div>
              <div className={cx(cstyles.padtopsmall)}>
                {Utils.getPslToUsdString(pslPrice, balance)}
              </div>

              <div className={cx(cstyles.margintoplarge, cstyles.breakword)}>
                {viewKey && (
                  <div>
                    <div className={cx(cstyles.sublight)}>Viewing Key</div>
                    <div
                      className={cx(
                        cstyles.breakword,
                        cstyles.padtopsmall,
                        cstyles.fixedfont,
                        styles.receiveMaxWidth,
                      )}
                    >
                      {viewKey}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  className={cx(cstyles.primarybutton, cstyles.margintoplarge)}
                  type='button'
                  onClick={() => this.onCopyAddrBtnClick(address)}
                >
                  {copiedAddr ? 'Copied!' : 'Copy Address'}
                </button>
                <button
                  className={cx(cstyles.primarybutton)}
                  type='button'
                  onClick={() => this.onCopyPrivKeyBtnClick(address)}
                >
                  {!copiedPrivKey
                    ? 'Copy Private Key'
                    : copiedPrivKey === 'loading'
                    ? 'Copying'
                    : 'Copied!'}
                </button>

                {Utils.isZaddr(address) && !viewKey && (
                  <button
                    className={cx(cstyles.primarybutton)}
                    type='button'
                    onClick={() => fetchAndSetSingleViewKey(address)}
                  >
                    Export Viewing Key
                  </button>
                )}

                {Utils.isTransparent(address) && (
                  <button
                    className={cx(cstyles.primarybutton)}
                    type='button'
                    onClick={this.openAddress}
                  >
                    View on explorer{' '}
                    <i className={cx('fas', 'fa-external-link-square-alt')} />
                  </button>
                )}
              </div>
            </div>
            <div>
              <QRCode value={address} className={cx(styles.receiveQrcode)} />
            </div>
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    )
  }
}

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
                    <AddressBlock
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
              {/* Change the hardcoded height */}
              <ScrollPane offsetHeight={100}>
                <Accordion preExpanded={[defaultTaddr]}>
                  {taddrs.map((a: any) => (
                    <AddressBlock
                      key={a.address}
                      addressBalance={a}
                      currencyName={info.currencyName}
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
        </div>
      </div>
    )
  }
}
