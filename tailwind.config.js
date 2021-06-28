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
      '1200px': '1200px',
      lg: '1300px',
      xl: '1440px',
      '1500px': '1500px',
      '2xl': '1700px',
    },
    fontFamily: {
      body: 'Avenir, Roboto, Arial, Helvetica, Helvetica Neue, serif',
      display: 'Poppins',
    },
    extend: {
      spacing: {
        '1.5px': '0.09375rem',
        '2.5px': '0.15625rem',
        '3px': '0.188rem',
        '5px': '0.3125rem',
        '6px': '0.375rem',
        '7px': '0.4375rem',
        '8px': '0.5rem',
        '9px': '0.5625rem',
        '10px': '0.625rem',
        '11px': '0.688rem',
        '12px': '0.75rem',
        '13px': '0.813rem',
        '14px': '0.875rem',
        '15px': '0.938rem',
        '17px': '1.0625rem',
        '18px': '1.125rem',
        '19px': '1.188rem',
        '21px': '1.313rem',
        '22px': '1.375rem',
        '23px': '1.438rem',
        '25px': '1.563rem',
        '26px': '1.625rem',
        '27px': '1.688rem',
        '29px': '1.813rem',
        '30px': '1.875rem',
        '31px': '1.938rem',
        '32px': '2rem',
        '33px': '2.0625rem',
        '34px': '2.215rem',
        '35px': '2.188rem',
        '37px': '2.313rem',
        '38px': '2.375rem',
        '40px': '2.5rem',
        '41px': '2.5625rem',
        '41.5px': '2.59375rem',
        '42px': '2.625rem',
        '46px': '2.875rem',
        '50px': '3.125rem',
        '54px': '3.375rem',
        '58px': '3.625rem',
        '59px': '3.688rem',
        '60px': '3.75rem',
        '61px': '3.8125rem',
        '63px': '3.938rem',
        '66px': '4.125rem',
        '67px': '4.188rem',
        '68px': '4.25rem',
        '70px': '4.375rem',
        '72px': '4rem',
        '75px': '4.688rem',
        '76px': '4.75rem',
        '78px': '4.875rem',
        '82px': '5.125rem',
        '86px': '5.375rem',
        '87px': '5.438rem',
        '88px': '5.5rem',
        '90px': '5.625rem',
        '92px': '5.75rem',
        '95px': '5.9375rem',
        '100px': '6.25rem',
        '101px': '6.313rem',
        '103px': '6.4375rem',
        '104px': '6.5rem',
        '110px': '6.875rem',
        '111px': '6.938rem',
        '112px': '7rem',
        '113px': '7.0625rem',
        '117px': '7.313rem',
        '118px': '7.375rem',
        '120px': '7.5rem',
        '124px': '7.75rem',
        '131px': '8.1875rem',
        '132px': '8.25rem',
        '139px': '8.6875rem',
        '141px': '8.8125rem',
        '142px': '8.875rem',
        '173px': '10.8125rem',
        '174px': '10.875rem',
        '176rem': '11rem',
        '180px': '11.25rem',
        '189px': '11.8125rem',
        '190px': '11.875rem',
        '191px': '11.9375rem',
        '196px': '12.25rem',
        '200px': '12.5rem',
        '205px': '12.813rem',
        '219px': '13.6875rem',
        '220px': '13.75rem',
        '223px': '13.9375rem',
        '230px': '14.375rem',
        '234px': '14.625rem',
        '239px': '14.9375rem',
        '244px': '15.25rem',
        '247px': '15.438rem',
        '262px': '16.375rem',
        '264px': '16.5rem',
        '270px': '16.875rem',
        '284px': '17.75rem',
        '300px': '18.75rem',
        '315px': '19.6875rem',
        '335px': '20.938rem',
        '348px': '21.75rem',
        '352px': '22rem',
        '360px': '22.5rem',
        '371px': '23.1875rem',
        '372px': '23.25rem',
        '380px': '23.75rem',
        '393px': '24.5625rem',
        '409px': '25.5625rem',
        '401px': '25.0625rem',
        '419px': '26.187rem',
        '427px': '26.688rem',
        '428px': '26.75rem',
        '432px': '27rem',
        '456px': '28.5rem',
        '478px': '29.875rem',
        '526px': '32.875rem',
        '540px': '33.75rem',
        '553px': '34.563rem',
        '594px': '37.125rem',
        '622px': '38.875rem',
        '608px': '38rem',
        '650px': '40.625rem',
        '690px': '43.125rem',
        '791px': '49.4375rem',
        '874px': '54.625rem',
      },
      colors: {
        link: '#3F9AF7',
        white: '#FFFFFF',
        transparent: 'transparent',
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
          '00': '#0054FE',
          '3f': '#3F9AF7',
          f8: '#F8FBFF',
          e5: '#E5F1FF',
          eb: '#EBF2FF',
        },
        gray: {
          fc: '#FCFCFD',
          f9: '#F9FAFB',
          f8: '#F8F9FA',
          f7: '#F7F8F9',
          f4: '#F4F5F6',
          f3: '#F3F3F3',
          f2: '#F2F2F2',
          ed: '#EDEEF1',
          eb: '#EBEBFC',
          e7: '#E7EAF2',
          e6: '#E6E8EC',
          e4: '#E4E4E4',
          e1: '#E1E4E8',
          dd: '#DDE0E3',
          cd: '#CDD2DB',
          b0: '#B0B7C3',
          a6: '#A6B0C2',
          a0: '#A0AEC0',
          93: '#939EAB',
          '8e': '#8E98A3',
          80: '#808191',
          77: '#777E91',
          71: '#718096',
          57: '#57657B',
          '4e': '#4E5D78',
          '4a': '#4A5568',
          42: '#425466',
          35: '#353941',
          33: '#334D6E',
          '2d': '#2D3748',
          26: '#a6b0c226',
          23: '#23262F',
          '1f': '#1F1F39',
          '1d': '#1D263A',
          '1b': '#1B2942',
          '1a': '#1A202C',
          14: '#141416',
          11: '#11142D',
        },
        // For red, pink and orange first two chars can overlap, so identifying by middle pair
        red: {
          '7a': '#FF7A00',
          ef: '#FFEFEB',
          14: '#14B85F',
          fe: '#FE634C',
          75: '#FF754C',
        },
        pink: {
          46: '#EF466F',
          61: '#f56185',
          '6f': '#EF466F',
        },
        orange: {
          81: '#E98160',
          63: '#FE634C',
          75: '#FF754C',
        },
        yellow: {
          ff: '#FFBE3D',
          e9: '#E9DB60',
        },
        green: {
          e5: '#E5F6EF',
          '6d': '#6DBD72',
          62: '#62CA76',
          68: '#68CC67',
          45: '#45B36B',
          38: '#38CB89',
        },
        button: {
          DEFAULT: '#3F9AF7',
          pressed: '#0E80F5',
          hover: '#278DF6',
          background: '#F2F2F2',
          text: '#8E98A3',
          hoverAlt: '#F0F7FE',
          pressedAlt: '#E7F2FD',
        },
        input: {
          border: '#8E98A333',
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
        primary: {
          DEFAULT: '#6C5DD3',
        },
        text: {
          DEFAULT: '#171F46',
          23: '#23262F',
          77: '#777E90',
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
        'depth-1': '0px 8px 16px -8px rgba(15, 15, 15, 0.2)',
        '2px':
          '0px 1px 2px rgba(50, 50, 71, 0.08), 0px 0px 1px rgba(50, 50, 71, 0.2)',
        '4px':
          '0px 1px 12px rgba(50, 50, 71, 0.04), 0px 0px 4px rgba(50, 50, 71, 0.2)',
        '16px':
          '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 16px 16px rgba(10, 22, 70, 0.1)',
        '30px': '0px 4px 30px rgba(48, 64, 106, 0.1)',
        '44px': '0px 23px 44px rgba(176, 183, 195, 0.14)',
        '64px': '0px 32px 64px 0px rgba(31, 47, 70, 0.12)',
        input:
          '0 1px 12px rgba(50, 50, 71, 0.008), 0 0 4px rgba(50, 50, 71, 0.04)',
        textbox: '0px 64px 64px -48px rgba(31, 47, 70, 0.12)',
      },
      fontSize: {
        h1: '2rem',
        h2: '1.5rem',
        h3: '1.375rem',
        h4: '1.125rem',
        h5: '1rem',
        h6: '0.875rem',
        '9px': '0.5625rem',
        '10px': '0.625rem',
        '12px': '0.75rem',
        '13px': '0.8125rem',
        '14px': '0.875rem',
        '15px': '0.938rem',
        '26px': '1.625rem',
        '32px': '2rem',
      },
      fontWeight: {
        roman: '400',
        medium: '500',
        heavy: '800',
      },
      borderRadius: {
        '4px': '0.25rem',
        '8px': '0.5rem',
        '11px': '0.6875rem',
        '65px': '4.063rem',
      },
      borderWidth: {
        '1px': '0.0625rem',
        '3px': '0.1875rem',
        '5px': '0.3125rem',
      },
      lineHeight: {
        '11px': '0.6875rem',
        '15px': '0.938rem',
        '19px': '1.1875',
      },
      minHeight: {
        '78px': '4.875rem',
        '672px': '42rem',
      },
      maxWidth: {
        '32px': '2rem',
        '118px': '7.375rem',
        '244px': '15.25rem',
        '278px': '17.375rem',
        '330px': '20.625rem',
        '427px': '26.6875rem',
        '478px': '29.875rem',
        '594px': '37.125rem',
        '598px': '37.375rem',
        '690px': '43.125rem',
        '700px': '43.75rem',
        '9/10': '90%',
        fit: 'fit-content',
      },
      container: {
        center: true,
      },
      inset: {
        '10px': '0.625rem',
      },
      maxHeight: {
        '205px': '12.813rem',
        '244px': '15.25rem',
        '700px': '43.75rem',
        '750px': '46.875rem',
        '9/10': '90%',
      },
      minWidth: {
        '14px': '0.875rem',
        '15px': '0.938rem',
        '16px': '1rem',
        '80px': '5rem',
        '130px': '8.125rem',
        '118px': '7.375rem',
        '171px': '10.688rem',
        '244px': '15.25rem',
        '350px': '21.875rem',
        '700px': '43.75rem',
        '20rem': '20rem',
      },
      width: {
        '244px': '15.25rem',
        '300px': '17.75rem',
        '1215px': '75.9375rem',
        fit: 'fit-content',
      },
      height: {
        '401px': '25.0625rem',
        '645px': '40.3125rem',
        fit: 'fit-content',
      },
      opacity: {
        2.61: '0.0261',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['active'],
      backgroundColor: ['active'],
      contrast: ['hover', 'focus'],
      padding: ['first', 'last'],
      borderRadius: ['first', 'last'],
    },
  },
  plugins: [],
}
