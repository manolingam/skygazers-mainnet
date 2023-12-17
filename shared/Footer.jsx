'use client';

import { Flex, Text, Image as ChakraImage } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex direction='row' bg='#DDB598' py='4rem' px='3rem'>
      <ChakraImage src='/logo.svg' w='150px' />
      <Flex
        direction='column'
        ml='4rem'
        fontWeight='bold'
        textTransform='uppercase'
        color='#59342b'
      >
        <Text fontSize='16px'>Home</Text>
        <Text fontSize='16px'>Mint</Text>
        <Text fontSize='16px'>FAQ</Text>
      </Flex>
      <Flex
        direction='column'
        ml='2rem'
        textTransform='uppercase'
        color='#59342b'
      >
        <Text fontSize='16px' opacity='30%'>
          Lore
        </Text>
        <Text fontSize='16px' opacity='30%'>
          Proposals
        </Text>
      </Flex>
    </Flex>
  );
};
