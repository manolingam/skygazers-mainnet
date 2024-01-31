'use client';

import { Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { WalletButton } from '@/components/WalletButton';
import { HeaderNav } from '@/components/HeaderNav';

export const Header = () => {
  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <Flex
      direction={{ lg: 'column', sm: 'row-reverse' }}
      justifyContent='space-between'
    >
      <WalletButton />
      <HeaderNav windowWidth={windowWidth} />
    </Flex>
  );
};
