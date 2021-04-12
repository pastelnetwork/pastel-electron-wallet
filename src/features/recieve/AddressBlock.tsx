import cx from 'classnames'
import { clipboard, shell } from 'electron'
import QRCode from 'qrcode.react'
import React, { Component } from 'react'
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import cstyles from '../../legacy/components/Common.module.css'
import Utils from '../../legacy/utils/utils'
import styles from './Receive.module.css'

export interface IAddressBlockProps {
  currencyName: string
  viewKey: string
  fetchAndSetSingleViewKey(add: string): void

  privateKey?: string
  hidePrivKey(): void
  fetchAndSetSinglePrivKey(add: string, type?: string): void

  addressBalance: {
    address: string
    balance: number
  }
  label?: string

  // deprecated, see Utils.getPslToUsdString
  pslPrice: number
}
export interface IAddressBlockState {
  copiedAddr: boolean
  copiedPrivKey: '' | 'loading' | 'done'
}

export class AddressBlock extends Component<
  IAddressBlockProps,
  IAddressBlockState
> {
  state = {
    copiedAddr: false,
    copiedPrivKey: '' as IAddressBlockState['copiedPrivKey'],
  }
  copiedAddrTimerId = 0
  copiedPrivKeyTimerId = 0

  componentWillUnmount(): void {
    if (this.copiedAddrTimerId) {
      window.clearTimeout(this.copiedAddrTimerId)
    }
    if (this.copiedPrivKeyTimerId) {
      window.clearTimeout(this.copiedPrivKeyTimerId)
    }
  }
  componentDidUpdate(): void {
    if (this.state.copiedPrivKey === 'loading' && this.props.privateKey) {
      clipboard.writeText(this.props.privateKey)
      this.setState({ copiedPrivKey: 'done' })
      this.props.hidePrivKey()
      this.copiedPrivKeyTimerId = window.setTimeout(() => {
        this.setState({ copiedPrivKey: '' })
        this.copiedPrivKeyTimerId = 0
      }, 3000)
    }
  }

  onCopyAddrBtnClick = (addr: string): void => {
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
  onCopyPrivKeyBtnClick = (addr: string): void => {
    if (this.state.copiedPrivKey || this.copiedPrivKeyTimerId) {
      return
    }
    this.props.fetchAndSetSinglePrivKey(addr)
    this.setState({ copiedPrivKey: 'loading' })
  }

  openAddress = (): void => {
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

  render(): JSX.Element {
    const {
      addressBalance,
      label,
      currencyName,
      pslPrice,
      fetchAndSetSinglePrivKey,
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

                <button
                  className={cx(cstyles.primarybutton, styles.buttonMarginTop)}
                  type='button'
                  onClick={() =>
                    fetchAndSetSinglePrivKey(address, 'generatePaperWallet')
                  }
                >
                  Generate paper wallet
                </button>
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
