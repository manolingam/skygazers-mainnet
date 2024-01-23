import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Flex, Button, Divider, Text } from '@chakra-ui/react';

import { getAccountString } from '@/utils/helpers';

export const WalletButton = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  return (
    <>
      {!address ? (
        <Flex
          direction='column'
          alignItems='center'
          justifyContent='flex-end'
          ml='auto'
          pt='1rem'
        >
          <Button
            bg='white'
            borderRadius='0'
            color='#59342B'
            fontSize='12px'
            py='5px'
            textTransform='uppercase'
            fontFamily='gatwickBold'
            onClick={() => open()}
            _hover={{ bg: 'transparent' }}
          >
            Connect wallet
          </Button>
          <Divider height='2px' width='258px' bg='rgba(255, 92, 0, 1)' />
        </Flex>
      ) : (
        <Flex
          direction='column'
          alignItems='center'
          justifyContent='flex-end'
          ml='auto'
          pt='1rem'
        >
          <Button
            bg='white'
            borderRadius='0'
            color='#59342B'
            fontSize='12px'
            textTransform='uppercase'
            fontFamily='gatwickBold'
            onClick={() => disconnect()}
            _hover={{ bg: 'transparent' }}
          >
            <Flex direction='row' alignItems='center'>
              <Text>0 SST</Text>
              <Divider
                orientation='vertical'
                height='38px'
                width='2px'
                mb='-15px'
                mx='10px'
                bg='rgba(89, 52, 43, 1)'
              />
            </Flex>
            <Text>{getAccountString(address)}</Text>
          </Button>
          <Divider height='2px' width='258px' bg='rgba(58, 60, 81, 0.25)' />
        </Flex>
      )}
    </>
  );
};
