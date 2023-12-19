'use client';
import { useAccount } from 'wagmi';
import { getAccountString } from '@/utils/helpers';
import { Flex, Text, Image as ChakraImage, SimpleGrid } from '@chakra-ui/react';

export const Home = () => {
  const { address } = useAccount();
  return (
    <Flex direction='column' justifyContent='space-between'>
      {!address ? (
        <Flex
          direction='column'
          alignItems='center'
          justifyContent='center'
          h='200px'
          bg='#DDB59866'
          borderBottom='1px solid #FF5C00'
        >
          <Text textTransform='uppercase' color='white' fontSize='34px'>
            Welcome Traveller
          </Text>
          <Text fontSize='16px' color='#59342B'>
            Please connect you wallet for identification.
          </Text>
        </Flex>
      ) : (
        <SimpleGrid columns='2' w='100%'>
          {Array.from(Array(2).keys()).map((item) => (
            <Flex
              key={item}
              direction='row'
              alignItems='stretch'
              border='1px solid #DDB598'
              borderBottomWidth='5px'
              p='20px'
            >
              <ChakraImage src='/placeholder.png' w='250px' mr='20px' />
              <Flex direction='column'>
                <Text fontSize='10px' color='#59342B' mb='10px' opacity='0.7'>
                  #0001 | Owned by you
                </Text>
                <Text
                  fontSize='12px'
                  bg='#FFAB7B80'
                  color='#59342B'
                  w='60px'
                  mb='10px'
                  textAlign='center'
                >
                  draft
                </Text>
                <Text
                  fontSize='18px'
                  textTransform='uppercase'
                  color='#59342B'
                  mb='10px'
                >
                  The day of which they never spoke again
                </Text>
                <Text fontSize='12px' color='#59342B'>
                  Not a day goes by without the Skygazers wondering, thinking to
                  themself: what could we have done? What could have prevented
                  this horrible outcome...
                </Text>
                <Text fontSize='10px' color='#59342B' mt='10px'>
                  Edited 4 hours ago
                </Text>
              </Flex>
            </Flex>
          ))}
        </SimpleGrid>
      )}

      <SimpleGrid columns='5' gap='5' w='100%' mt='4rem'>
        {Array.from(Array(3).keys()).map((item) => (
          <Flex key={item} direction='column'>
            <ChakraImage src='/placeholder.png' w='250px' mr='20px' />
            <Flex direction='column'>
              <Text fontSize='10px' color='#59342B' my='10px' opacity='0.7'>
                {`#0001 | Owned by ${getAccountString(
                  '0xfB87e24bdd91A5ef03bF0c6BC59A8605119633EA'
                )}`}
              </Text>
              <Text
                fontSize='12px'
                bg='#FFAB7B80'
                color='#59342B'
                w='60px'
                mb='10px'
                textAlign='center'
              >
                draft
              </Text>
              <Text
                fontSize='18px'
                textTransform='uppercase'
                color='#59342B'
                mb='10px'
              >
                The day of which they never spoke again
              </Text>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
