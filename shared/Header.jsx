'use client';

import { Flex, Button } from '@chakra-ui/react';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import { getAccountString } from '@/utils/helpers';

export const Header = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  return (
    <>
      {!address ? (
        <Flex
          pt='2rem'
          px='3rem'
          w='100%'
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
        >
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
      ) : (
        <Flex
          pt='2rem'
          px='3rem'
          w='100%'
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
        >
          <Button
            bg='white'
            borderRadius='0'
            borderBottom='2px solid #59342B'
            color='#59342B'
            fontSize='12px'
            textTransform='uppercase'
            onClick={() => disconnect()}
            mt='auto'
          >
            {`0 SST | ${getAccountString(address)}`}
          </Button>
        </Flex>
      )}
    </>
  );
};
