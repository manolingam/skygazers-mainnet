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
      px='10vw'
    >
      <Flex direction='row' w='80%'>
        <ChakraImage src='/logo.svg' w='275px' h='175px' mr='2rem' />
        <Flex direction='column' alignItems='flex-start'>
          <Button
            textTransform='uppercase'
            mt='auto'
            bg='transparent'
            color={pathname === '/' ? '#FF5C00' : '#DDB598'}
            fontFamily='gatwickBold'
            fontSize='24px'
            _hover={{
              bg: 'transparent',
              textDecoration: 'underline',
              color: '#FF5C00'
            }}
            onClick={() => {
              pathname !== '/' && router.push('/');
            }}
          >
            Home
          </Button>
          <Flex direction='row'>
            <Button
              textTransform='uppercase'
              fontSize='24px'
              mt='auto'
              fontFamily='gatwickBold'
              color={pathname === '/mint' ? '#FF5C00' : '#DDB598'}
              bg='transparent'
              _hover={{
                bg: 'transparent',
                textDecoration: 'underline',
                color: '#FF5C00'
              }}
              onClick={() => {
                pathname !== '/mint' && router.push('/mint');
              }}
            >
              Mint
            </Button>
            <Button
              textTransform='uppercase'
              mt='auto'
              bg='transparent'
              color='#DDB598'
              fontFamily='gatwickBold'
              fontSize='24px'
              _hover={{
                bg: 'transparent',
                textDecoration: 'underline'
              }}
              isDisabled
            >
              Lore
            </Button>
            <Button
              textTransform='uppercase'
              mt='auto'
              bg='transparent'
              color='#DDB598'
              fontFamily='gatwickBold'
              fontSize='24px'
              _hover={{
                bg: 'transparent',
                textDecoration: 'underline'
              }}
              isDisabled
            >
              Proposals
            </Button>
          </Flex>
        </Flex>
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
            fontFamily='gatwickBold'
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
            fontFamily='gatwickBold'
            onClick={() => disconnect()}
          >
            {`0 SST | ${getAccountString(address)}`}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
