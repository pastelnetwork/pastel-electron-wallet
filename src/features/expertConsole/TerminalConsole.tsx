/* eslint-disable @typescript-eslint/no-explicit-any */
import asTable from 'as-table'
import cx from 'classnames'
import {
  CommandMapping,
  defaultCommandMapping,
  Emulator,
  EmulatorState,
  History,
  HistoryKeyboardPlugin,
  OutputFactory,
  Outputs,
  OutputType,
} from 'javascript-terminal'
import React, { createRef, useEffect, useState } from 'react'

import { apiRequests } from '../../features/expertConsole/rpc-services/api'
import ConsoleOutput from './ConsoleOutput'
import rpcApi from './rpc-services/api'
import { formatConsoleData } from './rpc-services/utils'
import styles from './TerminalConsole.module.css'

const textAsTable = asTable.configure({ delimiter: ' | ' })

// Banner text
const banner = `
██████╗  █████╗ ███████╗████████╗███████╗██╗     \u2800
██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝██║     \u2800
██████╔╝███████║███████╗   ██║   █████╗  ██║     \u2800
██╔═══╝ ██╔══██║╚════██║   ██║   ██╔══╝  ██║     \u2800
██║     ██║  ██║███████║   ██║   ███████╗███████╗\u2800
╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚══════╝\u2800
`

// Help text default
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

interface TConsoleProps {
  totalBalance: {
    total: number
    [key: string]: string | number
  }
  info: {
    [key: string]: string | number
  }
  addressesWithBalance: { [key: string]: string | number }[]
  transactions: { [key: string]: string | number }[]
  connectedCompanionApp: boolean
  pastelIDs: string[]
  txDetail?: { [key: string]: string | number }
  theme: string
}

let emulator: any = null
let emulatorState: any = null
let historyKeyboardPlugin: any = null
let terminalPlugins: any = []
let isRendered = false
const historyCmds: string[] = []

