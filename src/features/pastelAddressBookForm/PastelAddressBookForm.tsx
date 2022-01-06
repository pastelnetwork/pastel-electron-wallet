import React, { useCallback, useState } from 'react'

import Utils from '../../legacy/utils/utils'
import styles from './PastelAddressBookForm.module.css'

type AddressBookProps = {
  label: string
}

type PastelAddressBookFormProps = {
  addAddressBookEntry: (currentLabel: string, currentAddress: string) => void
  addressBook: AddressBookProps[]
}

export default function PastelAddressBookForm({
  addAddressBookEntry,
  addressBook,
}: PastelAddressBookFormProps): JSX.Element {
  const [addButtonEnabled, setAddButtonEnabled] = useState(false)
  const [currentLabel, setCurrentLabel] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')

  const validate = (label: string, address: string) => {
    let labelError = addressBook.find(
      (i: AddressBookProps) => i.label === label,
    )
      ? 'Duplicate Label'
      : null
    labelError = label.length > 150 ? 'Label is too long' : labelError
    const addressIsValid =
      address === '' || Utils.isZaddr(address) || Utils.isTransparent(address)
    return {
      labelError,
      addressIsValid,
    }
  }

  const updateLabel = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (value.length > 152) {
        return
      }
      setCurrentLabel(value)
      const { labelError, addressIsValid } = validate(value, currentAddress)
      setAddButtonEnabled(
        !labelError && addressIsValid && value !== '' && currentAddress !== '',
      )
    },
    [addButtonEnabled, currentAddress],
  )

  const updateAddress = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setCurrentAddress(value)
      const { labelError, addressIsValid } = validate(currentLabel, value)
      setAddButtonEnabled(
        !labelError && addressIsValid && currentLabel !== '' && value !== '',
      )
    },
    [addButtonEnabled, currentAddress],
  )

  const handleAddButtonClicked = useCallback(() => {
    if (currentLabel && currentAddress) {
      addAddressBookEntry(currentLabel, currentAddress)
      setCurrentLabel('')
      setCurrentAddress('')
      setAddButtonEnabled(false)
    }
  }, [currentLabel, currentAddress, addButtonEnabled])

  const { labelError, addressIsValid } = validate(currentLabel, currentAddress)

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
        onChange={updateLabel}
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
        onChange={updateAddress}
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
