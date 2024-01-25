import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Flex, Button, Divider, Text } from '@chakra-ui/react';

import { getAccountString } from '@/utils/helpers';

export const WalletButton = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  return (
    <Flex h='64px' cursor='pointer'>
      {!address ? (
        <Flex
          direction='column'
          alignItems='center'
          justifyContent='flex-end'
          ml='auto'
          pt='1rem'
        >
          <Flex
            direction='row'
            alignItems='center'
            bg='white'
            borderRadius='0'
            onClick={() => open()}
            _hover={{ bg: 'transparent' }}
          >
            <Text
              color='#59342B'
              fontSize='12px'
              textTransform='uppercase'
              fontFamily='gatwickBold'
              pb='8px'
            >
              Connect wallet
            </Text>
          </Flex>
          <Divider height='1px' width='258px' bg='rgba(255, 92, 0, 1)' />
        </Flex>
      ) : (
        <Flex
          direction='column'
          alignItems='center'
          justifyContent='flex-end'
          ml='auto'
          pt='1rem'
        >
          <Flex
            direction='row'
            alignItems='center'
            bg='white'
            borderRadius='0'
            color='#59342B'
            fontSize='12px'
            textTransform='uppercase'
            onClick={() => disconnect()}
            _hover={{ bg: 'transparent' }}
          >
            <Text fontFamily='gatwickBold'>0 SST</Text>
            <Divider
              orientation='vertical'
              height='38px'
              width='1px'
              mb='-10px'
              mx='10px'
              bg='rgba(89, 52, 43, 1)'
              zIndex='1'
            />

            <Text textDecoration='underline' fontFamily='gatwickBold'>
              {getAccountString(address)}
            </Text>
          </Flex>
          <Divider height='1px' width='321px' bg='rgba(58, 60, 81, 0.25)' />
        </Flex>
      )}
    </Flex>
  );
};
