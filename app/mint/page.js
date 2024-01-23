'use client';

import { Flex } from '@chakra-ui/react';

import { Header } from '@/shared/Header';
import { Footer } from '@/shared/Footer';
import { Mint } from '@/views/Mint';

export default function MintPage() {
  return (
    <Flex direction='column'>
      <Header />
      <Mint />
      <Footer />
    </Flex>
  );
}
