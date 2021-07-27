import '!style-loader!css-loader!postcss-loader!../src/index.css'
import '!style-loader!css-loader!postcss-loader!simplebar/src/simplebar.css'
import '!style-loader!css-loader!postcss-loader!react-datepicker/dist/react-datepicker.css'

import React from 'react'
import { addDecorator } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'

addDecorator(story => (
  <MemoryRouter initialEntries={['/']}>
    {story()}
    <ToastContainer hideProgressBar autoClose={3000} />
  </MemoryRouter>
))

document.body.style.background = 'white'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
