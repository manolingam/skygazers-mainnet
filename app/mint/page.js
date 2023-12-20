'use client';

import { Flex } from '@chakra-ui/react';

import { Footer } from '@/shared/Footer';
import { Mint } from '@/components/Mint';

import { Header } from '@/shared/Header';

export default function MintPage() {
  return (
    <Flex direction='column' fontFamily='gatwick' maxW='100rem' mx='auto'>
      <Header />
      <Flex minH='100vh' direction='column' justifyContent='space-between'>
        <Flex direction='row' alignItems='baseline' pb='4rem' px='3rem'>
          <Mint />
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
}
