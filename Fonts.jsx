import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`      
      @font-face {
        font-family: 'gatwick';
        src: url('/fonts/Gatwick-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
      font-family: 'gatwickLight';
      src: url('/fonts/Gatwick-Light.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'gatwickBold';
      src: url('/fonts/Gatwick-Bold.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'nunito';
      src: url('/fonts/Nunito.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'nunitoBold';
      src: url('/fonts/Nunito-Bold.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
      `}
  />
);

export default Fonts;
