module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: [],
  theme: {
    extend: {
      color: {
        text: {
          gray500: '#A0AEC0',
          gray600: '#718096',
          gray700: '#4A5568',
          gray800: '#2D3748',
          gray900: '#1A202C',
          link: '#3F9AF7',
        },
        success: {
          DEFAULT: '#00D097',
          pressed: '#00B282',
          hover: '#00C28D',
          background: '#E0F9F2',
        },
        warning: {
          DEFAULT: '#FA9501',
          pressed: '#E88A00',
          hover: '#FFA21B',
          background: '#FEF0DC',
        },
        error: {
          DEFAULT: '#DA8AB8',
          pressed: '#C85195',
          hover: '#CE64A1',
          background: '#FAEFF5',
        },
        button: {
          DEFAULT: '#3F9AF7',
          pressed: '#0E80F5',
          hover: '#278DF6',
          background: '#F2F2F2',
          text: '#8E98A3',
        },
        navigation: {
          DEFAULT: '#A6B0C2',
          selected: '#334D6E',
          background: '#E6E8EC',
        },
        tab: {
          active: '#353945',
          hover: '#F4F5F6',
        },
        line: {
          DEFAULT: '#F2F4F7',
        },
        icon: {
          DEFAULT: '#8E98A3',
          active: '#334D6E',
        },
        background: {
          onboarding: '#FCFCFD',
          main: '#F8F9FA',
          modal: '#1A1A1A',
        },
      },
      boxShadow: {
        xSmall:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 32px 40px rgba(10, 22, 70, 0.12)',
        small:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 3px 3px rgba(10, 22, 70, 0.1)',
        medium:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 6px 8px rgba(10, 22, 70, 0.1)',
        large:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 16px 16px rgba(10, 22, 70, 0.1)',
        xLarge:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 32px 40px rgba(10, 22, 70, 0.12)',
      },
      fontSize: {
        h1: '2rem',
        h2: '1.5rem',
        h3: '1.375',
        h4: '1.125',
        h5: '1rem',
        h6: '0.875rem',
      },
    },
    screens: {
      sm: '414px',
      md: '834px',
      lg: '874px',
      xl: '946px',
      '2xl': '1440px',
    },
  },
  variants: {},
  plugins: [],
}

// colors: {
//   text: {
//     500: '#A0AEC0',
//     600: '#718096',
//     700: '#4A5568',
//     800: '#2D3748',
//     900: '#1A202C',
//     link: '#3F9AF7',
//   },
//   success: {
//     DEFAULT: '#00D097',
//     pressed: '#00B282',
//     hover: '#00C28D',
//     bg: '#00C28D',
//   },
//   warning: {
//     DEFAULT: '#FA9501',
//     pressed: '#E88A00',
//     hover: '#FFA21B',
//     bg: '#FEF0DC',
//   },
//   error: {
//     DEFAULT: '#DA8AB8',
//     pressed: '#C85195',
//     hover: '#CE64A1',
//     bg: '#FAEFF5',
//   },
// },
