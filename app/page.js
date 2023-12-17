'use client';

import { Flex } from '@chakra-ui/react';

import { Disconnected } from '@/views/Disconnected';
import { Footer } from '@/shared/Footer';

import { useAccount } from 'wagmi';
import { Connected } from '@/views/Connected';

export default function Root() {
  const { address } = useAccount();

  return (
    <Flex direction='column' fontFamily='gatwick' maxW='100rem' mx='auto'>
      {address ? <Connected /> : <Disconnected />}
      <Footer />
    </Flex>
  );
}
