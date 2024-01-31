import { Flex } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';

import { MyGazers } from '@/components/MyGazers';
import { MintedGazers } from '@/components/MintedGazers';

import { GOERLI_SUBGRAPH_CLIENT } from '@/graphql/config';

export const Home = () => {
  return (
    <ApolloProvider client={GOERLI_SUBGRAPH_CLIENT}>
      <Flex
        minH='100vh'
        direction='column'
        w='100%'
        fontFamily='gatwick'
        justifyContent='space-between'
        pb='4rem'
        pt='2rem'
        px={{ lg: '7.5vw', sm: '1rem' }}
      >
        <MyGazers />
        <MintedGazers />
      </Flex>
    </ApolloProvider>
  );
};
