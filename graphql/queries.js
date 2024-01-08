import { gql } from '@apollo/client';

export const GetMintedNFTs = gql`
  query {
    skyGazers {
      tokenId
      tokenUri
      owner {
        address
      }
    }
  }
`;

export const GetMyNFTs = gql`
  query MyNFTs($address: String!) {
    skyGazerOwners(where: { address: $address }) {
      skygazers {
        tokenId
        tokenUri
      }
    }
  }
`;
