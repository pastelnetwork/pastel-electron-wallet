/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import asTable from 'as-table'
import cx from 'classnames'
import {
  CommandMapping,
  defaultCommandMapping,
  Emulator,
  EmulatorState,
  HistoryKeyboardPlugin,
  OutputFactory,
  Outputs,
  OutputType,
} from 'javascript-terminal'
import React, { Component } from 'react'

import styles from './styles.module.css'

const textAsTable = asTable.configure({ delimiter: ' | ' })

const createOutputDiv = (className: string, textContent: string) => {
  const div = document.createElement('div')

  div.className = className
  div.innerHTML = `<pre>${textContent}</pre>`

  return div
}

const outputToHTMLNode = {
  [OutputType.TEXT_OUTPUT_TYPE]: (content: string) =>
    createOutputDiv(styles.textOutput, content),
  [OutputType.TEXT_ERROR_OUTPUT_TYPE]: (content: string) =>
    createOutputDiv(styles.errorOutput, content),
  [OutputType.HEADER_OUTPUT_TYPE]: (content: string | any) =>
    createOutputDiv(styles.headOutput, `$ ${content.command}`),
}

// Banner text
const banner = `
██████╗  █████╗ ███████╗████████╗███████╗██╗     \u2800
██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝██║     \u2800
██████╔╝███████║███████╗   ██║   █████╗  ██║     \u2800
██╔═══╝ ██╔══██║╚════██║   ██║   ██╔══╝  ██║     \u2800
██║     ██║  ██║███████║   ██║   ███████╗███████╗\u2800
╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚══════╝\u2800
`

// Help text
const helpText = `Available commands:
 - help: This output
 - clear: To clear the console
 - getBalance: Prints Total Balance
 - getAddressesWithBalance: Prints Address With Balance
 - getTxDetail: Prints Txt Details
 - getInfo: Prints all Information
 - getTransaction: Prints Transactions
 - getConnectedCompanionApp: Prints Connected Companion App
 - getPastelId: Prints PastelId

`

interface IProps {
  theme: string
  totalBalance: any
  addressesWithBalance: any
  txDetail: any
  info: any
  transactions: any
  connectedCompanionApp: any
  pastelIDs: any
}

interface IState {
  isReady: boolean
}

class TerminalConsole extends Component<IProps, IState> {
  emulator: any
  emulatorState: any
  historyKeyboardPlugin: any
  terminalPlugins: any
  inputRef: any
  outputRef: HTMLElement | null
  terminalWrapRef: HTMLElement | null

  constructor(props: IProps) {
    super(props)
    this.state = {
      isReady: false,
    }
    this.emulator = null
    this.emulatorState = null
    this.terminalPlugins = []
    this.inputRef = null
    this.outputRef = null
    this.terminalWrapRef = null
  }

  componentDidMount() {
    this.loadBanner()
  }

  loadBanner = () => {
    const len = banner.length
    const bElm = document.getElementById('banner')
    const currentText = bElm?.innerText.length || 0

    setTimeout(() => {
      if (currentText < len && bElm) {
        bElm.innerHTML += banner.substr(currentText, 3)
        this.loadBanner()
      } else {
        this.setState({ isReady: true }, this.initTerminal)
      }
    }, 0)
  }

  addKeyDownListener = (
    eventKey: string,
    target: HTMLInputElement,
    onKeyDown: () => void,
  ) => {
    target.addEventListener('keydown', e => {
      if (e.key === eventKey) {
        onKeyDown()
        e.preventDefault()
      }
    })
  }

  getInput = () => {
    return this.inputRef ? this.inputRef.value : ''
  }

  setInput = (val: string) => {
    if (this.inputRef) {
      this.inputRef.value = val
    }
  }

  displayOutputs = (outputs: any) => {
    if (this.outputRef) {
      this.outputRef.innerHTML = ''

      const outputNodes = Array.from(outputs).map((output: any) =>
        outputToHTMLNode[output.type](output.content),
      )

      for (const outputNode of outputNodes) {
        this.outputRef.append(outputNode)
      }

      if (this.terminalWrapRef) {
        this.terminalWrapRef.scrollTop = this.terminalWrapRef.scrollHeight + 100
      }
    }
  }

  clearInput = () => {
    this.setInput('')
  }

  onEnterKeyDown = () => {
    const commandStr = this.getInput()

    this.emulatorState = this.emulator.execute(
      this.emulatorState,
      commandStr,
      this.terminalPlugins,
    )
    this.displayOutputs(this.emulatorState.getOutputs())
    this.clearInput()
  }

  onTabPress = () => {
    const autoCompletionStr = this.emulator.autocomplete(
      this.emulatorState,
      this.getInput(),
    )
    this.setInput(autoCompletionStr)
  }

  onArrowDownPress = () => {
    this.setInput(this.historyKeyboardPlugin.completeDown())
  }

  onArrowUpPress = () => {
    this.setInput(this.historyKeyboardPlugin.completeUp())
  }

  helpCommand = () => {
    return {
      output: OutputFactory.makeTextOutput(helpText),
    }
  }

