'use client';

import { Flex } from '@chakra-ui/react';

import { Footer } from '@/shared/Footer';
import { Home } from '@/components/Home';

import { Header } from '@/shared/Header';

export default function Root() {
  return (
    <Flex direction='column'>
      <Header />

      <Flex minH='100vh' direction='column' justifyContent='space-between'>
        <Flex direction='row' alignItems='baseline' pb='4rem' px='3rem'>
          <Home />
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
}
