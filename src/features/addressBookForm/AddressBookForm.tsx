import React, { useState } from 'react'

import Utils from '../../legacy/utils/utils'
import styles from './AddressBookForm.module.css'

type AddressBookProps = {
  label: string
}

type AddressBookFormProps = {
  addAddressBookEntry: (currentLabel: string, currentAddress: string) => void
  addressBook: AddressBookProps[]
}

export default function AddressBookForm(
  props: AddressBookFormProps,
): JSX.Element {
  const [addButtonEnabled, setAddButtonEnabled] = useState(false)
  const [currentLabel, setCurrentLabel] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')

  const updateLabel = (value: string) => {
    if (value.length > 152) {
      return
    }
    setCurrentLabel(value)
    const { labelError, addressIsValid } = validate()
    setAddButtonEnabled(
      !labelError &&
        addressIsValid &&
        currentLabel !== '' &&
        currentAddress !== '',
    )
  }

  const updateAddress = (value: string) => {
    setCurrentAddress(value)
    const { labelError, addressIsValid } = validate()
    setAddButtonEnabled(
      !labelError &&
        addressIsValid &&
        currentLabel !== '' &&
        currentAddress !== '',
    )
  }

  const validate = () => {
    let labelError = props.addressBook.find(
      (i: AddressBookProps) => i.label === currentLabel,
    )
      ? 'Duplicate Label'
      : null
    labelError = currentLabel.length > 150 ? 'Label is too long' : labelError
    const addressIsValid =
      currentAddress === '' ||
      Utils.isZaddr(currentAddress) ||
      Utils.isTransparent(currentAddress)
    return {
      labelError,
      addressIsValid,
    }
  }

  const handleAddButtonClicked = () => {
    props.addAddressBookEntry(currentLabel, currentAddress)
    setCurrentLabel('')
    setCurrentAddress('')
  }

  const { labelError, addressIsValid } = validate()

  return (
    <div className={[styles.well].join(' ')}>
      <div className={[styles.flexspacebetween].join(' ')}>
        <div className={styles.sublight}>Label</div>
        <div className={styles.validationerror}>
          {!labelError ? (
            <i className={[styles.green, 'fas', 'fa-check'].join(' ')} />
          ) : (
            <span className={styles.red}>{labelError}</span>
          )}
        </div>
      </div>
      <input
        type='text'
        value={currentLabel}
        className={[styles.inputbox, styles.margintopsmall].join(' ')}
        onChange={e => updateLabel(e.target.value)}
      />

      <div className={styles.margintoplarge} />

      <div className={[styles.flexspacebetween].join(' ')}>
        <div className={styles.sublight}>Address</div>
        <div className={styles.validationerror}>
          {addressIsValid ? (
            <i className={[styles.green, 'fas', 'fa-check'].join(' ')} />
          ) : (
            <span className={styles.red}>Invalid Address</span>
          )}
        </div>
      </div>
      <input
        type='text'
        value={currentAddress}
        className={[styles.inputbox, styles.margintopsmall].join(' ')}
        onChange={e => updateAddress(e.target.value)}
      />

      <div className={styles.margintoplarge} />

      <button
        type='button'
        className={styles.primarybutton}
        disabled={!addButtonEnabled}
        onClick={handleAddButtonClicked}
      >
        Add
      </button>
    </div>
  )
}
