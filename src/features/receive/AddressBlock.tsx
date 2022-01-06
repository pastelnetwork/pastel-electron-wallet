import cx from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { clipboard, shell } from 'electron'
import QRCode from 'qrcode.react'
import React, { useEffect, useRef, useState, useCallback, memo } from 'react'
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import cstyles from '../../legacy/components/Common.module.css'
import Utils from '../../legacy/utils/utils'
import styles from './Receive.module.css'

dayjs.extend(relativeTime)

export interface ITransactionsProps {
  address: string
  time: number
  type: string
  inputAddresses?: string[]
}

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

  transactions?: ITransactionsProps[]
}

const GeneratePaperWalletButton = memo(function GeneratePaperWalletButton({
  fetchAndSetSinglePrivKey,
  address,
}: {
  fetchAndSetSinglePrivKey: (add: string, type?: string | undefined) => void
  address: string
}): JSX.Element {
  const onClick = useCallback(() => {
    fetchAndSetSinglePrivKey(address, 'generatePaperWallet')
  }, [])

  return (
    <button
      className={cx(cstyles.primarybutton, styles.buttonMarginTop)}
      type='button'
      onClick={onClick}
    >
      Generate paper wallet
    </button>
  )
})

const ViewExplorerButton = memo(function ViewExplorerButton({
  openAddress,
}: {
  openAddress: () => void
}): JSX.Element {
  const onClick = useCallback(() => {
    openAddress()
  }, [])

  return (
    <button
      className={cx(cstyles.primarybutton)}
      type='button'
      onClick={onClick}
    >
      View on explorer{' '}
      <i className={cx('fas', 'fa-external-link-square-alt')} />
    </button>
  )
})

const ExportViewingKeyButton = memo(function ExportViewingKeyButton({
  address,
  fetchAndSetSingleViewKey,
}: {
  address: string
  fetchAndSetSingleViewKey: (val: string) => void
}): JSX.Element {
  const onClick = useCallback(() => {
    fetchAndSetSingleViewKey(address)
  }, [])

  return (
    <button
      className={cx(cstyles.primarybutton)}
      type='button'
      onClick={onClick}
    >
      Export Viewing Key
    </button>
  )
})

const CopyPrivKeyButton = memo(function CopyPrivKeyButton({
  copiedPrivKey,
  onCopyPrivKeyBtnClick,
  address,
}: {
  copiedPrivKey: string
  onCopyPrivKeyBtnClick: (val: string) => void
  address: string
}): JSX.Element {
  const onClick = useCallback(() => {
    onCopyPrivKeyBtnClick(address)
  }, [])

  return (
    <button
      className={cx(cstyles.primarybutton)}
      type='button'
      onClick={onClick}
    >
      {!copiedPrivKey
        ? 'Copy Private Key'
        : copiedPrivKey === 'loading'
        ? 'Copying'
        : 'Copied!'}
    </button>
  )
})

const CopyAddressButton = memo(function CopyAddressButton({
  address,
  onCopyAddrBtnClick,
  copiedAddr,
}: {
  address: string
  onCopyAddrBtnClick: (val: string) => void
  copiedAddr: boolean
}): JSX.Element {
  return (
    <button
      className={cx(cstyles.primarybutton, cstyles.margintoplarge)}
      type='button'
      onClick={() => onCopyAddrBtnClick(address)}
    >
      {copiedAddr ? 'Copied!' : 'Copy Address'}
    </button>
  )
})

