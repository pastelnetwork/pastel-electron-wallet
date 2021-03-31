import React, { useEffect, useState } from 'react'
import {
  passwordStrength,
  TPasswordStrengthResult,
} from 'check-password-strength'
import { v4 as uid } from 'uuid'
import Select from '../../components/Select'
import styles from './PastelID.module.css'
import cstyles from '../../components/Common.module.css'
import List from '../../components/List'
import ListItem from '../../components/ListItem'
import LoadingOverlay from '../../components/LoadingOverlay'
import { createPastelID, fetchPastelIDs, TPastelID } from './pastelIDSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { openErrorModal } from '../errorModal'

function passphraseStatusColor(validation: TPasswordStrengthResult) {
  const colors = [cstyles.red, cstyles.yellow, cstyles.yellow, cstyles.green]

  if (!colors[validation.id]) {
    return cstyles.red
  }

  return colors[validation.id]
}

type Props = {
  addressesWithBalance: Array<string>
  pastelIDs: Array<TPastelID>
  createNewAddress: (v: boolean) => any
}

type TSelectedAddress = {
  value: string
  label: string
}

function PastelID(props: Props): JSX.Element {
  const { addressesWithBalance, createNewAddress } = props

  const [passphraseValidation, setPassphraseValidation] = useState({
    id: 0,
    value: 'Too weak',
  })

  const [passphrase, setPassphrase] = useState('')
  const [selectedAddress, setSelectedAddress] = useState({
    value: '',
    label: '',
  })

  const { loading, pastelIDs } = useAppSelector(state => state.pastelID)
  const pastelConfig = useAppSelector(state => state.pastelConf)

  const dispatch = useAppDispatch()

  // fetch pastel ids
  useEffect(() => {
    dispatch(fetchPastelIDs(pastelConfig))
  }, [])

  function onPassphraseChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const passphrase = e.target.value
    const validation = passwordStrength(passphrase)

    setPassphrase(passphrase)
    setPassphraseValidation(validation)
  }

  function onAddressChange(selectedAddress: TSelectedAddress): void {
    setSelectedAddress(selectedAddress)
  }

  async function onCreate(): Promise<void> {
    try {
      if (!valid()) {
        return
      }

      if (!selectedAddress) {
        const newAddress = await createNewAddress(false)
        const newSelectedAddress = {
          value: newAddress,
          label: newAddress,
        }
        setSelectedAddress(newSelectedAddress)
      }

      dispatch(createPastelID(passphrase, pastelConfig))
    } catch (error) {
      dispatch(
        openErrorModal({
          title: 'Error',
          body: 'Can not create a new Pastel address. Please try again later.',
        }),
      )

      // TODO log errors to a central logger so we can address them later.
      console.warn(error)
    }
  }

  const passphraseColor = passphraseStatusColor(
    passphraseValidation as TPasswordStrengthResult,
  )

  function valid(): boolean {
    return passphraseValidation.id === 3 // Strong
  }

  return (
    <>
      <div className={`${cstyles.xlarge} ${cstyles.padall} ${cstyles.center}`}>
        Pastel ID
      </div>
      <div className={styles.container}>
        <LoadingOverlay loading={loading}>
          <div className={cstyles.well}>
            <div className={cstyles.flexspacebetween}>
              <div className={cstyles.sublight}>
                Enter a secure passphrase for this Pastel ID
              </div>
              <div className={cstyles.validationerror}>
                {passphrase && (
                  <span className={passphraseColor}>
                    {passphraseValidation.value}
                  </span>
                )}
              </div>
            </div>

            <input
              type='text'
              className={`${cstyles.inputbox} ${cstyles.margintopsmall}`}
              onChange={onPassphraseChange}
              placeholder='Passphrase'
            />

            <div
              className={`${cstyles.verticalflex} ${cstyles.margintoplarge}`}
            >
              <div className={`${cstyles.sublight} ${cstyles.padbottomsmall}`}>
                Select an address to pay for this PastelID. If no address is
                selected, a new one will be created
              </div>
              <Select
                styles
                value
                options={addressesWithBalance}
                onChange={onAddressChange}
              />
            </div>

            <div className={cstyles.margintoplarge}>
              <button
                type='button'
                disabled={!valid()}
                className={`${cstyles.primarybutton} ${cstyles.margintoplarge} ${styles.button}`}
                onClick={onCreate}
              >
                Create
              </button>
            </div>
          </div>
        </LoadingOverlay>

        {pastelIDs.length > 0 && (
          <List title='Pastel ID'>
            {pastelIDs.map(item => (
              <ListItem buttons={false} key={uid()} title={item.pastelid} />
            ))}
          </List>
        )}

        {pastelIDs.length === 0 && (
          <div className={cstyles.margintoplarge}>
            There are currently no Pastel IDs generated.
          </div>
        )}
      </div>
    </>
  )
}

export default PastelID
