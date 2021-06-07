module.exports = {
  purge: [
    './src/**/*.ts',
    './src/**/*.tsx',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.html',
  ],
  theme: {
    screens: {
      sm: '900px',
      md: '1100px',
      lg: '1300px',
      xl: '1440px',
      '2xl': '1700px',
    },
    fontFamily: {
      body: 'Avenir, Roboto, Arial, Helvetica, Helvetica Neue, serif',
    },
    extend: {
      spacing: {
        '1px': '0.0625rem',
        '1.5px': '0.09375rem',
        '2px': '0.125rem',
        '2.5px': '0.15625rem',
        '3px': '0.188rem',
        '6px': '0.375rem',
        '9px': '0.5625rem',
        '10px': '0.625rem',
        '8px': '0.188rem',
        '13px': '0.813rem',
        '14px': '0.875rem',
        '15px': '0.938rem',
        '17px': '1.0625rem',
        '18px': '1.125rem',
        '22px': '1.375rem',
        '26px': '1.625rem',
        '27px': '1.688rem',
        '28px': '1.75rem',
        '30px': '1.875rem',
        '32px': '2rem',
        '35px': '2.1875rem',
        '36px': '2.25rem',
        '37px': '2.3125rem',
        '40px': '2.5rem',
        '41px': '2.5625rem',
        '41.5px': '2.59375rem',
        '46px': '2.875rem',
        '50px': '3.125rem',
        '54px': '3.375rem',
        '60px': '3.75rem',
        '63px': '3.938rem',
        '66px': '4.125rem',
        '68px': '4.25rem',
        '69px': '4.313rem',
        '70px': '4.375rem',
        '82px': '5.125rem',
        '100px': '6.25rem',
        '110px': '6.875rem',
        '111px': '6.9375rem',
        '112px': '7rem',
        '120px': '7.5rem',
        '190px': '11.875rem',
        '220px': '13.75rem',
        '230px': '14.375rem',
        '300px': '18.75rem',
        '315px': '19.6875rem',
        '335px': '20.938rem',
        '352px': '22rem',
        30: '7.5rem',
      },
      boxShadow: {
        xs:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 32px 40px rgba(10, 22, 70, 0.12)',
        sm:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 3px 3px rgba(10, 22, 70, 0.1)',
        md:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 6px 8px rgba(10, 22, 70, 0.1)',
        lg:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 16px 16px rgba(10, 22, 70, 0.1)',
        xl:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 32px 40px rgba(10, 22, 70, 0.12)',
        editbox:
          '0px 1px 12pxrgba(50, 50, 71, 0.04), 0px 0px 4px rgba(50, 50, 71, 0.2)',
      },
      colors: {
        success: {
          default: '#00D097',
          pressed: '#00B282',
          hover: '#00C28D',
          background: '#E0F9F2',
        },
        warning: {
          default: '#FA9501',
          pressed: '#E88A00',
          hover: '#FFA21B',
          background: '#FEF0DC',
        },
        error: {
          default: '#DA8AB8',
          pressed: '#C85195',
          hover: '#CE64A1',
          background: '#FAEFF5',
        },
        blue: {
          450: '#3F9AF7',
          '3f': '#3F9AF7',
        },
        gray: {
          // text
          a0: '#A0AEC0',
          71: '#718096',
          '4a': '#4A5568',
          '2d': '#2D3748',
          '1a': '#1A202C',
          // --
          f9: '#F9FAFB',
          f8: '#F8F9FA',
          f7: '#F7F8F9',
          fc: '#FCFCFD',
          f3: '#F3F3F3',
          eb: '#EBEBFC',
          e7: '#E7EAF2',
          e6: '#E6E8EC',
          dd: '#DDE0E3',
          b0: '#B0B7C3',
          110: '#F2F2F2',
          35: '#353941',
          33: '#334D6E',
          '2d': '#2D3748',
          23: '#23272F',
          '1f': '#1F1F39',
          '1d': '#1D263A',
          14: '#141416',
          23: '#23262F',
        },
        red: {
          '7a': '#FF7A00',
          ef: '#FFEFEB',
        },
        yellow: {
          ff: '#FFBE3D',
        },
        button: {
          pressed: '#0E80F5',
          hover: '#278DF6',
          text: '#8E98A3',
        },
        navigation: {
          default: '#A6B0C2',
          selected: '#334D6E',
          background: '#E6E8EC',
        },
        tab: {
          active: '#353945',
          hover: '#F4F5F6',
        },
        line: {
          default: '#F2F4F7',
        },
        icon: {
          default: '#8E98A3',
          active: '#334D6E',
        },
        background: {
          onboarding: '#FCFCFD',
          main: '#F8F9FA',
          modal: '#1A1A1A',
        },
      },
      boxShadow: {
        xs:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 1px 1px rgba(10, 22, 70, 0.1)',
        sm:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 3px 3px rgba(10, 22, 70, 0.1)',
        md:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 6px 8px rgba(10, 22, 70, 0.1)',
        lg:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 16px 16px rgba(10, 22, 70, 0.1)',
        xl:
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 32px 40px rgba(10, 22, 70, 0.12)',
      },
      fontSize: {
        h1: '2rem',
        h2: '1.5rem',
        h3: '1.375rem',
        h4: '1.125rem',
        h5: '1rem',
        h6: '0.875rem',
        10: '0.625rem',
        12: '0.75rem',
        15: '0.938rem',
        26: '1.625rem',
        '9px': '0.5625rem',
        32: '2rem',
      },
      borderRadius: {
        '4px': '0.25rem',
      },
      borderWidth: {
        '5px': '0.3125rem',
      },
      lineHeight: {
        '11px': '0.6875rem',
      },
      container: {
        center: true,
      },
      maxHeight: {
        700: '43rem',
      },
    },
  },
  variants: {
    extend: {
      contrast: ['hover', 'focus'],
    },
  },
  plugins: [],
}
