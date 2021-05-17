/* eslint-disable */

import React, { Component } from 'react'
import Modal from 'react-modal'
import dateformat from 'dateformat'
import { shell } from 'electron'
import clx from 'classnames'
import { withRouter } from 'react-router'
import { BalanceBlockHighlight } from './Dashboard'
import styles from './Transactions.module.css'
import cstyles from './Common.module.css'
import { Transaction, Info } from './AppState'
import ScrollPane from './ScrollPane'
import Utils from '../utils/utils'
import AddressBook from './Addressbook'
import routes from '../constants/routes.json'

import ReceiveIcon from '../assets/img/transaction_received_icon_dark.svg'
import SendIcon from '../assets/img/transaction_sent_icon_dark.svg'

const TxModalInternal = ({
  modalIsOpen,
  tx,
  info,
  closeModal,
  currencyName,
  pslPrice,
  setSendTo,
  history,
}: any) => {
  let txid = ''
  let type = ''
  let typeIcon = ''
  let typeColor = ''
  let confirmations = 0
  let detailedTxns = []
  let amount = 0
  let datePart = ''
  let timePart = ''

  if (tx) {
    txid = tx.txid
    type = tx.type

    if (tx.type === 'receive') {
      typeIcon = 'fa-arrow-circle-down'
      typeColor = 'green'
    } else {
      typeIcon = 'fa-arrow-circle-up'
      typeColor = 'red'
    }

    datePart = dateformat(tx.time * 1000, 'mmm dd, yyyy')
    timePart = dateformat(tx.time * 1000, 'hh:MM tt')
    confirmations = tx.confirmations
    detailedTxns = tx.detailedTxns
    amount = Math.abs(tx.amount)
  }

  const openTxid = () => {
    if (currencyName === 'LSP') {
      shell.openExternal(`https://explorer.pastel.network/tx/PSLTEST/${txid}`)
    } else {
      shell.openExternal(`https://explorer.pastel.network/tx/${txid}`)
    }
  }

  const doReply = (address: any) => {
    setSendTo(
      // @ts-ignore
      new PastelURITarget(address, Utils.getDefaultFee(info.latestBlock), null),
    )
    closeModal()
    history.push(routes.SEND)
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={styles.txmodal}
      overlayClassName={styles.txmodalOverlay}
    >
      <div className={cstyles.verticalflex}>
        <div className={clx(cstyles.marginbottomlarge, cstyles.center)}>
          Transaction Status
        </div>

        <div className={cstyles.center}>
          <i
            className={['fas', typeIcon].join(' ')}
            style={{
              fontSize: '96px',
              color: typeColor,
            }}
          />
        </div>

        <div className={cstyles.center}>
          {type === 'receive' ? 'Receive' : 'Send'}
          <BalanceBlockHighlight
            pslValue={amount}
            usdValue={Utils.getPslToUsdString(pslPrice, Math.abs(amount))}
            currencyName={currencyName}
          />
        </div>

        <div className={cstyles.flexspacebetween}>
          <div>
            <div className={cstyles.sublight}>Time</div>
            <div>
              {datePart} {timePart}
            </div>
          </div>

          {type === 'send' && (
            <div>
              <div className={cstyles.sublight}>Fees</div>
              <div>PSL {Utils.maxPrecisionTrimmed(tx.fee)}</div>
            </div>
          )}

          <div>
            <div className={cstyles.sublight}>Confirmations</div>
            <div>{confirmations}</div>
          </div>
        </div>

        <div className={cstyles.margintoplarge} />

        <div className={cstyles.flexspacebetween}>
          <div>
            <div className={cstyles.sublight}>TXID</div>
            <div>{txid}</div>
          </div>

          <div className={cstyles.primarybutton} onClick={openTxid}>
            View TXID &nbsp;
            <i className='fas fa-external-link-square-alt' />
          </div>
        </div>

        <div className={cstyles.margintoplarge} />
        <hr />

        {detailedTxns.map((txdetail: any) => {
          const { bigPart, smallPart } = Utils.splitPslAmountIntoBigSmall(
            Math.abs(txdetail.amount),
          )
          let { address } = txdetail
          const { memo } = txdetail

          if (!address) {
            address = '(Shielded)'
          }

          let replyTo: any = null

          if (tx.type === 'receive' && memo) {
            const split = memo.split(/[ :\n\r\t]+/)

            if (
              split &&
              split.length > 0 &&
              Utils.isSapling(split[split.length - 1])
            ) {
              replyTo = split[split.length - 1]
            }
          }

          return (
            <div key={address} className={cstyles.verticalflex}>
              <div className={cstyles.sublight}>Address</div>
              <div>{Utils.splitStringIntoChunks(address, 6).join(' ')}</div>

              <div className={cstyles.margintoplarge} />
              <div className={cstyles.sublight}>Amount</div>
              <div>
                <span>
                  {currencyName} {bigPart}
                </span>
                <span className={clx(cstyles.small, cstyles.pslsmallpart)}>
                  {smallPart}
                </span>
              </div>

              <div className={cstyles.margintoplarge} />

              {memo && (
                <div>
                  <div className={cstyles.sublight}>Memo</div>
                  <div className={cstyles.flexspacebetween}>
                    <div>{memo}</div>
                    {replyTo && (
                      <div
                        className={cstyles.primarybutton}
                        onClick={() => doReply(replyTo)}
                      >
                        Reply
                      </div>
                    )}
                  </div>
                </div>
              )}

              <hr />
            </div>
          )
        })}

        <div className={clx(cstyles.center, cstyles.margintoplarge)}>
          <button
            type='button'
            className={cstyles.primarybutton}
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

const TxModal = withRouter(TxModalInternal)

const TxItemBlock = ({
  transaction,
  currencyName,
  pslPrice,
  txClicked,
  addressBookMap,
}: any) => {
  const txDate = new Date(transaction.time * 1000)
  const datePart = dateformat(txDate, 'mmm dd, yyyy')
  const timePart = dateformat(txDate, 'hh:MM tt')
  const isReceive = transaction.type === 'receive'

  return (
    <div>
      <div className={clx(cstyles.small, cstyles.sublight, styles.txdate)}>
        {datePart}
      </div>
      <div
        className={clx(cstyles.well, styles.txbox)}
        onClick={() => {
          txClicked(transaction)
        }}
      >
        <img
          src={isReceive ? ReceiveIcon : SendIcon}
          alt=''
          className={styles.tranIcon}
        />

        <div className={styles.txtype}>
          <div>{isReceive ? 'Receive' : 'Send'}</div>
          <div className={clx(cstyles.padtopsmall, cstyles.sublight)}>
            {timePart}
          </div>
        </div>
        <div className={styles.txaddressamount}>
          {transaction.detailedTxns.map((txdetail: any) => {
            const { bigPart, smallPart } = Utils.splitPslAmountIntoBigSmall(
              Math.abs(txdetail.amount),
            )
            let { address } = txdetail
            const { memo } = txdetail

            if (!address) {
              address = '(Shielded)'
            }

            const label = addressBookMap[address] || ''
            return (
              <div key={address} className={cstyles.padtopsmall}>
                <div className={styles.txaddress}>
                  <div className={cstyles.highlight}>{label}</div>
                  <div>{Utils.splitStringIntoChunks(address, 6).join(' ')}</div>
                  <div
                    className={clx(
                      cstyles.small,
                      cstyles.sublight,
                      cstyles.padtopsmall,
                      styles.txmemo,
                    )}
                  >
                    {memo}
                  </div>
                </div>
                <div className={clx(styles.txamount, cstyles.right)}>
                  <div>
                    <span>
                      {currencyName} {bigPart}
                    </span>
                    <span className={clx(cstyles.small, cstyles.pslsmallpart)}>
                      {smallPart}
                    </span>
                  </div>
                  <div
                    className={clx(
                      cstyles.sublight,
                      cstyles.small,
                      cstyles.padtopsmall,
                    )}
                  >
                    {Utils.getPslToUsdString(
                      pslPrice,
                      Math.abs(txdetail.amount),
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default class Transactions extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      clickedTx: null,
      modalIsOpen: false,
      numTxnsToShow: 100,
    }
  }

  txClicked = (tx: any) => {
    // Show the modal
    if (!tx) return
    this.setState({
      clickedTx: tx,
      modalIsOpen: true,
    })
  }
  closeModal = () => {
    this.setState({
      clickedTx: null,
      modalIsOpen: false,
    })
  }
  show100MoreTxns = () => {
    const { numTxnsToShow } = this.state
    this.setState({
      numTxnsToShow: numTxnsToShow + 100,
    })
  }

  render() {
    const { transactions, info, addressBook, setSendTo } = this.props
    const { clickedTx, modalIsOpen, numTxnsToShow } = this.state
    const isLoadMoreEnabled =
      transactions && numTxnsToShow < transactions.length
    const addressBookMap = addressBook.reduce((map: any, obj: any) => {
      map[obj.address] = obj.label
      return map
    }, {})
    return (
      <div>
        <div className={clx(cstyles.xlarge, cstyles.padall, cstyles.center)}>
          Transactions
        </div>

        {/* Change the hardcoded height */}
        <ScrollPane offsetHeight={100}>
          {
            /* If no transactions, show the "loading..." text */
            !transactions && (
              <div className={clx(cstyles.center, cstyles.margintoplarge)}>
                Loading...
              </div>
            )
          }

          {transactions && transactions.length === 0 && (
            <div className={clx(cstyles.center, cstyles.margintoplarge)}>
              No Transactions Yet
            </div>
          )}
          {transactions &&
            transactions.slice(0, numTxnsToShow).map((t: any) => {
              const key = t.type + t.txid + t.address + t.index
              return (
                <TxItemBlock
                  key={key}
                  transaction={t}
                  currencyName={info.currencyName}
                  pslPrice={info.pslPrice}
                  txClicked={this.txClicked}
                  addressBookMap={addressBookMap}
                />
              )
            })}

          {isLoadMoreEnabled && (
            <div
              style={{
                marginLeft: '45%',
                width: '100px',
              }}
              className={cstyles.primarybutton}
              onClick={this.show100MoreTxns}
            >
              Load more
            </div>
          )}
        </ScrollPane>

        <TxModal
          modalIsOpen={modalIsOpen}
          tx={clickedTx}
          info={info}
          closeModal={this.closeModal}
          currencyName={info.currencyName}
          pslPrice={info.pslPrice}
          setSendTo={setSendTo}
        />
      </div>
    )
  }
}
