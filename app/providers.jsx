'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import Fonts from '@/Fonts';

const breakpoints = {
  sm: '320px',
  md: '580px',
  md2: '742px',
  xtra: '900px',
  lg: '1026px',
  lg2: '1220px',
  xl: '1450px'
};

const theme = extendTheme({
  colors: {
    bbb: {
      pink: '#F9548E',
      blue: '#8DEEFF',
      purple: '#392E75',
      purple2: '#AD98D2',
      green: '#31EAA0',
      dark: '#1A4162',
      yellow: '#F5EA0A'
    }
  },
  fonts: {
    gatwick: 'gatwick',
    gatwickLight: 'gatwickLight',
    gatwickBold: 'gatwickBold',
    nunito: 'nunito',
    nunitoBold: 'nunitoBold'
  },
  breakpoints
});

export function Providers({ children }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      {children}
    </ChakraProvider>
  );
}
