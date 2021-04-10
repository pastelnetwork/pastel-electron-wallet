import React, { Component } from 'react'
import { passwordStrength } from 'check-password-strength'

import styles from './ExpertConsole.module.css'
import cstyles from './Common.module.css'

import LoadingOverlay from './LoadingOverlay'
import loadConsole from './console'

// type Props = {
//   totalBalance: TotalBalance,
//   info: Info,
//   addressesWithBalance: addressesWithBalance,
//   txDetail: TxDetail,
//   transactions: transactions,
//   connectedCompanionApp: connectedCompanionApp,
//   pastelIDs: pastelIDsFV
// };

// type PassphraseValclassNameation = {
//   value: string,
//   className: number
// };

// type State = {
//   passphrase: string,
//   selectedAddress: OptionType,
//   loading: boolean,
//   passphraseValclassNameation: PassphraseValclassNameation
// };

// function passphraseStatusColor(valclassNameation: PassphraseValclassNameation) {
//   const colors = [cstyles.red, cstyles.yellow, cstyles.yellow, cstyles.green];

//   if (!colors[valclassNameation.className]) {
//     return cstyles.red;
//   }

//   return colors[valclassNameation.className];
// }

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
    }

    this.consoleCommands = this.consoleCommands.bind(this)
  }

  componentDidMount() {
    loadConsole(this.consoleCommands)
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

  render() {
    const { loading } = this.state

    return (
      <>
        {/* <div className={[cstyles.xlarge, cstyles.padall, cstyles.center].join(' ')}>Expert Console</div> */}
        <div className={styles.container}>
          <LoadingOverlay loading={loading}>
            <div className={cstyles.flexspacebetween} />
            <div className={styles.crt}>
              <div className={styles.screen}>
                <div className={styles.wrapper}>
                  <div className={styles.interlace} />
                  <div id='scanline' />
                  <div className={styles.envelope}>
                    <div className={styles.terminal} id='terminal' />
                  </div>
                </div>
              </div>
            </div>
          </LoadingOverlay>
        </div>
      </>
    )
  }
}
