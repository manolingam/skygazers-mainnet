'use client';

// import { useDisconnect } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';

import { Home } from '@/components/Home';
import { Mint } from '@/components/Mint';
import { Flex, Image as ChakraImage } from '@chakra-ui/react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button
} from '@chakra-ui/react';
import { getAccountString } from '@/utils/helpers';

export const Connected = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Flex minH='100vh' direction='column' justifyContent='space-between'>
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
      <Flex direction='row' alignItems='baseline' py='4rem' px='3rem'>
        <Tabs variant='unstyled' w='100%'>
          <TabList color='#DDB598' alignItems='baseline'>
            <ChakraImage src='/logo.svg' w='150px' mr='2rem' />
            <Tab
              textTransform='uppercase'
              fontSize='24px'
              _selected={{ color: '#FF5C00' }}
            >
              Home
            </Tab>
            <Tab
              textTransform='uppercase'
              fontSize='24px'
              _selected={{ color: '#FF5C00' }}
            >
              Mint
            </Tab>
            <Tab
              textTransform='uppercase'
              fontSize='24px'
              _selected={{ color: '#FF5C00' }}
              isDisabled
            >
              Lore
            </Tab>
            <Tab
              textTransform='uppercase'
              fontSize='24px'
              _selected={{ color: '#FF5C00' }}
              isDisabled
            >
              Proposals
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Home />
            </TabPanel>
            <TabPanel>
              <Mint />
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
