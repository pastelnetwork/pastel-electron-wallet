/* eslint-disable */

import React, { Component } from 'react'
import { Info } from './AppState'
import cstyles from './Common.module.css'
import styles from './Pasteld.module.css'
import ScrollPane from './ScrollPane'
import Heart from '../assets/img/pastel-logo.png'
import { useAppSelector } from '../../redux/hooks'

const DetailLine = ({ label, value }: any) => {
  return (
    <div className={styles.detailline}>
      <div className={[cstyles.sublight].join(' ')}>{label} :</div>
      <div className={cstyles.breakword}>{value}</div>
    </div>
  )
}

// Used in new routes
export const PasteldFn = () => {
  const appInfo = useAppSelector(state => state.appInfo)
  return (
    <Pasteld
      info={appInfo}
      refresh={() => {
        // implemented only in legacy RPC
      }}
    />
  )
}

// Used in legacy routes
export default class Pasteld extends Component<any> {
  render() {
    const { info, refresh } = this.props

    if (!info || !info.version) {
      return (
        <div>
          <div className={[cstyles.verticalflex, cstyles.center].join(' ')}>
            <div
              style={{
                marginTop: '100px',
              }}
            >
              <i
                className={['fas', 'fa-times-circle'].join(' ')}
                style={{
                  fontSize: '96px',
                  color: 'red',
                }}
              />
            </div>
            <div className={cstyles.margintoplarge}>Not Connected</div>
          </div>
        </div>
      )
    } else {
      let height = info.latestBlock

      if (info.verificationProgress < 0.99) {
        const progress = (info.verificationProgress * 100).toFixed(1)
        height = `${height} (${progress}%)`
      }

      return (
        <div>
          <div className={styles.container}>
            <ScrollPane offsetHeight={0}>
              <div className={styles.imgcontainer}>
                <img src={Heart} alt='heart' />
              </div>

              <div className={styles.detailcontainer}>
                <div className={styles.detaillines}>
                  <DetailLine label='version' value={info.version} />
                  <DetailLine
                    label='Network'
                    value={info.testnet ? 'Testnet' : 'Mainnet'}
                  />
                  <DetailLine label='Block Height' value={height} />
                  <DetailLine label='Connections' value={info.connections} />
                  <DetailLine
                    label='Network Solution Rate'
                    value={`${info.solps} Sol/s`}
                  />
                </div>
              </div>

              <div className={cstyles.buttoncontainer}>
                <button
                  className={cstyles.primarybutton}
                  type='button'
                  onClick={refresh}
                >
                  Refresh All Data
                </button>
              </div>

              <div className={cstyles.margintoplarge} />
            </ScrollPane>
          </div>
        </div>
      )
    }
  }
}
