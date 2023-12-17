'use client';

import {
  Flex,
  Text,
  Image as ChakraImage,
  SimpleGrid,
  Button
} from '@chakra-ui/react';

import { Divider } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';

import { useCurveSaleMinter } from '@/hooks/useCurveSaleMinter';

export const Mint = () => {
  const { gazersRemaining, nextPrice } = useCurveSaleMinter();

  return (
    <Flex direction='row' justifyContent='space-between'>
      <SimpleGrid columns='3' gap='4'>
        {Array.from(Array(10).keys()).map((item) => (
          <Flex key={item} direction='column' w='250px' mb='2rem'>
            <ChakraImage src='/placeholder.png' w='250px' />
            <Flex
              direction='row'
              alignItems='baseline'
              justifyContent='space-between'
              mt='5px'
            >
              <Text color='#59342b' fontWeight='bold' fontSize='12px'>
                #0001
              </Text>
              <Button
                borderRadius='18px'
                bg='#FFAB7B'
                color='#59342b'
                py='10px'
                px='25px'
                fontSize='14px'
              >
                Add to cart
              </Button>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
      <Flex direction='column' maxH='250px'>
        <Button
          border='1px solid #FF5C00'
          borderRadius='30px'
          color='#FF5C00'
          fontSize='16px'
          bg='white'
          isDisabled
        >
          Show Cart (0)
        </Button>
        <Divider h='1px' w='100%' bg='#59342b' my='2rem' />
        <Stat>
          <StatLabel fontSize='14px' color='#59342B'>
            current price / gazer
          </StatLabel>
          <StatNumber fontSize='20px' color='#59342B'>
            {nextPrice} ETH
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize='14px' color='#59342B'>
            gazers left at current price
          </StatLabel>
          <StatNumber fontSize='20px' color='#59342B'>
            {gazersRemaining}
          </StatNumber>
        </Stat>
      </Flex>
    </Flex>
  );
};
