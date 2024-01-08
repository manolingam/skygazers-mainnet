'use client';

import { Flex, Text, Image as ChakraImage, Button } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Flex direction='row' bg='#DDB598' py='4rem' px='10vw'>
      <ChakraImage src='/logo.svg' w='160px' h='102px' />
      <Flex
        direction='column'
        ml='4rem'
        fontWeight='bold'
        textTransform='uppercase'
        color='#59342b'
      >
        <Text
          textTransform='uppercase'
          bg='transparent'
          color={pathname === '/' ? '#FF5C00' : '#59342B'}
          fontFamily='gatwickBold'
          fontSize='16px'
          _hover={{
            bg: 'transparent',
            textDecoration: 'underline',
            color: '#FF5C00'
          }}
          onClick={() => {
            pathname !== '/' && router.push('/');
          }}
          mb='10px'
          cursor='pointer'
        >
          Home
        </Text>
        <Text
          textTransform='uppercase'
          bg='transparent'
          color={pathname === '/mint' ? '#FF5C00' : '#59342B'}
          fontFamily='gatwickBold'
          fontSize='16px'
          _hover={{
            bg: 'transparent',
            textDecoration: 'underline',
            color: '#FF5C00'
          }}
          onClick={() => {
            pathname !== '/mint' && router.push('/mint');
          }}
          mb='10px'
          cursor='pointer'
        >
          Mint
        </Text>
        <Text
          textTransform='uppercase'
          bg='transparent'
          color={pathname === '/faq' ? '#FF5C00' : '#59342B'}
          fontFamily='gatwickBold'
          fontSize='16px'
          _hover={{
            bg: 'transparent',
            textDecoration: 'underline',
            color: '#FF5C00'
          }}
          onClick={() => {
            pathname !== '/faq' && router.push('/');
          }}
          cursor='pointer'
        >
          FAQ
        </Text>
      </Flex>
      <Flex
        direction='column'
        ml='2rem'
        textTransform='uppercase'
        color='#59342b'
      >
        <Text
          fontFamily='gatwickBold'
          fontSize='16px'
          mb='10px'
          cursor='not-allowed'
          opacity='30%'
        >
          Lore
        </Text>
        <Text
          fontFamily='gatwickBold'
          fontSize='16px'
          mb='10px'
          cursor='not-allowed'
          opacity='30%'
        >
          Proposals
        </Text>
      </Flex>
    </Flex>
  );
};
