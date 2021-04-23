/* eslint-disable */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  AccordionItemButton,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  Accordion,
} from 'react-accessible-accordion'
import styles from './Addressbook.module.css'
import cstyles from './Common.module.css'
import { AddressBookEntry } from './AppState'
import ScrollPane from './ScrollPane'
import routes from '../constants/routes.json' // Internal because we're using withRouter just below
import PastelAddressBookForm from '../../features/pastelAddressBookForm'

const AddressBookItemInteral = ({
  item,
  removeAddressBookEntry,
  setSendTo,
  history,
}: any) => {
  return (
    <AccordionItem
      key={item.label}
      className={[cstyles.well, cstyles.margintopsmall].join(' ')}
      uuid={item.label}
    >
      <AccordionItemHeading>
        <AccordionItemButton className={cstyles.accordionHeader}>
          <div className={[cstyles.flexspacebetween].join(' ')}>
            <div>{item.label}</div>
            <div>{item.address}</div>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div
          className={[cstyles.well, styles.addressbookentrybuttons].join(' ')}
        >
          <button
            type='button'
            className={cstyles.primarybutton}
            onClick={() => {
              // @ts-ignore
              setSendTo(new PastelURITarget(item.address, null, null))
              history.push(routes.SEND)
            }}
          >
            Send To
          </button>
          <button
            type='button'
            className={cstyles.primarybutton}
            onClick={() => removeAddressBookEntry(item.label)}
          >
            Delete
          </button>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  )
}

const AddressBookItem = withRouter(AddressBookItemInteral)
export default class AddressBook extends Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const { addressBook, removeAddressBookEntry, setSendTo } = this.props

    return (
      <div>
        <div
          className={[cstyles.xlarge, cstyles.padall, cstyles.center].join(' ')}
        >
          Address Book
        </div>

        <div className={styles.addressbookcontainer}>
          <PastelAddressBookForm
            addressBook={addressBook}
            addAddressBookEntry={this.props.addAddressBookEntry}
          />

          <ScrollPane offsetHeight={300}>
            <div className={styles.addressbooklist}>
              <div
                className={[
                  cstyles.flexspacebetween,
                  cstyles.tableheader,
                  cstyles.sublight,
                ].join(' ')}
              >
                <div>Label</div>
                <div>Address</div>
              </div>
              {addressBook && (
                <Accordion>
                  {addressBook.map((item: any) => (
                    <AddressBookItem
                      key={item.label}
                      item={item}
                      removeAddressBookEntry={removeAddressBookEntry}
                      setSendTo={setSendTo}
                    />
                  ))}
                </Accordion>
              )}
            </div>
          </ScrollPane>
        </div>
      </div>
    )
  }
}
