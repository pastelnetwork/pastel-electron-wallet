/* eslint-disable */

import React, { PureComponent } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import TextareaAutosize from 'react-textarea-autosize'
import hex from 'hex-string'
import { withRouter } from 'react-router-dom'
import styles from './Send.module.css'
import cstyles from './Common.module.css'
import {
  ToAddr,
  AddressBalance,
  SendPageState,
  Info,
  AddressBookEntry,
} from './AppState'
import Utils from '../utils/utils'
import ScrollPane from './ScrollPane'
import ArrowUpLight from '../assets/img/arrow_up_dark.png'
import { ErrorModal } from './ErrorModal'
import routes from '../constants/routes.json'

const Spacer = () => {
  return (
    <div
      style={{
        marginTop: '24px',
      }}
    />
  )
} // $FlowFixMe

const ToAddrBox = ({
  toaddr,
  pslPrice,
  updateToField,
  fromAddress,
  fromAmount,
  setMaxAmount,
  setSendButtonEnable,
  totalAmountAvailable,
}: any) => {
  const isMemoDisabled = !Utils.isZaddr(toaddr.to)
  const addressIsValid =
    toaddr.to === '' ||
    Utils.isZaddr(toaddr.to) ||
    Utils.isTransparent(toaddr.to)
  const memoIsValid = toaddr.memo.length <= 512
  let amountError = null

  if (toaddr.amount) {
    if (toaddr.amount < 0) {
      amountError = 'Amount cannot be negative'
    }

    if (toaddr.amount > fromAmount) {
      amountError = 'Amount Exceeds Balance'
    }

    if (toaddr.amount < 10 ** -5) {
      amountError = 'Amount is too small'
    }

    const s = toaddr.amount.toString().split('.')

    if (s && s.length > 1 && s[1].length > 5) {
      amountError = 'Too Many Decimals'
    }
  }

  if (isNaN(toaddr.amount)) {
    // Amount is empty
    amountError = 'Amount cannot be empty'
  }

  let buttonstate: any

  if (
    !addressIsValid ||
    amountError ||
    !memoIsValid ||
    toaddr.to === '' ||
    parseFloat(toaddr.amount) === 0 ||
    fromAmount === 0
  ) {
    buttonstate = false
  } else {
    buttonstate = true
  }

  setTimeout(() => {
    setSendButtonEnable(buttonstate)
  }, 10)
  const usdValue = Utils.getPslToUsdString(pslPrice, toaddr.amount)

  const addReplyTo = () => {
    if (toaddr.memo.endsWith(fromAddress)) {
      return
    }

    if (fromAddress) {
      updateToField(
        toaddr.id,
        null,
        null,
        `${toaddr.memo}\nReply-To:\n${fromAddress}`,
      )
    }
  }

  return (
    <div>
      <div className={[cstyles.well, cstyles.verticalflex].join(' ')}>
        <div className={[cstyles.flexspacebetween].join(' ')}>
          <div className={cstyles.sublight}>To</div>
          <div className={cstyles.validationerror}>
            {addressIsValid ? (
              <i className={[cstyles.green, 'fas', 'fa-check'].join(' ')} />
            ) : (
              <span className={cstyles.red}>Invalid Address</span>
            )}
          </div>
        </div>
        <input
          type='text'
          placeholder='Z or T address'
          className={cstyles.inputbox}
          value={toaddr.to}
          onChange={e => updateToField(toaddr.id, e, null, null)}
        />
        <Spacer />
        <div className={[cstyles.flexspacebetween].join(' ')}>
          <div className={cstyles.sublight}>Amount</div>
          <div className={cstyles.validationerror}>
            {amountError ? (
              <span className={cstyles.red}>{amountError}</span>
            ) : (
              <span>{usdValue}</span>
            )}
          </div>
        </div>
        <div className={[cstyles.flexspacebetween].join(' ')}>
          <input
            type='number'
            step='any'
            className={cstyles.inputbox}
            value={isNaN(toaddr.amount) ? '' : toaddr.amount}
            onChange={e => updateToField(toaddr.id, null, e, null)}
          />
          <img
            className={styles.toaddrbutton}
            src={ArrowUpLight}
            alt='Max'
            onClick={() => setMaxAmount(toaddr.id, totalAmountAvailable)}
          />
        </div>

        <Spacer />

        {isMemoDisabled && (
          <div className={cstyles.sublight}>Memos only for z-addresses</div>
        )}

        {!isMemoDisabled && (
          <div>
            <div className={[cstyles.flexspacebetween].join(' ')}>
              <div className={cstyles.sublight}>Memo</div>
              <div className={cstyles.validationerror}>
                {memoIsValid ? (
                  toaddr.memo.length
                ) : (
                  <span className={cstyles.red}>{toaddr.memo.length}</span>
                )}{' '}
                / 512
              </div>
            </div>
            <TextareaAutosize
              className={cstyles.inputbox}
              value={toaddr.memo}
              disabled={isMemoDisabled}
              onChange={e => updateToField(toaddr.id, null, null, e)}
            />
            <input
              type='checkbox'
              onChange={e => e.target.checked && addReplyTo()}
            />
            Include Reply-To address
          </div>
        )}
        <Spacer />
      </div>
      <Spacer />
    </div>
  )
}

