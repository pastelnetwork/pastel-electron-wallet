import cx from 'classnames'
import React, { useState } from 'react'

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

const ExpertConsole = (props: TExpertProps): JSX.Element => {
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

  return (
    <div className={styles.container}>
      <div className={cstyles.flexspacebetween} />
      <div className={cx(styles.crt, styles[theme])}>
        <div className={styles.screen}>
          <div className={styles.wrapper}>
            <div className={styles.interlace} />
            <div className={styles.scanline} />
            <div className={styles.envelope}>
              <TerminalConsole {...consoleProps()} />
            </div>
          </div>
        </div>
        <div
          className={cx(styles.greenThemeBtn, {
            [styles.active]: theme === 'green',
          })}
          onClick={() => onThemeBtnClick('green')}
          title='Select green theme'
        />
        <div
          className={cx(styles.amberThemeBtn, {
            [styles.active]: theme === 'amber',
          })}
          onClick={() => onThemeBtnClick('amber')}
          title='Select amber theme'
        />
        <div
          className={cx(styles.blackThemeBtn, {
            [styles.active]: theme === 'black',
          })}
          onClick={() => onThemeBtnClick('black')}
          title='Select black theme'
        />
      </div>
    </div>
  )
}

export default ExpertConsole