function TerminalConsole(props: TConsoleProps): JSX.Element {
  const [typing, setTyping] = useState('')
  const [executingCommand, setExecutingCommand] = useState(false)
  const [outputs, setOutputs] = useState<any[]>([])
  const [isReady, setIsReady] = useState(isRendered)
  const [isInitiatedTerminal, setIsInitiatedTerminal] = useState(false)
  const inputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    inputRef.current?.focus()
  }, [isReady])

  useEffect(() => {
    return () => {
      for (let i = apiRequests.length - 1; i >= 0; i--) {
        // Cancel all API requests
        if (apiRequests[i]) {
          apiRequests[i].cancel('Operation canceled when change route.')
          apiRequests.splice(i, 1)
        }
      }
    }
  }, [])

  const loadBanner = () => {
    const len = banner.length
    const bElm = document.getElementById('banner')
    const currentText = bElm?.innerText.length || 0

    setTimeout(() => {
      if (currentText < len && bElm) {
        bElm.innerHTML += banner.substr(currentText, 3)
        loadBanner()
      } else {
        setIsReady(true)
      }
    }, 0)
  }

  const focusTerminalInput = () => {
    inputRef.current?.focus()
    resetScroll()
  }

  const resetScroll = () => {
    const terminalWrap = document.getElementById('terminalWrap')
    if (terminalWrap) {
      terminalWrap.scrollTo({
        left: 0,
        top: terminalWrap.scrollHeight,
      })
    }
  }

  const displayOutputs = (result: any[]) => {
    const outputNodes = Array.from(result)
    setOutputs(outputNodes)
    resetScroll()
  }

  const clearInput = () => {
    setTyping('')
  }

  const onEnterKeyDown = () => {
    emulatorState = emulator.execute(emulatorState, typing, terminalPlugins)
    displayOutputs(emulatorState.getOutputs())
    clearInput()
  }

  const onTabPress = () => {
    if (!typing) {
      addOutputThenDisplay("$\nType 'help' for a list of available commands.")
      return
    }
    const autoCompletionStr = emulator.autocomplete(emulatorState, typing)
    if (autoCompletionStr !== typing) {
      setTyping(autoCompletionStr)
      return
    }
    const suggestions = emulator.suggest(emulatorState, typing)
    if (!suggestions?.length || suggestions[0] === typing) {
      return
    }
    addOutputThenDisplay(`$ ${typing}\n${suggestions.join('\n')}`)
  }

  const onArrowDownPress = () => {
    setTyping(historyKeyboardPlugin.completeDown())
  }

  const onArrowUpPress = () => {
    setTyping(historyKeyboardPlugin.completeUp())
  }

  const helpCommand = () => {
    return {
      output: OutputFactory.makeTextOutput(helpText),
    }
  }

  const clearCommand = () => {
    const newOutputs = Outputs.create([])
    emulatorState = emulatorState.setOutputs(newOutputs)
    setOutputs([])
    setTyping('')
  }

  const getBalanceCommand = () => {
    const { totalBalance } = props
    return {
      output: OutputFactory.makeTextOutput(totalBalance?.total || 0),
    }
  }

  const getAddressesWithBalanceCommand = () => {
    const { addressesWithBalance } = props
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

  const getTxDetailCommand = () => {
    const { txDetail } = props
    return {
      output: OutputFactory.makeTextOutput(txDetail?.memo || 0),
    }
  }

  const getInfoCommand = () => {
    const { info } = props
    const text = textAsTable([formatConsoleData(info)])

    return {
      output: OutputFactory.makeTextOutput(text),
    }
  }

  const getTransactionCommand = () => {
    const { transactions } = props
    const obj = transactions[0] || {}
    const text = textAsTable([formatConsoleData(obj)])

    return {
      output: OutputFactory.makeTextOutput(text),
    }
  }

  const getConnectedCompanionAppCommand = () => {
    const { connectedCompanionApp } = props
    return {
      output: OutputFactory.makeTextOutput(connectedCompanionApp),
    }
  }

  const getPastelIdCommand = () => {
    const { pastelIDs } = props
    const idStr =
      pastelIDs.length > 0 ? pastelIDs.join(', ') : 'NO Pastel ID Found'

    return {
      output: OutputFactory.makeTextOutput(idStr),
    }
  }

  const rpcCommandResponse = (commandKey: string) => async (
    state: any,
    opts: string[],
  ) => {
    historyCmds.push(commandKey)
    setExecutingCommand(true)
    let textConsole = ''

    try {
      const data = await rpcApi[commandKey](opts)
      textConsole = `${data}`

      if (typeof data === 'object') {
        const tempArr = Array.isArray(data)
          ? data.length > 0
            ? data.map(formatConsoleData)
            : ['']
          : [formatConsoleData(data || {})]
        textConsole = textAsTable(tempArr)
      }

      if (data == null || (Array.isArray(data) && data.length == 0)) {
        textConsole = 'null'
      }
    } catch (error) {
      textConsole = error.message
    }
    await addOutputThenDisplay(textConsole)
    setExecutingCommand(false)
  }

  const addOutputThenDisplay = async (text: string) => {
    const oldOutputs = emulatorState.getOutputs()
    const newOutputs = Outputs.addRecord(
      oldOutputs,
      OutputFactory.makeTextOutput(text),
    )
    emulatorState = await emulatorState.setOutputs(newOutputs)
    displayOutputs(emulatorState.getOutputs())
  }

  const onKeyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        onEnterKeyDown()
        break
      case 'ArrowUp':
        e.preventDefault()
        onArrowUpPress()
        break
      case 'ArrowDown':
        e.preventDefault()
        onArrowDownPress()
        break
      case 'Tab':
        e.preventDefault()
        onTabPress()
        break
      default:
        break
    }
  }

  const initTerminal = () => {
    const defaultCommands = {
      help: {
        function: helpCommand,
        optDef: {},
      },
      clear: {
        function: clearCommand,
        optDef: {},
      },
      getBalance: {
        function: getBalanceCommand,
        optDef: {},
      },
      getAddressesWithBalance: {
        function: getAddressesWithBalanceCommand,
        optDef: {},
      },
      getTxDetail: {
        function: getTxDetailCommand,
        optDef: {},
      },
      getInfo: {
        function: getInfoCommand,
        optDef: {},
      },
      getTransaction: {
        function: getTransactionCommand,
        optDef: {},
      },
      getConnectedCompanionApp: {
        function: getConnectedCompanionAppCommand,
        optDef: {},
      },
      getPastelId: {
        function: getPastelIdCommand,
        optDef: {},
      },
    }

    const rpcCommands = Object.keys(rpcApi).reduce(
      (obj, rpcKey) => ({
        ...obj,
        [rpcKey]: {
          function: rpcCommandResponse(rpcKey),
          optDef: {},
        },
      }),
      {},
    )

    // custom commands
    const customCommandMapping = CommandMapping.create({
      ...defaultCommandMapping,
      ...defaultCommands,
      ...rpcCommands,
    })

    // init terminal
    if (!emulator) {
      emulator = new Emulator()
    }

    const oldOutputs = emulatorState
      ? emulatorState.getOutputs()
      : Outputs.create([])
    emulatorState = EmulatorState.create({
      commandMapping: customCommandMapping,
      history: History.create(historyCmds),
      outputs: oldOutputs,
    })

    if (oldOutputs.size > 0) {
      displayOutputs(oldOutputs)
    } else {
      historyKeyboardPlugin = new HistoryKeyboardPlugin(emulatorState)
      terminalPlugins = [historyKeyboardPlugin]
    }
  }

  const onChangeTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetScroll()
    setTyping(e.target.value)
  }

  useEffect(() => {
    if (!isRendered) {
      loadBanner()
      isRendered = true
    }
    window.addEventListener('resize', resetScroll)
    return () => {
      window.removeEventListener('resize', resetScroll)
    }
  }, [])

  useEffect(() => {
    resetScroll()
  }, [outputs])

  useEffect(() => {
    if (isReady && !isInitiatedTerminal) {
      initTerminal()
      setIsInitiatedTerminal(true)
    }
  }, [isReady, isInitiatedTerminal, initTerminal])

  const { theme = 'green' } = props

  return (
    <div id='terminalWrap' className={cx(styles.terminal, styles[theme])}>
      <div className={styles.terminalHead}>
        <p>............................................................</p>
        <pre id='banner'>{isRendered && banner}</pre>
        {isReady && (
          <>
            <p>............................................................</p>
            <p>Type 'help' for a list of available commands.</p>
          </>
        )}
      </div>
      <div className={styles.terminalInputLongArea}>
        <div className={styles.terminalOutput}>
          {outputs.map((out: any, index: number) => (
            <ConsoleOutput
              key={index}
              type={out.type}
              textContent={
                out.type === OutputType.HEADER_OUTPUT_TYPE
                  ? `$ ${out.content.command}`
                  : out.content
              }
            />
          ))}
        </div>
        <div
          className={styles.terminalInputLongAreaClickable}
          onClick={focusTerminalInput}
        />
      </div>
      {executingCommand && <div className={styles.loading} />}
      <div
        className={cx(styles.terminalInputWrap, {
          [styles.isReady]: isReady && !executingCommand,
        })}
        onClick={focusTerminalInput}
      >
        <span>$&nbsp;</span>
        <input
          type='text'
          ref={inputRef}
          value={typing}
          id='terminalInput'
          onChange={onChangeTyping}
          className={styles.terminalInput}
          onKeyDown={onKeyDownHandle}
          autoFocus={isReady}
        />
      </div>
    </div>
  )
}

export default TerminalConsole
