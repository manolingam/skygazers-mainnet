'use client';

import { Flex } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';

import { Footer } from '@/shared/Footer';
import { Home } from '@/components/Home';
import { Header } from '@/shared/Header';

import { GOERLI_SUBGRAPH_CLIENT } from '@/graphql/config';

export default function Root() {
  return (
    <Flex direction='column'>
      <Header />

      <Flex minH='100vh' direction='column'>
        <Flex direction='row' alignItems='baseline' pb='4rem' px='3rem'>
          <ApolloProvider client={GOERLI_SUBGRAPH_CLIENT}>
            <Home />
          </ApolloProvider>
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
}
