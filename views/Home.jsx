import { Flex } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';

import { MyGazers } from '@/components/MyGazers';
import { MintedGazers } from '@/components/MintedGazers';

import { GOERLI_SUBGRAPH_CLIENT } from '@/graphql/config';

export const Home = () => {
  return (
    <Flex minH='100vh' direction='column'>
      <Flex
        direction='row'
        alignItems='baseline'
        pb='4rem'
        px={{ lg: '3rem', sm: '1rem' }}
      >
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
  );
};
