'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Fonts from '@/Fonts';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const switchStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    // ...
  },
  thumb: {
    bg: '#FF5C00'
  },
  track: {
    bg: 'white',
    _checked: {
      bg: 'white'
    }
  }
});

const switchTheme = defineMultiStyleConfig({ switchStyle });

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
  colors: {},
  fonts: {
    gatwick: 'gatwick',
    gatwickLight: 'gatwickLight',
    gatwickBold: 'gatwickBold',
    nunito: 'nunito',
    nunitoBold: 'nunitoBold'
  },
  breakpoints,
  components: { Switch: switchTheme }
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Fonts />
        {children}
      </QueryClientProvider>
    </ChakraProvider>
  );
}
