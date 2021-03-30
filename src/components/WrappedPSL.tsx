import React from 'react'
import styles from './Send.module.css'
import cstyles from './Common.module.css'

export class WrappedPSL extends React.Component {
  render() {
    return (
      <div>
        <div
          className={[cstyles.xlarge, cstyles.padall, cstyles.center].join(' ')}
        >
          Transfer to PSL
        </div>
        <div className={styles.sendcontainer}>
          <div className={[cstyles.well, cstyles.verticalflex].join(' ')}>
            <div
              className={[cstyles.sublight, cstyles.padbottomsmall].join(' ')}
            >
              Amount of wPSL
            </div>
            <input type='number' step='any' className={cstyles.inputbox} />
          </div>
          <div className={cstyles.buttoncontainer}>
            <button type='button' className={cstyles.primarybutton}>
              Transfer
            </button>
            <button type='button' className={cstyles.primarybutton}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }
}
