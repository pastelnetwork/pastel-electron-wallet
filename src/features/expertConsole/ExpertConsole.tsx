import cx from 'classnames'
import React, { useCallback, useState } from 'react'

import cstyles from '../../legacy/components/Common.module.css'
import styles from './ExpertConsole.module.css'
import TerminalConsole from './TerminalConsole'

export interface TExpertProps {
  totalBalance: {
    total: number
    [key: string]: string | number
  }
  info: {
    [key: string]: string | number
  }
  addressesWithBalance: { [key: string]: string | number }[]
  transactions: { [key: string]: string | number }[]
  addressPrivateKeys: string[]
  connectedCompanionApp: boolean
  pastelIDs: string[]
  txDetail?: { [key: string]: string | number }
  createNewAddress?(): void
  createNewPastelclassName?(): void
}

function ExpertConsole(props: TExpertProps): JSX.Element {
  const [theme, setTheme] = useState('green')

  const consoleProps = () => {
    const {
      totalBalance,
      info,
      addressesWithBalance,
      txDetail,
      transactions,
      connectedCompanionApp,
      pastelIDs,
    } = props
    return {
      totalBalance,
      info,
      addressesWithBalance,
      txDetail,
      transactions,
      connectedCompanionApp,
      pastelIDs,
      theme,
    }
  }

  const onThemeBtnClick = (newTheme: string) => {
    setTheme(newTheme)
    document.getElementById('terminalInput')?.focus()
  }

  const onSelectBlackTheme = useCallback(() => {
    onThemeBtnClick('black')
  }, [])

  const onSelectAmberTheme = useCallback(() => {
    onThemeBtnClick('amber')
  }, [])

  const onSelectGreenTheme = useCallback(() => {
    onThemeBtnClick('green')
  }, [])

  const renderTerminalConsoleForm = () => (
    <div className={styles.envelope}>
      <TerminalConsole {...consoleProps()} />
    </div>
  )

  const renderTerminalConsoleBlock = () => (
    <div className={styles.screen}>
      <div className={styles.wrapper}>
        <div className={styles.interlace} />
        <div className={styles.scanline} />
        {renderTerminalConsoleForm()}
      </div>
    </div>
  )

  const renderTheme = () => (
    <>
      <div
        className={cx(styles.greenThemeBtn, {
          [styles.active]: theme === 'green',
        })}
        onClick={onSelectGreenTheme}
        title='Select green theme'
        role='button'
        tabIndex={0}
        aria-hidden='true'
      />
      <div
        className={cx(styles.amberThemeBtn, {
          [styles.active]: theme === 'amber',
        })}
        onClick={onSelectAmberTheme}
        title='Select amber theme'
        role='button'
        tabIndex={0}
        aria-hidden='true'
      />
      <div
        className={cx(styles.blackThemeBtn, {
          [styles.active]: theme === 'black',
        })}
        onClick={onSelectBlackTheme}
        title='Select black theme'
        role='button'
        tabIndex={0}
        aria-hidden='true'
      />
    </>
  )

  return (
    <div className={styles.container}>
      <div className={cstyles.flexspacebetween} />
      <div className={cx(styles.crt, styles[theme])}>
        {renderTerminalConsoleBlock()}
        {renderTheme()}
      </div>
    </div>
  )
}

export default ExpertConsole