function getSendManyJSON(sendPageState: any, info: any) {
  const json = []
  json.push(sendPageState.fromaddr)
  json.push(
    sendPageState.toaddrs.map((to: any) => {
      const textEncoder = new TextEncoder()
      const memo = to.memo ? hex.encode(textEncoder.encode(to.memo)) : ''

      if (memo === '') {
        return {
          address: to.to,
          amount: to.amount,
        }
      } else {
        return {
          address: to.to,
          amount: to.amount,
          memo,
        }
      }
    }),
  )
  json.push(1) // minconf = 1

  json.push(Utils.getDefaultFee(info.latestBlock)) // Control the default fee as well.

  console.log('Sending:')
  console.log(json)
  return json
}

const ConfirmModalToAddr = ({ toaddr, info }: any) => {
  const { bigPart, smallPart } = Utils.splitPslAmountIntoBigSmall(toaddr.amount)
  const memo = toaddr.memo ? toaddr.memo : ''
  return (
    <div className={cstyles.well}>
      <div
        className={[cstyles.flexspacebetween, cstyles.margintoplarge].join(' ')}
      >
        <div className={[styles.confirmModalAddress].join(' ')}>
          {Utils.splitStringIntoChunks(toaddr.to, 6).join(' ')}
        </div>
        <div className={[cstyles.verticalflex, cstyles.right].join(' ')}>
          <div className={cstyles.large}>
            <div>
              <span>
                {info.currencyName} {bigPart}
              </span>
              <span className={[cstyles.small, styles.pslsmallpart].join(' ')}>
                {smallPart}
              </span>
            </div>
          </div>
          <div>{Utils.getPslToUsdString(info.pslPrice, toaddr.amount)}</div>
        </div>
      </div>
      <div className={[cstyles.sublight, cstyles.breakword].join(' ')}>
        {memo}
      </div>
    </div>
  )
} // Internal because we're using withRouter just below

