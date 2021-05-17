import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      pinkLight: string;
      blueLight: string;
      blue: string;
      blueHover: string;
      whiteOff: string;
      white: string;
      textDark: string;
      textGray: string;
      grayLight: string;
      green: string;
      error: string;
    };
    fonts: {
      default: string;
      h1: string;
      h2: string;
      big: string;
      small: string;
      xSmall: string;
    };
    shadows: {
      '1': string;
      '2': string;
      '3': string;
      '4': string;
      '5': string;
    };
  }
}
