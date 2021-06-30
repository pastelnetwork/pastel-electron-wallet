import React from 'react'
import Dropdown from './index'
import { Button } from '../Buttons'

export const DropdownDefault = (): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const toggleDropdown = () => setIsOpen(isOpen => !isOpen)

  return (
    <Dropdown
      isOpen={isOpen}
      handleClose={() => setIsOpen(false)}
      button={
        <Button variant='default' onClick={toggleDropdown}>
          Show
        </Button>
      }
      width='w-80'
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, iusto
        voluptate ipsum corporis eligendi expedita assumenda ab! Nam, ex quas?
        Corporis adipisci, quaerat maxime labore iste asperiores eaque earum
        nihil!
      </p>
    </Dropdown>
  )
}

export default {
  component: Dropdown,
  title: 'Dropdown',
}
