/* eslint-disable */

import cx from 'classnames'
import React, { Component } from 'react'

import cstyles from './Common.module.css'
import styles from './ExpertConsole.module.css'
import TerminalConsole from './TerminalConsole'

interface IProps {
  totalBalance: any
  info: any
  addressesWithBalance: any[]
  transactions: any
  addressPrivateKeys: any
  connectedCompanionApp: any
  pastelIDs: any[]
  txDetail?: any
  createNewAddress?: any
  createNewPastelclassName?: any
}

interface IState {
  theme: string
}

export default class ExpertConsole extends Component<IProps, IState> {
  state = {
    theme: 'green',
  }

  get consoleProps() {
    const {
      totalBalance,
      info,
      addressesWithBalance,
      txDetail,
      transactions,
      connectedCompanionApp,
      pastelIDs,
    } = this.props
    const { theme } = this.state
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

  onThemeBtnClick = (theme: string) => {
    this.setState({ theme })
    document.getElementById('terminalInput')?.focus()
  }

  render() {
    const { theme } = this.state

    return (
      <div className={styles.container}>
        <div className={cstyles.flexspacebetween} />
        <div className={cx(styles.crt, styles[theme])}>
          <div className={styles.screen}>
            <div className={styles.wrapper}>
              <div className={styles.interlace} />
              <div className={styles.scanline} />
              <div className={styles.envelope}>
                <TerminalConsole {...this.consoleProps} />
              </div>
            </div>
          </div>
          <div
            className={cx(styles.greenThemeBtn, {
              [styles.active]: theme === 'green',
            })}
            onClick={() => this.onThemeBtnClick('green')}
            title='Select green theme'
          />
          <div
            className={cx(styles.amberThemeBtn, {
              [styles.active]: theme === 'amber',
            })}
            onClick={() => this.onThemeBtnClick('amber')}
            title='Select amber theme'
          />
          <div
            className={cx(styles.blackThemeBtn, {
              [styles.active]: theme === 'black',
            })}
            onClick={() => this.onThemeBtnClick('black')}
            title='Select black theme'
          />
        </div>
      </div>
    )
  }
}