const ConfirmModalInternal = ({
  sendPageState,
  info,
  sendTransaction,
  clearToAddrs,
  closeModal,
  modalIsOpen,
  openErrorModal,
  history,
}: any) => {
  const sendingTotal =
    sendPageState.toaddrs.reduce(
      (s: any, t: any) => parseFloat(s) + parseFloat(t.amount),
      0.0,
    ) + Utils.getDefaultFee(info.latestBlock)
  const { bigPart, smallPart } = Utils.splitPslAmountIntoBigSmall(sendingTotal)

  const sendButton = () => {
    // First, close the confirm modal.
    closeModal() // This will be replaced by either a success TXID or error message that the user
    // has to close manually.

    openErrorModal(
      'Computing Transaction',
      'Please wait...This could take a while',
    ) // Then send the Tx async
    ;(async () => {
      const sendJson = getSendManyJSON(sendPageState, info)
      let success = false

      try {
        success = await sendTransaction(sendJson, openErrorModal)
      } catch (err) {
        // If there was an error, show the error modal
        openErrorModal('Error Sending Transaction', err)
      } // If the Tx was sent, then clear the addresses

      if (success) {
        clearToAddrs() // Redirect to dashboard after

        history.push(routes.DASHBOARD)
      }
    })()
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={styles.confirmModal}
      overlayClassName={styles.confirmOverlay}
    >
      <div className={[cstyles.verticalflex].join(' ')}>
        <div className={[cstyles.marginbottomlarge, cstyles.center].join(' ')}>
          Confirm Transaction
        </div>
        <div className={cstyles.flex}>
          <div
            className={[
              cstyles.highlight,
              cstyles.xlarge,
              cstyles.flexspacebetween,
              cstyles.well,
              cstyles.maxwidth,
            ].join(' ')}
          >
            <div>Total</div>
            <div className={[cstyles.right, cstyles.verticalflex].join(' ')}>
              <div>
                <span>
                  {info.currencyName} {bigPart}
                </span>
                <span
                  className={[cstyles.small, styles.pslsmallpart].join(' ')}
                >
                  {smallPart}
                </span>
              </div>

              <div className={cstyles.normal}>
                {Utils.getPslToUsdString(info.pslPrice, sendingTotal)}
              </div>
            </div>
          </div>
        </div>

        <div
          className={[cstyles.verticalflex, cstyles.margintoplarge].join(' ')}
        >
          {sendPageState.toaddrs.map((t: any) => (
            <ConfirmModalToAddr key={t.to} toaddr={t} info={info} />
          ))}
        </div>

        <ConfirmModalToAddr
          toaddr={{
            to: 'Fee',
            amount: Utils.getDefaultFee(info.latestBlock),
            memo: null,
          }}
          info={info}
        />

        {info && info.disconnected && (
          <div className={[cstyles.red, cstyles.margintoplarge].join(' ')}>
            You are currently disconnected. This transaction might not work.
          </div>
        )}

        {info && info.verificationprogress < 0.99 && (
          <div className={[cstyles.red, cstyles.margintoplarge].join(' ')}>
            You are currently syncing. This transaction might not work.
          </div>
        )}

        <div className={cstyles.buttoncontainer}>
          <button
            type='button'
            className={cstyles.primarybutton}
            onClick={() => sendButton()}
          >
            Send
          </button>
          <button
            type='button'
            className={cstyles.primarybutton}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

const ConfirmModal = withRouter(ConfirmModalInternal)

class SendState {
  modalIsOpen = false
  errorModalIsOpen = false
  errorModalBody = ''
  errorModalTitle = ''
  sendButtonEnabled = false
}

export default class Send extends PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    this.state = new SendState()
  }

  addToAddr = () => {
    const { sendPageState, setSendPageState } = this.props
    const newToAddrs = sendPageState.toaddrs.concat(
      new ToAddr(Utils.getNextToAddrID()),
    ) // Create the new state object

    const newState = new SendPageState()
    newState.fromaddr = sendPageState.fromaddr
    newState.toaddrs = newToAddrs
    setSendPageState(newState)
  }
  clearToAddrs = () => {
    const { sendPageState, setSendPageState } = this.props
    const newToAddrs = [new ToAddr(Utils.getNextToAddrID())] // Create the new state object

    const newState = new SendPageState()
    newState.fromaddr = sendPageState.fromaddr
    newState.toaddrs = newToAddrs
    setSendPageState(newState)
  }
  changeFrom = (selectedOption: any) => {
    const { sendPageState, setSendPageState } = this.props // Create the new state object

    const newState = new SendPageState()
    newState.fromaddr = selectedOption.value
    newState.toaddrs = sendPageState.toaddrs
    setSendPageState(newState)
  }
  updateToField = (id: any, address: any, amount: any, memo: any) => {
    const { sendPageState, setSendPageState } = this.props
    const newToAddrs = sendPageState.toaddrs.slice(0) // Find the correct toAddr

    const toAddr = newToAddrs.find((a: any) => a.id === id)

    if (address) {
      // $FlowFixMe
      toAddr.to = address.target.value.replace(/ /g, '') // Remove spaces
    }

    if (amount) {
      // Check to see the new amount if valid
      // $FlowFixMe
      const newAmount = parseFloat(amount.target.value)

      if (newAmount < 0 || newAmount > 21 * 10 ** 6) {
        return
      } // $FlowFixMe

      toAddr.amount = newAmount
    }

    if (memo) {
      if (typeof memo === 'string') {
        toAddr.memo = memo
      } else {
        // $FlowFixMe
        toAddr.memo = memo.target.value
      }
    } // Create the new state object

    const newState = new SendPageState()
    newState.fromaddr = sendPageState.fromaddr
    newState.toaddrs = newToAddrs
    setSendPageState(newState)
  }
  setMaxAmount = (id: any, total: any) => {
    const { sendPageState, setSendPageState, info } = this.props
    const newToAddrs = sendPageState.toaddrs.slice(0)
    let totalOtherAmount = newToAddrs
      .filter((a: any) => a.id !== id)
      .reduce((s: any, a: any) => parseFloat(s) + parseFloat(a.amount), 0) // Add Fee

    totalOtherAmount += Utils.getDefaultFee(info.latestBlock) // Find the correct toAddr

    const toAddr = newToAddrs.find((a: any) => a.id === id)
    toAddr.amount = total - totalOtherAmount
    if (toAddr.amount < 0) toAddr.amount = 0
    toAddr.amount = Utils.maxPrecisionTrimmed(toAddr.amount) // Create the new state object

    const newState = new SendPageState()
    newState.fromaddr = sendPageState.fromaddr
    newState.toaddrs = newToAddrs
    setSendPageState(newState)
  }
  setSendButtonEnable = (sendButtonEnabled: any) => {
    this.setState({
      sendButtonEnabled,
    })
  }
  openModal = () => {
    this.setState({
      modalIsOpen: true,
    })
  }
  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    })
  }
  getBalanceForAddress = (addr: any, addressesWithBalance: any) => {
    // Find the addr in addressesWithBalance
    const addressBalance = addressesWithBalance.find(
      (ab: any) => ab.address === addr,
    )

    if (!addressBalance) {
      return 0
    }

    return addressBalance.balance
  }
  getLabelForFromAddress = (
    addr: any,
    addressesWithBalance: any,
    currencyName: any,
  ) => {
    // Find the addr in addressesWithBalance
    const { addressBook } = this.props
    const label = addressBook.find((ab: any) => ab.address === addr)
    const labelStr = label ? ` [ ${label.label} ]` : ''
    const balance = this.getBalanceForAddress(addr, addressesWithBalance)
    return `[ ${currencyName} ${balance.toString()} ]${labelStr} ${addr}`
  }

  render() {
    const {
      modalIsOpen,
      errorModalIsOpen,
      errorModalTitle,
      errorModalBody,
      sendButtonEnabled,
    } = this.state
    const { sendPageState, info, openErrorModal, closeErrorModal } = this.props
    const customStyles = {
      option: (provided: any, state: any) => ({
        ...provided,
        color: state.isSelected ? '#c3921f;' : 'white',
        background: '#212124;',
        padding: 20,
      }),
      menu: (provided: any) => ({ ...provided, background: '#212124;' }),
      control: () => ({
        // none of react-select's styles are passed to <Control />
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'flex',
        background: '#212124;',
      }),
      singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0.5 : 1
        const transition = 'opacity 300ms'
        return { ...provided, opacity, transition, color: '#ffffff' }
      },
    }
    const { addressesWithBalance, sendTransaction } = this.props
    const sendFromList = addressesWithBalance.map((ab: any) => {
      return {
        value: ab.address,
        label: this.getLabelForFromAddress(
          ab.address,
          addressesWithBalance,
          info.currencyName,
        ),
      }
    }) // Find the fromaddress

    let fromaddr: any = {}

    if (sendPageState.fromaddr) {
      fromaddr = {
        value: sendPageState.fromaddr,
        label: this.getLabelForFromAddress(
          sendPageState.fromaddr,
          addressesWithBalance,
          info.currencyName,
        ),
      }
    }

    const totalAmountAvailable = this.getBalanceForAddress(
      fromaddr.value,
      addressesWithBalance,
    )
    return (
      <div>
        <div
          className={[cstyles.xlarge, cstyles.padall, cstyles.center].join(' ')}
        >
          Send
        </div>

        <div className={styles.sendcontainer}>
          <div className={[cstyles.well, cstyles.verticalflex].join(' ')}>
            <div
              className={[cstyles.sublight, cstyles.padbottomsmall].join(' ')}
            >
              Send From
            </div>
            <Select
              value={fromaddr}
              options={sendFromList}
              styles={customStyles as any} // $FlowFixMe
              onChange={this.changeFrom}
            />
          </div>

          <Spacer />

          <ScrollPane offsetHeight={300}>
            {sendPageState.toaddrs.map((toaddr: any) => {
              return (
                <ToAddrBox
                  key={toaddr.id}
                  toaddr={toaddr}
                  pslPrice={info.pslPrice}
                  updateToField={this.updateToField}
                  fromAddress={fromaddr.value}
                  fromAmount={totalAmountAvailable}
                  setMaxAmount={this.setMaxAmount}
                  setSendButtonEnable={this.setSendButtonEnable}
                  totalAmountAvailable={totalAmountAvailable}
                />
              )
            })}
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <button type='button' onClick={this.addToAddr}>
                <i className={['fas', 'fa-plus'].join(' ')} />
              </button>
            </div>
          </ScrollPane>

          <div className={cstyles.center}>
            <button
              type='button'
              disabled={!sendButtonEnabled}
              className={cstyles.primarybutton}
              onClick={this.openModal}
            >
              Send
            </button>
            <button
              type='button'
              className={cstyles.primarybutton}
              onClick={this.clearToAddrs}
            >
              Cancel
            </button>
          </div>

          <ConfirmModal
            sendPageState={sendPageState}
            info={info}
            sendTransaction={sendTransaction}
            openErrorModal={openErrorModal}
            closeModal={this.closeModal}
            modalIsOpen={modalIsOpen}
            clearToAddrs={this.clearToAddrs}
          />

          <ErrorModal
            title={errorModalTitle}
            body={errorModalBody}
            modalIsOpen={errorModalIsOpen}
            closeModal={closeErrorModal}
          />
        </div>
      </div>
    )
  }
}
