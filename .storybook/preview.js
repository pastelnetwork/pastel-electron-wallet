import '!style-loader!css-loader!postcss-loader!../src/index.css'
import '!style-loader!css-loader!postcss-loader!simplebar/src/simplebar.css'

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
