import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`      
      @font-face {
        font-family: 'gatwick';
        src: url('/fonts/Gatwick.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
      `}
  />
);

export default Fonts;