export function AddressBlock({
  privateKey,
  hidePrivKey,
  fetchAndSetSinglePrivKey,
  currencyName,
  addressBalance,
  label,
  pslPrice,
  viewKey,
  fetchAndSetSingleViewKey,
  transactions,
}: IAddressBlockProps): JSX.Element {
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
    if (copiedPrivKey !== 'loading' || !privateKey) {
      return
    }
    clipboard.writeText(privateKey)
    setCopiedPrivKey('done')
    hidePrivKey()
    copiedPrivKeyTimerId.current = window.setTimeout(() => {
      setCopiedPrivKey('')
      copiedPrivKeyTimerId.current = 0
    }, 3000)
  }, [copiedPrivKey, privateKey])

  const onCopyPrivKeyBtnClick = (addr: string): void => {
    if (copiedPrivKey || copiedPrivKeyTimerId.current) {
      return
    }
    fetchAndSetSinglePrivKey(addr)
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
    if (currencyName === 'LSP') {
      shell.openExternal(
        `https://chain.so/address/PSLTEST/${addressBalance.address}`,
      )
    } else {
      shell.openExternal(
        `https://explorer.pastel.network/address/${addressBalance.address}`,
      )
    }
  }

  const { address } = addressBalance
  const balance = addressBalance.balance || 0

  const getLastAccessed = () => {
    if (!transactions) {
      return null
    }
    const transaction = transactions.filter(t => {
      if (!t) {
        return false
      }
      if (t.address === address) {
        return true
      }
      if (!t.inputAddresses) {
        return false
      }
      return t.inputAddresses.indexOf(address) !== -1
    })[0]
    if (transaction?.time) {
      const txDate = new Date(transaction.time * 1000)

      return (
        <span className={styles.lastAccessed}>
          Last transaction to or from Address was
          <br />
          {dayjs(txDate).fromNow()} ago ({dayjs(txDate).format('MMM DD, YYYY')}{' '}
          at {dayjs(txDate).format('hh:mm a')})
        </span>
      )
    }

    return null
  }

  const renderAccordionItemHeading = () => (
    <AccordionItemHeading>
      <AccordionItemButton
        className={cx(
          cstyles.accordionHeader,
          styles.flexspacebetween,
          styles.itemsCenter,
        )}
      >
        <span>{address}</span>
        {getLastAccessed()}
      </AccordionItemButton>
    </AccordionItemHeading>
  )

  const renderAddressItemButton = () => (
    <div>
      <CopyAddressButton
        copiedAddr={copiedAddr}
        address={address}
        onCopyAddrBtnClick={onCopyAddrBtnClick}
      />
      <CopyPrivKeyButton
        copiedPrivKey={copiedPrivKey}
        address={address}
        onCopyPrivKeyBtnClick={onCopyPrivKeyBtnClick}
      />

      {Utils.isZaddr(address) && !viewKey && (
        <ExportViewingKeyButton
          address={address}
          fetchAndSetSingleViewKey={fetchAndSetSingleViewKey}
        />
      )}

      {Utils.isTransparent(address) && (
        <ViewExplorerButton openAddress={openAddress} />
      )}
      <GeneratePaperWalletButton
        fetchAndSetSinglePrivKey={fetchAndSetSinglePrivKey}
        address={address}
      />
    </div>
  )

  const renderQRCode = () => (
    <div>
      <QRCode value={address} className={cx(styles.receiveQrcode)} />
    </div>
  )

  const renderAccordionItemContent = () => (
    <div className={cx(cstyles.verticalflex, cstyles.marginleft)}>
      {label && (
        <div className={cstyles.margintoplarge}>
          <div className={cx(cstyles.sublight)}>Label</div>
          <div className={cx(cstyles.padtopsmall, cstyles.fixedfont)}>
            {label}
          </div>
        </div>
      )}

      <div className={cx(cstyles.sublight, cstyles.margintoplarge)}>Funds</div>
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
      {renderAddressItemButton()}
    </div>
  )

  return (
    <AccordionItem
      className={cx(cstyles.well, styles.receiveblock)}
      uuid={address}
    >
      {renderAccordionItemHeading()}
      <AccordionItemPanel className={cx(styles.receiveDetail)}>
        <div className={cx(cstyles.flexspacebetween)}>
          {renderAccordionItemContent()}
          {renderQRCode()}
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  )
}
