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
      spacing: {
        '3px': '3px',
        '18px': '18px',
        '30px': '30px',
        '40px': '40px',
        '60px': '60px',
        '70px': '70px',
        '220px': '220px',
        '250px': '250px',
        '300px': '300px',
        '335px': '335px',
        '386px': '386px',
        '419px': '419px',
        30: '7.5rem',
      },
      colors: {
        gray: {
          f8: '#F8F9FA',
          f7: '#F7F8F9',
          e7: '#E7EAF2',
          e6: '#E6E8EC',
          b0: '#B0B7C3',
          a0: '#A0AEC0',
          71: '#718096',
          '4a': '#4A5568',
          35: '#353941',
          33: '#334D6E',
          '2d': '#2D3748',
          '1d': '#1D263A',
          14: '#141416',
        },
        blue: {
          '3f': '#3F9AF7',
        },
        green: {
          38: '#38CB89',
          e5: '#E5F7EF',
        },
        red: {
          '7a': '#FF7A00',
          ef: '#FFEFEB',
        },
      },
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
        '2px':
          '0px 1px 2px rgba(50, 50, 71, 0.08), 0px 0px 1px rgba(50, 50, 71, 0.2)',
        '16px':
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 16px 16px rgba(10, 22, 70, 0.1)',
        '30px': '0px 4px 30px rgba(48, 64, 106, 0.1)',
        '44px': '0px 23px 44px rgba(176, 183, 195, 0.14)',
      },
      fontSize: {
        h1: '2rem',
        h2: '1.5rem',
        h3: '1.375',
        h4: '1.125',
        h5: '1rem',
        h6: '0.875rem',
      },
      colors: {
        blue: {
          450: '#3F9AF7',
        },
        gray: {
          110: '#F2F2F2',
          350: 'B0B7C3',
        },
      },
    },
    screens: {
      sm: '900px',
      md: '1100px',
      lg: '1300px',
      xl: '1440px',
      '2xl': '1700px',
    },
    margin: {
      2: '2px',
      8: '8px',
      13: '13px',
      15: '15px',
      20: '20px',
      26: '26px',
      28: '28px',
      30: '30px',
      35: '35px',
      37: '37px',
      40: '40px',
      50: '50px',
      60: '60px',
      68: '68px',
    },
    height: {
      20: '20px',
      30: '30px',
      36: '36px',
      66: '66px',
      41: '41px',
    },
    padding: {
      46: '46px',
    },
    width: {
      20: '20px',
      30: '30px',
      36: '36px',
      300: '300px',
      352: '352px',
    },
    top: {
      13: '13px',
    },
    left: {
      20: '20px',
    },
    fontSize: {
      16: '16px',
      15: '15px',
      14: '14px',
    },
  },
  variants: {},
  plugins: [],
}
