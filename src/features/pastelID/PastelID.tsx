import {
  passwordStrength,
  TPasswordStrengthResult,
} from 'check-password-strength'
import React, { useCallback, useEffect, useState } from 'react'
import { v4 as uid } from 'uuid'
import log from 'electron-log'

import { useCurrencyName } from '../../common/hooks/appInfo'
import LoadingOverlay from '../../legacy/components/LoadingOverlay'
import cstyles from '../../legacy/components/Common.module.css'
import List from '../../legacy/components/List'
import ListItem from '../../legacy/components/ListItem'
import Select from '../../legacy/components/Select'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { openPastelModal } from '../pastelModal'
import styles from './PastelID.module.css'
import { createPastelID, fetchPastelIDs } from './pastelIDSlice'

function passphraseStatusColor(validation: TPasswordStrengthResult) {
  const colors = [cstyles.red, cstyles.yellow, cstyles.yellow, cstyles.green]

  if (!colors[validation.id]) {
    return cstyles.red
  }

  return colors[validation.id]
}

type TAddressesWithBalanceProps = {
  address: string
  balance: number
}

type TotalBalanceProps = {
  total: string
}

export type PastelIDProps = {
  addressesWithBalance: Array<TAddressesWithBalanceProps>
  createNewAddress: (v: boolean) => Promise<string>
  totalBalance: TotalBalanceProps
}

type TSelectedAddress = {
  value: string
  label: string
  address?: string
  balance?: number
}

function PastelID(props: PastelIDProps): JSX.Element {
  const currencyName = useCurrencyName()
  const { addressesWithBalance, createNewAddress, totalBalance } = props
  const [passphraseValidation, setPassphraseValidation] = useState({
    id: 0,
    value: 'Too weak',
  })

  const [passphrase, setPassphrase] = useState('')
  const [selectedAddress, setSelectedAddress] = useState({
    value: '',
    label: 'Select an address',
  })

  const { loading, pastelIDs } = useAppSelector(state => state.pastelID)

  const dispatch = useAppDispatch()

  // fetch pastel ids
  useEffect(() => {
    dispatch(fetchPastelIDs())
  }, [])

  const onPassphraseChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passphrase = e.target.value
      const validation = passwordStrength(passphrase)

      setPassphrase(passphrase)
      setPassphraseValidation(validation)
    },
    [passphrase, passphraseValidation],
  )

  const onAddressChange = useCallback(
    (selectedAddress: TSelectedAddress) => {
      setSelectedAddress(selectedAddress)
    },
    [selectedAddress],
  )

  function valid(): boolean {
    return (
      parseFloat(totalBalance.total) >= 1000 && passphraseValidation.id === 3
    )
  }

  const onCreate = useCallback(async () => {
    try {
      if (!valid()) {
        return
      }
      let address: string = selectedAddress?.value
      if (!selectedAddress || !selectedAddress.value) {
        const newAddress = await createNewAddress(false)
        const newSelectedAddress = {
          value: newAddress,
          label: newAddress,
        }
        address = newAddress
        setSelectedAddress(newSelectedAddress)
      }

      dispatch(createPastelID(passphrase, address))
    } catch (error) {
      dispatch(
        openPastelModal({
          title: 'Error',
          body: [
            'Can not create a new Pastel address. Please try again later.',
          ],
        }),
      )

      // TODO log errors to a central logger so we can address them later.
      log.warn(error)
    }
  }, [])

  const passphraseColor = passphraseStatusColor(
    passphraseValidation as TPasswordStrengthResult,
  )

  function getAddressBalanceOption(balance: number) {
    if (balance < 0) {
      return ''
    }

    return `[ ${currencyName} ${balance}] `
  }

  function generatedAddressesWithBalanceOptions() {
    if (!addressesWithBalance || addressesWithBalance.length < 1) {
      return [
        {
          label: '',
          value: '',
          address: '',
          balance: 0,
        },
      ]
    }

    const defaultOption = [
      {
        value: '',
        label: 'Select an address',
        address: '',
        balance: 0,
      },
    ]

    const addressesOptions = addressesWithBalance.map(
      (item: TAddressesWithBalanceProps) => ({
        ...item,
        label: `${getAddressBalanceOption(item.balance)}${item.address}`,
        value: item.address,
      }),
    )

    return defaultOption.concat(addressesOptions)
  }

  const renderCreateButton = () => (
    <div className={cstyles.margintoplarge}>
      <button
        type='button'
        disabled={!valid()}
        className={`${cstyles.primarybutton} ${cstyles.margintoplarge} ${styles.button}`}
        onClick={onCreate}
      >
        Create
      </button>
      <p className={[cstyles.sublight, styles.note].join(' ')}>
        Note: You will need 1,000 {currencyName} coins to write this ticket to
        the blockchain.
      </p>
    </div>
  )

  const renderSelectAddress = () => (
    <div className={`${cstyles.verticalflex} ${cstyles.margintoplarge}`}>
      <div className={`${cstyles.sublight} ${cstyles.padbottomsmall}`}>
        Select an address to pay for this PastelID. If no address is selected, a
        new one will be created
      </div>
      <Select
        styles
        value={selectedAddress}
        options={generatedAddressesWithBalanceOptions()}
        onChange={onAddressChange}
        placeholder='Select an address'
      />
    </div>
  )

  const renderPastelIDInfo = () => (
    <div className={cstyles.flexspacebetween}>
      <div className={cstyles.sublight}>
        Enter a secure passphrase for this PastelID
      </div>
      <div className={cstyles.validationerror}>
        {passphrase && (
          <span className={passphraseColor}>{passphraseValidation.value}</span>
        )}
      </div>
    </div>
  )

  const renderLoadingOverlay = () => (
    <LoadingOverlay loading={loading}>
      <div className={cstyles.well}>
        {renderPastelIDInfo()}
        <input
          type='text'
          className={`${cstyles.inputbox} ${cstyles.margintopsmall}`}
          onChange={onPassphraseChange}
          placeholder='Passphrase'
        />
        {renderSelectAddress()}
        {renderCreateButton()}
      </div>
    </LoadingOverlay>
  )

  return (
    <>
      <div className={`${cstyles.xlarge} ${cstyles.padall} ${cstyles.center}`}>
        PastelID
      </div>
      <div className={styles.container}>
        {renderLoadingOverlay()}

        {pastelIDs.length > 0 && (
          <List title='PastelID'>
            {pastelIDs.map(item => (
              <ListItem buttons={false} key={uid()} title={item.pastelid} />
            ))}
          </List>
        )}

        {pastelIDs.length === 0 && (
          <div className={cstyles.margintoplarge}>
            There are currently no PastelIDs generated.
          </div>
        )}
      </div>
    </>
  )
}

export default PastelID
