import React, { Component } from "react";
import {
  passwordStrength,
  TPasswordStrengthResult,
} from "check-password-strength";
import { v4 as uid } from "uuid";
import Select from "../../components/Select";
import styles from "./PastelID.module.css";
import cstyles from "../../components/Common.module.css";
import List from "../../components/List";
import ListItem from "../../components/ListItem";
import LoadingOverlay from "../../components/LoadingOverlay";
import { TPastelID } from "./pastelIDSlice";

function passphraseStatusColor(validation: TPasswordStrengthResult) {
  const colors = [cstyles.red, cstyles.yellow, cstyles.yellow, cstyles.green];

  if (!colors[validation.id]) {
    return cstyles.red;
  }

  return colors[validation.id];
}

type Props = {
  addressesWithBalance: Array<string>;
  pastelIDs: Array<TPastelID>;
  getPastelIDs: () => any;
  createNewAddress: (v: boolean) => any;
  createNewPastelID: (a: string) => any;
};

type State = {
  passphrase: string;
  selectedAddress: {
    value: string;
    label: string;
  };
  loading: boolean;
  passphraseValidation: TPasswordStrengthResult;
};

export default class PastelID extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      passphrase: "",
      selectedAddress: {
        value: "",
        label: "",
      },
      loading: false,
      passphraseValidation: {
        id: 0,
        value: "Too weak",
      },
    };
  }

  componentDidMount(): void {
    const { getPastelIDs } = this.props;
    getPastelIDs();
  }

  onPassphraseChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const passphrase = e.target.value;
    const validation = passwordStrength(passphrase);
    this.setState({
      passphrase,
      passphraseValidation: validation,
    });
  }

  onAddressChange(selectedAddress: { value: string; label: string }): void {
    this.setState({
      selectedAddress,
    });
  }

  async onCreate(): Promise<void> {
    try {
      const { passphrase, selectedAddress } = this.state;
      const { createNewAddress, createNewPastelID } = this.props;

      if (!this.valid) {
        return;
      }

      this.setState({
        loading: true,
      });

      if (!selectedAddress) {
        const newAddress = await createNewAddress(false);
        const newSelectedAddress = {
          value: newAddress,
          label: newAddress,
        };
        this.setState({
          selectedAddress: newSelectedAddress,
        });
      }

      await createNewPastelID(passphrase);
      this.setState({
        loading: false,
      });
    } catch (e) {
      // TODO log errors to a central logger so we can address them later.
      console.warn(e);
    }
  }

  get valid(): boolean {
    const { passphraseValidation } = this.state;
    return passphraseValidation.id === 3; // Strong
  }

  render(): JSX.Element {
    const { addressesWithBalance, pastelIDs } = this.props;
    const { loading, passphraseValidation, passphrase } = this.state;
    return (
      <>
        <div
          className={[cstyles.xlarge, cstyles.padall, cstyles.center].join(" ")}
        >
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
                    <span
                      className={passphraseStatusColor(passphraseValidation)}
                    >
                      {passphraseValidation.value}
                    </span>
                  )}
                </div>
              </div>

              <input
                type="text"
                className={[cstyles.inputbox, cstyles.margintopsmall].join(" ")}
                onChange={this.onPassphraseChange.bind(this)}
                placeholder="Passphrase"
              />

              <div
                className={[cstyles.verticalflex, cstyles.margintoplarge].join(
                  " "
                )}
              >
                <div
                  className={[cstyles.sublight, cstyles.padbottomsmall].join(
                    " "
                  )}
                >
                  Select an address to pay for this PastelID. If no address is
                  selected, a new one will be created
                </div>
                <Select
                  styles
                  value
                  options={addressesWithBalance}
                  onChange={this.onAddressChange.bind(this)}
                />
              </div>

              <div className={cstyles.margintoplarge}>
                <button
                  type="button"
                  disabled={!this.valid}
                  className={[
                    cstyles.primarybutton,
                    cstyles.margintoplarge,
                    styles.button,
                  ].join(" ")}
                  onClick={this.onCreate.bind(this)}
                >
                  Create
                </button>
              </div>
            </div>
          </LoadingOverlay>

          {pastelIDs.length > 0 && (
            <List title="Pastel ID">
              {pastelIDs.map((item) => (
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
    );
  }
}
