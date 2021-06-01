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
      body: 'Avenir, Roboto, Arial, serif',
    },
    extend: {
      spacing: {
        //2px: 0.5 default
        '3px': '0.188rem',
        //4px: 1 default
        //6px: 1.5 default
        //8px: 2 default
        //10px: 2.5 default
        '11px': '0.688rem',
        //12px: 3 default
        '13px': '0.813rem',
        //14px: 3.5 default
        '15px': '0.938rem',
        //16px: 4 default
        '18px': '1.125rem',
        '19px': '1.188rem',
        //20px: 5 default
        '21px': '1.313rem',
        '22px': '1.375rem',
        //24px: 6 default
        '25px': '1.563rem',
        '26px': '1.625rem',
        '27px': '1.688rem',
        //28px: 7 default
        '30px': '1.875rem',
        '31px': '1.938rem',
        //32px: 8 default
        '34px': '2.215rem',
        '35px': '2.188rem',
        //36px: 9 default
        '37px': '2.313rem',
        '38px': '2.375rem',
        //40px: 10 default
        '41px': '2.563rem',
        //44px: 11 default
        '46px': '2.875rem',
        //48px: 12 default
        '50px': '3.125rem',
        //56px: 14 default
        '58px': '3.625rem',
        '59px': '3.688rem',
        '60px': '3.75rem',
        //64px: 16 default
        '66px': '4.125rem',
        '67px': '4.188rem',
        '68px': '4.25rem',
        '70px': '4.375rem',
        '75px': '4.688rem',
        //80px: 20 default
        '82px': '5.125rem',
        '86px': '5.375rem',
        '87px': '5.438rem',
        '92px': '5.75rem',
        //96px: 24 default
        '111px': '6.938rem',
        //112px: 28 default
        '117px': '7.313rem',
        '124px': '7.75rem',
        //128px: 32 default
        //144px: 36 default
        //160px: 40 default
        //176px: 44 default
        //192px: 48 default
        //208px: 52 default
        '220px': '13.75rem',
        //224px: 56 default
        //240px: 60 default
        '247px': '15.438rem',
        //256px: 64 default
        //288px: 72 default
        '300px': '18.75rem',
        //320px: 80 default
        '335px': '20.938rem',
        '352px': '22rem',
        '371px': '23.1875rem',
        //384px: 96 default
        '427px': '26.688rem',
        '456px': '28.5rem',
        '553px': '34.563rem',
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
          '3f': '#3F9AF7',
        },
        gray: {
          f8: '#F8F9FA',
          f7: '#F7F8F9',
          e7: '#E7EAF2',
          e6: '#E6E8EC',
          b0: '#B0B7C3',
          a0: '#A0AEC0',
          71: '#718096',
          '4a': '#4A5568',
          '1a': '#1A202C',
          110: '#F2F2F2',
          35: '#353941',
          33: '#334D6E',
          '2d': '#2D3748',
          '1d': '#1D263A',
          14: '#141416',
          '4e': '#4E5D78',
          93: '#939EAB',
          57: '#57657B',
        },
        red: {
          '7a': '#FF7A00',
          ef: '#FFEFEB',
        },
        button: {
          pressed: '#0E80F5',
          hover: '#278DF6',
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
        input:
          '0px 1px 2px rgba(50, 50, 71, 0.08), 0px 0px 1px rgba(50, 50, 71, 0.2)',
        textbox: '0px 64px 64px -48px rgba(31, 47, 70, 0.12)',
      },
      fontSize: {
        h1: '2rem',
        h2: '1.5rem',
        h3: '1.375em',
        h4: '1.125',
        h5: '1rem',
        h6: '0.875rem',
        15: '0.938rem',
      },
      borderRadius: {
        '4px': '0.25rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
