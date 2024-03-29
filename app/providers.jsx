'use client';

import { ChakraProvider, extendTheme, defineStyle } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Fonts from '@/Fonts';

import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle((props) => ({
  track: {
    p: 1,
    backgroundColor: 'white',
    border: '1px solid rgba(255, 92, 0, 1)',
    _checked: {
      bg: 'white'
    }
  },
  thumb: {
    backgroundColor: 'rgba(255, 92, 0, 1)'
  }
}));

const sizes = {
  xl: baseStyle,
  lg: baseStyle,
  md: baseStyle,
  sm: definePartsStyle({
    container: defineStyle({
      w: '26px'
    }),
    track: defineStyle({
      backgroundColor: 'white',
      alignItems: 'center',
      border: '1px solid rgba(255, 92, 0, 1)',
      _checked: {
        bg: 'white'
      }
    }),
    thumb: defineStyle({
      backgroundColor: 'rgba(255, 92, 0, 1)',
      w: '8px',
      h: '8px'
    })
  })
};

const switchTheme = defineMultiStyleConfig({ sizes });

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
