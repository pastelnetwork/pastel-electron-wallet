import './Root.css'

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components/macro'

import { PastelModal } from '../../features/pastelModal'
import UpdateToast from '../../features/updateToast'
import Routes from '../../common/routes/Routes'
import { theme } from '../../common/theme'

const Root = (): JSX.Element => {
  /**
   * TODO
   * Make redux flow for the logged used and avoid passing props
   */

  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
      <PastelModal />
      <UpdateToast />
    </ThemeProvider>
  )
}

export default Root
