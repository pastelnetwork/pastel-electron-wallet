module.exports = {
  purge: [
    './src/**/*.ts',
    './src/**/*.tsx',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.html',
  ],
  prefix: 'psl-',
  theme: {
    screens: {
      sm: '900px',
      md: '1100px',
      lg: '1300px',
      xl: '1440px',
      '2xl': '1700px',
    },
    fontFamily: {
      body: 'Roboto, Arial, Helvetica, Helvetica Neue, serif',
    },
    extend: {
      spacing: {
        '2px': '2px',
        '4px': '4px',
        '6px': '6px',
        '8px': '8px',
        '13px': '13px',
        '14px': '14px',
        '15px': '15px',
        '16px': '16px',
        '18px': '18px',
        '20px': '20px',
        '26px': '26px',
        '28px': '28px',
        '30px': '30px',
        '35px': '35px',
        '36px': '36px',
        '37px': '37px',
        '40px': '40px',
        '41px': '41px',
        '46px': '46px',
        '50px': '50px',
        '60px': '60px',
        '66px': '66px',
        '68px': '68px',
        '111px': '111px',
        '112px': '112px',
        '300px': '300px',
        '352px': '352px',
        30: '7.5rem',
      },
      colors: {
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
        blue: {
          450: '#3F9AF7',
        },
        gray: {
          a0: '#A0AEC0',
          '4a': '#4A5568',
          '1a': '#1A202C',
          110: '#F2F2F2',
          f7: '#F7F8F9',
          b0: '#B0B7C3',
          e6: '#E6E8EC',
          71: '#718096',
          35: '#353941',
          '2d': '#2D3748',
          14: '#141416',
        },
        button: {
          pressed: '#0E80F5',
          hover: '#278DF6',
          text: '#8E98A3',
        },
        navigation: {
          DEFAULT: '#A6B0C2',
          selected: '#334D6E',
        },
        tab: {
          active: '#353945',
          hover: '#F4F5F6',
        },
        line: {
          DEFAULT: '#F2F4F7',
        },
        background: {
          onboarding: '#FCFCFD',
          main: '#F8F9FA',
          modal: '#1A1A1A',
        },
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
      },
      fontSize: {
        h1: '2rem',
        h2: '1.5rem',
        h3: '1.375',
        h4: '1.125',
        h5: '1rem',
        h6: '0.875rem',
        15: '0.938rem',
      },
      borderRadius: {
        '4px': '4px',
      },
    },
  },
  variants: {},
  plugins: [],
}
