'use client';

import { Flex } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';

import { Footer } from '@/shared/Footer';
import { Header } from '@/shared/Header';

import { MyGazers } from '@/views/MyGazers';
import { MintedGazers } from '@/views/MintedGazers';

import { GOERLI_SUBGRAPH_CLIENT } from '@/graphql/config';

export default function HomePage() {
  return (
    <Flex direction='column'>
      <Header />

      <Flex minH='100vh' direction='column'>
        <Flex direction='row' alignItems='baseline' pb='4rem' px='3rem'>
          <ApolloProvider client={GOERLI_SUBGRAPH_CLIENT}>
            <Flex
              w='100%'
              fontFamily='gatwick'
              direction='column'
              justifyContent='space-between'
              px='10vw'
            >
              <MyGazers />
              <MintedGazers />
            </Flex>
          </ApolloProvider>
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
}
