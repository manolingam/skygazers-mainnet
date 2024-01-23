'use client';

import { Flex } from '@chakra-ui/react';

import { WalletButton } from '@/components/WalletButton';
import { HeaderNav } from '@/components/HeaderNav';

export const Header = () => {
  return (
    <Flex direction='column'>
      <WalletButton />
      <HeaderNav />
    </Flex>
  );
};
