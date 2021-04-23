import dateformat from 'dateformat'
import { clipboard, shell } from 'electron'
import QRCode from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import Utils from '../../legacy/utils/utils'
import styles from './PastelAddressBlock.module.css'

type AddressBalanceProps = {
  address: string
  balance: number
}

type TransactionsProps = {
  address: string
  time: number
  type: string
  inputAddresses?: string[]
}

type PastelAddressBlockProps = {
  addressBalance: AddressBalanceProps
  label?: string
  currencyName: string
  pslPrice: number
  privateKey: string
  fetchAndSetSinglePrivKey: (address: string, type?: string) => void
  viewKey: string
  fetchAndSetSingleViewKey: (address: string) => void
  rerender: any
  transactions?: [TransactionsProps]
}

export default function PastelAddressBlock({
  addressBalance,
  label,
  currencyName,
  pslPrice,
  privateKey,
  fetchAndSetSinglePrivKey,
  viewKey,
  fetchAndSetSingleViewKey,
  transactions,
}: PastelAddressBlockProps): JSX.Element {
  const { address } = addressBalance
  const [copied, setCopied] = useState(false)
  const [timerID, setTimerID] = useState(null)
  useEffect(() => {
    return () => {
      if (timerID) {
        clearTimeout(timerID as any)
      }
    }
  })
  const balance = addressBalance.balance || 0

  const openAddress = () => {
    if (currencyName === 'LSP') {
      shell.openExternal(`https://chain.so/address/PSLTEST/${address}`)
    } else {
      shell.openExternal(`https://explorer.pastel.network/address/${address}`)
    }
  }

  const getDifferenceDays = (date: Date) => {
    try {
      const now = new Date()
      const distance = now.getTime() - date.getTime()
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))

      if (days < 1) {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        )

        if (hours < 1) {
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60),
          )

          return `${minutes || 1} ${minutes <= 1 ? 'minute' : 'minutes'}`
        }

        return `${hours || 1} ${hours === 1 ? 'hour' : 'hours'}`
      }

      return `${days}  ${days === 1 ? 'day' : 'days'}`
    } catch {
      return null
    }
  }

  const getLastAccessed = () => {
    if (!transactions) {
      return null
    }
    const transaction = transactions.filter(
      t => t?.address === address || t?.inputAddresses?.indexOf(address) !== -1,
    )[0]
    if (transaction && transaction.time) {
      const txDate = new Date(transaction.time * 1000)

      return (
        <span className={styles.lastAccessed}>
          Last transaction to or from Address was
          <br />
          {getDifferenceDays(txDate)} ago ({dateformat(txDate, 'mmm dd, yyyy')}{' '}
          at {dateformat(txDate, 'hh:MM tt')})
        </span>
      )
    }

    return null
  }

  return (
    <AccordionItem
      className={[styles.well, styles.receiveblock].join(' ')}
      uuid={address}
    >
      <AccordionItemHeading>
        <AccordionItemButton
          className={[
            styles.accordionHeader,
            styles.flexspacebetween,
            styles.itemsCenter,
          ].join(' ')}
        >
          <span>{address}</span>
          {getLastAccessed()}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className={[styles.receiveDetail].join(' ')}>
        <div className={[styles.flexspacebetween].join(' ')}>
          <div className={[styles.verticalflex, styles.marginleft].join(' ')}>
            {label && (
              <div className={styles.margintoplarge}>
                <div className={[styles.sublight].join(' ')}>Label</div>
                <div
                  className={[styles.padtopsmall, styles.fixedfont].join(' ')}
                >
                  {label}
                </div>
              </div>
            )}

            <div className={[styles.sublight, styles.margintopSmall].join(' ')}>
              Funds
            </div>
            <div className={[styles.padtopsmall].join(' ')}>
              {currencyName} {balance}
            </div>
            <div className={[styles.padtopsmall].join(' ')}>
              {Utils.getPslToUsdString(pslPrice, balance)}
            </div>
            <div
              className={[styles.margintoplarge, styles.breakword].join(' ')}
            >
              {privateKey && (
                <div>
                  <div className={[styles.sublight].join(' ')}>Private Key</div>
                  <div
                    className={[
                      styles.breakword,
                      styles.padtopsmall,
                      styles.fixedfont,
                    ].join(' ')}
                    style={{
                      maxWidth: '600px',
                    }}
                  >
                    {privateKey}
                    <div
                      className={[styles.margintoplarge, styles.highlight].join(
                        ' ',
                      )}
                    >
                      <i
                        className={[
                          styles.yellow,
                          styles.padrightsmall,
                          styles.small,
                          'fas',
                          'fa-exclamation-triangle',
                        ].join(' ')}
                      />
                      WARNING: DO NOT SEND TO ANYONE
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className={[styles.margintoplarge, styles.breakword].join(' ')}
            >
              {viewKey && (
                <div>
                  <div className={[styles.sublight].join(' ')}>Viewing Key</div>
                  <div
                    className={[
                      styles.breakword,
                      styles.padtopsmall,
                      styles.fixedfont,
                    ].join(' ')}
                    style={{
                      maxWidth: '600px',
                    }}
                  >
                    {viewKey}
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                className={[styles.primarybutton, styles.margintoplarge].join(
                  ' ',
                )}
                type='button'
                onClick={() => {
                  clipboard.writeText(address)
                  setCopied(true)
                  setTimerID(setTimeout(() => setCopied(false), 5000) as any)
                }}
              >
                {copied ? <span>Copied!</span> : <span>Copy Address</span>}
              </button>
              {!privateKey && (
                <button
                  className={[styles.primarybutton].join(' ')}
                  type='button'
                  onClick={() => fetchAndSetSinglePrivKey(address)}
                >
                  Export Private Key
                </button>
              )}

              {Utils.isZaddr(address) && !viewKey && (
                <button
                  className={[styles.primarybutton].join(' ')}
                  type='button'
                  onClick={() => fetchAndSetSingleViewKey(address)}
                >
                  Export Viewing Key
                </button>
              )}

              {Utils.isTransparent(address) && (
                <button
                  className={[styles.primarybutton].join(' ')}
                  type='button'
                  onClick={() => openAddress()}
                >
                  View on explorer{' '}
                  <i
                    className={['fas', 'fa-external-link-square-alt'].join(' ')}
                  />
                </button>
              )}

              <button
                className={[styles.primarybutton, styles.buttomMarginTop].join(
                  ' ',
                )}
                type='button'
                onClick={() =>
                  fetchAndSetSinglePrivKey(address, 'generatePaperWallet')
                }
              >
                Generate paper wallet
              </button>
            </div>
          </div>
          <div className={styles.margintopSmall}>
            <QRCode
              value={address}
              className={[styles.receiveQrcode].join(' ')}
            />
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  )
}
