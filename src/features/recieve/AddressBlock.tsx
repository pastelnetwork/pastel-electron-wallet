import cx from 'classnames'
import { clipboard, shell } from 'electron'
import QRCode from 'qrcode.react'
import React, { useEffect, useRef, useState } from 'react'
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

export const AddressBlock = (props: IAddressBlockProps): JSX.Element => {
  const copiedPrivKeyTimerId = useRef(0)
  useEffect(
    () => () => {
      if (copiedPrivKeyTimerId.current) {
        window.clearTimeout(copiedPrivKeyTimerId.current)
      }
    },
    [],
  )

  const [copiedPrivKey, setCopiedPrivKey] = useState<'' | 'loading' | 'done'>(
    '',
  )
  useEffect(() => {
    if (copiedPrivKey !== 'loading' || !props.privateKey) {
      return
    }
    clipboard.writeText(props.privateKey)
    setCopiedPrivKey('done')
    props.hidePrivKey()
    copiedPrivKeyTimerId.current = window.setTimeout(() => {
      setCopiedPrivKey('')
      copiedPrivKeyTimerId.current = 0
    }, 3000)
  }, [copiedPrivKey, props.privateKey])

  const onCopyPrivKeyBtnClick = (addr: string): void => {
    if (copiedPrivKey || copiedPrivKeyTimerId.current) {
      return
    }
    props.fetchAndSetSinglePrivKey(addr)
    setCopiedPrivKey('loading')
  }

  const copiedAddrTimerId = useRef(0)
  useEffect(
    () => () => {
      if (copiedAddrTimerId.current) {
        window.clearTimeout(copiedAddrTimerId.current)
      }
    },
    [],
  )

  const [copiedAddr, setCopiedAddr] = useState(false)

  const onCopyAddrBtnClick = (addr: string): void => {
    if (copiedAddr || copiedAddrTimerId.current) {
      return
    }
    clipboard.writeText(addr)
    setCopiedAddr(true)
    copiedAddrTimerId.current = window.setTimeout(() => {
      setCopiedAddr(false)
      copiedAddrTimerId.current = 0
    }, 3000)
  }

  const openAddress = (): void => {
    const {
      currencyName,
      addressBalance: { address },
    } = props
    if (currencyName === 'LSP') {
      shell.openExternal(`https://chain.so/address/PSLTEST/${address}`)
    } else {
      shell.openExternal(`https://explorer.pastel.network/address/${address}`)
    }
  }

  const {
    addressBalance,
    label,
    currencyName,
    pslPrice,
    fetchAndSetSinglePrivKey,
    viewKey,
    fetchAndSetSingleViewKey,
  } = props

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
                onClick={() => onCopyAddrBtnClick(address)}
              >
                {copiedAddr ? 'Copied!' : 'Copy Address'}
              </button>
              <button
                className={cx(cstyles.primarybutton)}
                type='button'
                onClick={() => onCopyPrivKeyBtnClick(address)}
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
                  onClick={openAddress}
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
