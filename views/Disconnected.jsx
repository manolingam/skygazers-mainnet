'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';

import { Flex, Text, Button } from '@chakra-ui/react';

export const Disconnected = () => {
  const { open } = useWeb3Modal();

  return (
    <>
      <Flex
        pt='2rem'
        px='3rem'
        w='100%'
        direction='row'
        alignItems='center'
        justifyContent='flex-end'
      >
        {/* <w3m-button /> */}
        <Button
          bg='white'
          borderRadius='0'
          borderBottom='2px solid #59342B'
          color='#59342B'
          fontSize='12px'
          textTransform='uppercase'
          onClick={() => open()}
          mt='auto'
        >
          Connect wallet
        </Button>
      </Flex>
      <Flex
        direction='column'
        alignItems='center'
        justifyContent='center'
        bgImage='url(hero.svg)'
        bgPosition='center'
        h='500px'
      >
        <Text textTransform='uppercase' color='white' fontSize='34px'>
          Welcome Traveller
        </Text>
        <Text fontSize='16px' color='#59342B'>
          Please connect you wallet for identification.
        </Text>
      </Flex>
    </>
  );
};
