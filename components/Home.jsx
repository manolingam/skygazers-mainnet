'use client';

import { Flex } from '@chakra-ui/react';

import { AllMintedGazers } from './AllMintedGazers';
import { MyGazers } from './MyGazers';

export const Home = () => {
  return (
    <Flex
      w='100%'
      fontFamily='gatwick'
      direction='column'
      justifyContent='space-between'
      px='10vw'
    >
      <MyGazers />
      <AllMintedGazers />
    </Flex>
  );
};