  clearCommand = () => {
    const newOutputs = Outputs.create([])
    this.emulatorState = this.emulatorState.setOutputs(newOutputs)
    if (this.outputRef) {
      this.outputRef.innerHTML = ''
    }
    if (this.inputRef) {
      this.inputRef.value = ''
    }
  }

  getBalanceCommand = () => {
    const { totalBalance } = this.props
    return {
      output: OutputFactory.makeTextOutput(totalBalance?.total || 0),
    }
  }

  getAddressesWithBalanceCommand = () => {
    const { addressesWithBalance } = this.props
    const { address = '', balance = 0 } = addressesWithBalance[0] || {}
    const outputText = textAsTable([
      {
        address,
        balance,
      },
    ])

    return {
      output: OutputFactory.makeTextOutput(outputText),
    }
  }

  getTxDetailCommand = () => {
    const { txDetail } = this.props
    return {
      output: OutputFactory.makeTextOutput(txDetail?.memo || 0),
    }
  }

  getInfoCommand = () => {
    const { info } = this.props
    const text = textAsTable([
      {
        currencyName: info.currencyName,
        latestBlock: info.latestBlock,
        connections: info.connections,
        version: info.version,
        verificationProgress: info.verificationProgress,
        solps: info.solps,
        pslPrice: info.pslPrice || 'n/a',
        disconnected: info.disconnected,
      },
    ])

    return {
      output: OutputFactory.makeTextOutput(text),
    }
  }

  getTransactionCommand = () => {
    const { transactions } = this.props
    const obj = transactions[0] || {}
    const text = textAsTable([
      {
        txid: obj.txid,
        type: obj.type,
        fee: obj.fee,
        address: obj.address,
        amount: obj.amount,
        time: obj.time,
        confirmations: obj.confirmations,
      },
    ])

    return {
      output: OutputFactory.makeTextOutput(text),
    }
  }

  getConnectedCompanionAppCommand = () => {
    const { connectedCompanionApp } = this.props
    return {
      output: OutputFactory.makeTextOutput(connectedCompanionApp),
    }
  }

  getPastelIdCommand = () => {
    const { pastelIDs } = this.props
    const idStr =
      pastelIDs.length > 0 ? pastelIDs.join(', ') : 'NO Pastel ID Found'

    return {
      output: OutputFactory.makeTextOutput(idStr),
    }
  }

  initTerminal = () => {
    this.terminalWrapRef = document.getElementById('terminalWrap') || null
    this.inputRef = document.getElementById('terminalInput')
    this.outputRef = document.getElementById('terminalOutput') || null

    // custom commands
    const customCommandMapping = CommandMapping.create({
      ...defaultCommandMapping,
      help: {
        function: this.helpCommand,
        optDef: {},
      },
      clear: {
        function: this.clearCommand,
        optDef: {},
      },
      getBalance: {
        function: this.getBalanceCommand,
        optDef: {},
      },
      getAddressesWithBalance: {
        function: this.getAddressesWithBalanceCommand,
        optDef: {},
      },
      getTxDetail: {
        function: this.getTxDetailCommand,
        optDef: {},
      },
      getInfo: {
        function: this.getInfoCommand,
        optDef: {},
      },
      getTransaction: {
        function: this.getTransactionCommand,
        optDef: {},
      },
      getConnectedCompanionApp: {
        function: this.getConnectedCompanionAppCommand,
        optDef: {},
      },
      getPastelId: {
        function: this.getPastelIdCommand,
        optDef: {},
      },
    })

    // init terminal
    this.emulator = new Emulator()
    this.emulatorState = EmulatorState.create({
      commandMapping: customCommandMapping,
    })
    this.historyKeyboardPlugin = new HistoryKeyboardPlugin(this.emulatorState)
    this.terminalPlugins = [this.historyKeyboardPlugin]

    // listeners on keyboard
    if (this.inputRef) {
      this.addKeyDownListener('Enter', this.inputRef, this.onEnterKeyDown)
      this.addKeyDownListener('ArrowUp', this.inputRef, this.onArrowUpPress)
      this.addKeyDownListener('ArrowDown', this.inputRef, this.onArrowDownPress)
      this.addKeyDownListener('Tab', this.inputRef, this.onTabPress)
    }
  }

  render() {
    const { isReady } = this.state
    const { theme = 'green' } = this.props

    return (
      <div className={cx(styles.terminal, styles[theme])} id='terminalWrap'>
        <div className={styles.terminalHead}>
          <p id='bannerLine1'>
            ............................................................
          </p>
          <pre id='banner' />
          {isReady && (
            <>
              <p id='bannerLine2'>
                ............................................................
              </p>
              <p id='bannerHelpText'>
                Type 'help' for a list of available commands.
              </p>
            </>
          )}
        </div>
        <div id='terminalOutput' className={styles.terminalOutput} />
        <div
          className={styles.terminalInputWrap}
          style={{ display: isReady ? '' : 'none' }}
        >
          <span>$&nbsp;</span>
          <input
            id='terminalInput'
            type='text'
            className={styles.terminalInput}
            autoFocus={isReady}
          />
        </div>
      </div>
    )
  }
}

export default TerminalConsole
