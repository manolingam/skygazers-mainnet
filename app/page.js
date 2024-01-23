'use client';

import { Flex } from '@chakra-ui/react';

import { Footer } from '@/shared/Footer';
import { Header } from '@/shared/Header';
import { Home } from '@/views/Home';

export default function HomePage() {
  return (
    <Flex direction='column'>
      <Header />
      <Home />
      <Footer />
    </Flex>
  );
}
