'use client';

import { Flex, Button, Image as ChakraImage } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import { getAccountString } from '@/utils/helpers';

export const Header = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const pathname = usePathname();
  const router = useRouter();

  return (
    <Flex
      direction='row'
      alignItems='flex-start'
      justifyContent='space-between'
      py='4rem'
      px='3rem'
    >
      <Flex direction='row' w='80%'>
        <ChakraImage src='/logo.svg' w='150px' mr='2rem' />
        <Button
          textTransform='uppercase'
          fontSize='24px'
          mt='auto'
          bg='transparent'
          _hover={{ bg: 'transparent', textDecoration: 'underline' }}
          color='#FF5C00'
          opacity={pathname === '/' ? '1' : '0.7'}
          onClick={() => {
            pathname !== '/' && router.push('/');
          }}
        >
          Home
        </Button>
        <Button
          textTransform='uppercase'
          fontSize='24px'
          mt='auto'
          color='#FF5C00'
          bg='transparent'
          _hover={{ bg: 'transparent', textDecoration: 'underline' }}
          opacity={pathname === '/mint' ? '1' : '0.7'}
          onClick={() => {
            pathname !== '/mint' && router.push('/mint');
          }}
        >
          Mint
        </Button>
        <Button
          textTransform='uppercase'
          fontSize='24px'
          mt='auto'
          color='#FF5C00'
          bg='transparent'
          isDisabled
        >
          Lore
        </Button>
        <Button
          textTransform='uppercase'
          fontSize='24px'
          mt='auto'
          color='#FF5C00'
          bg='transparent'
          isDisabled
        >
          Proposals
        </Button>
      </Flex>

      {!address ? (
        <Flex direction='row' alignItems='center' justifyContent='flex-end'>
          <Button
            bg='white'
            borderRadius='0'
            borderBottom='2px solid #59342B'
            color='#59342B'
            fontSize='12px'
            textTransform='uppercase'
            onClick={() => open()}
          >
            Connect wallet
          </Button>
        </Flex>
      ) : (
        <Flex direction='row' alignItems='center' justifyContent='flex-end'>
          <Button
            bg='white'
            borderRadius='0'
            borderBottom='2px solid #59342B'
            color='#59342B'
            fontSize='12px'
            textTransform='uppercase'
            onClick={() => disconnect()}
          >
            {`0 SST | ${getAccountString(address)}`}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
