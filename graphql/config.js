import { SUBGRAPH_URL } from '@/utils/constants';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const SUBGRAPH_CLIENT = new ApolloClient({
  uri: SUBGRAPH_URL,
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
