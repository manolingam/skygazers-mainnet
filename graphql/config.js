import { GOERLI_SUBGRAPH_URL } from '@/utils/constants';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const GOERLI_SUBGRAPH_CLIENT = new ApolloClient({
  uri: GOERLI_SUBGRAPH_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    },
    watchQuery: {
      fetchPolicy: 'no-cache'
    }
  }
});
