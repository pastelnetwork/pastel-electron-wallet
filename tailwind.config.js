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
      sm: '414px',
      md: '834px',
      lg: '874px',
      xl: '946px',
      '2xl': '1440px',
    },

    fontFamily: {
      display: ['Avenir'],
    },
    margin: {
      8: '8px',
      13: '13px',
      15: '15px',
      20: '20px',
      26: '26px',
      28: '28px',
      35: '35px',
      37: '37px',
      40: '40px',
      50: '50px',
      60: '60px',
      68: '68px',
    },
    height: {
      20: '20px',
      36: '36px',
      66: '66px',
      41: '41px',
    },
    padding: {
      46: '46px',
    },
    width: {
      20: '20px',
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
      14: '14px',
    },
  },
  variants: {},
  plugins: [],
}
