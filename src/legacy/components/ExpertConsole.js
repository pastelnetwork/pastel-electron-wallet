import React, { Component } from 'react'
import { passwordStrength } from 'check-password-strength'

import styles from './ExpertConsole.module.css'
import cstyles from './Common.module.css'

import LoadingOverlay from './LoadingOverlay'
import loadConsole from './console'

import cx from 'classnames'

export default class ExpertConsole extends Component {
  constructor(props) {
    super(props)

    this.state = {
      passphrase: '',
      selectedAddress: '',
      loading: false,
      passphraseValclassNameation: {
        className: 0,
        value: 'Too weak',
      },
      theme: 'green',
    }

    this.consoleCommands = this.consoleCommands.bind(this)
  }

  componentDidMount() {
    loadConsole(this.consoleCommands)
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    // Always scroll to bottom on resize
    const t = document.querySelector('#terminal textarea')
    if (!t) {
      return
    }
    t.scrollTo({
      top: t.scrollHeight,
    })
  }

  consoleCommands() {
    const {
      totalBalance,
      info,
      addressesWithBalance,
      txDetail,
      transactions,
      connectedCompanionApp,
      pastelIDs,
    } = this.props
    console.log('pastelIDs==>>', pastelIDs)
    return {
      getBalance: () => {
        return totalBalance.total
      },
      getAddressesWithBalance: () => {
        return {
          address: addressesWithBalance[0].address,
          bal: addressesWithBalance[0].balance,
        }
      },
      getTxDetail: () => {
        return txDetail.memo
      },
      getInfo: () => {
        return {
          currencyName: info.currencyName,
          latestBlock: info.latestBlock,
          connections: info.connections,
          version: info.version,
          verificationProgress: info.verificationProgress,
          solps: info.solps,
          pslPrice: info.pslPrice,
          disconnected: info.disconnected,
        }
      },
      getTransaction: () => {
        return transactions[0]
      },
      getConnectedCompanionApp: () => {
        return connectedCompanionApp
      },
      getPastelId: () => {
        if (pastelIDs.length > 0) {
          return pastelIDs
        }

        return 'NO Pastel ID Found'
      },
    }
  }

  onPassphraseChange(e) {
    const passphrase = e.target.value
    const valclassNameation = passwordStrength(passphrase)

    this.setState({
      passphrase,
      passphraseValclassNameation: valclassNameation,
    })
  }

  onAddressChange(selectedOption) {
    this.setState({ selectedAddress: selectedOption.value })
  }

  async onCreate() {
    try {
      const { passphrase, selectedAddress } = this.state
      // eslint-disable-next-line react/prop-types
      const { createNewAddress, createNewPastelclassName } = this.props

      if (!this.valclassName) {
        return
      }

      this.setState({ loading: true })

      if (!selectedAddress) {
        const newAddress = await createNewAddress(false)
        const newSelectedAddress = {
          value: newAddress,
          label: newAddress,
        }

        this.setState({
          selectedAddress: newSelectedAddress,
        })
      }

      await createNewPastelclassName(passphrase)

      this.setState({ loading: false })
    } catch (e) {
      // TODO log errors to a central logger so we can address them later.
      console.warn(e)
    }
  }

  get valclassName() {
    const { passphraseValclassNameation } = this.state

    return passphraseValclassNameation.className === 3 // Strong
  }

  onThemeBtnClick = theme => {
    this.setState({ theme })
  }

  render() {
    const { loading, theme } = this.state

    return (
      <div className={styles.container}>
        <LoadingOverlay loading={loading}>
          <div className={cstyles.flexspacebetween} />
          <div className={cx(styles.crt, styles[theme])}>
            <div className={styles.screen}>
              <div className={styles.wrapper}>
                <div className={styles.interlace} />
                <div id='scanline' />
                <div className={styles.envelope}>
                  <div className={styles.terminal} id='terminal' />
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
        </LoadingOverlay>
      </div>
    )
  }
}
