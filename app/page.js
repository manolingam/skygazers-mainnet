'use client';

import {
  Flex,
  Image as ChakraImage,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';

import { Footer } from '@/shared/Footer';
import { Home } from '@/components/Home';
import { Mint } from '@/components/Mint';
import { Header } from '@/shared/Header';

export default function Root() {
  const { address } = useAccount();

  return (
    <Flex direction='column' fontFamily='gatwick' maxW='100rem' mx='auto'>
      <Header />

      <Flex minH='100vh' direction='column' justifyContent='space-between'>
        <Flex direction='row' alignItems='baseline' pb='4rem' px='3rem'>
          <Tabs variant='unstyled' w='100%'>
            <TabList color='#DDB598' alignItems='baseline'>
              <ChakraImage src='/logo.svg' w='150px' mr='2rem' />
              <Tab
                textTransform='uppercase'
                fontSize='24px'
                _selected={{ color: '#FF5C00' }}
                isDisabled={!address}
              >
                Home
              </Tab>
              <Tab
                textTransform='uppercase'
                fontSize='24px'
                _selected={{ color: '#FF5C00' }}
                isDisabled={!address}
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

      <Footer />
    </Flex>
  );
}
