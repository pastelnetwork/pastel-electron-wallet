/* eslint-disable */

import React from 'react'
import {
  AccordionItemButton,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { v4 as uid } from 'uuid'
import cstyles from './Common.module.css'
import styles from './ListItem.module.css'

const ListItem = ({ title, value, buttons }: any) => {
  return (
    <AccordionItem
      key={title}
      className={[cstyles.well, cstyles.margintopsmall].join(' ')}
      uuid={title}
    >
      <AccordionItemHeading>
        <AccordionItemButton className={cstyles.accordionHeader}>
          <div className={[cstyles.flexspacebetween].join(' ')}>
            <div>{title}</div>
            {value && <div>{value}</div>}
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      {buttons && (
        <AccordionItemPanel>
          <div className={[styles.listItemButtons].join(' ')}>
            {buttons.map((b: any) => (
              <button
                key={uid()}
                type='button'
                className={cstyles.primarybutton}
                onClick={b.onClick}
              >
                {b.title}
              </button>
            ))}
          </div>
        </AccordionItemPanel>
      )}
    </AccordionItem>
  )
}

ListItem.defaultProps = {
  value: '',
}
export default ListItem
