'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  SimpleGrid,
  Flex,
  Image as ChakraImage,
  Text,
  Checkbox
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import Icons from '@/Icons';

export const Cart = ({
  isCartOpen,
  setIsCartOpen,
  selectedGazers,
  setSelectedGazers,
  nextPrice
}) => {
  const [termsChecked, setTermsChecked] = useState(false);

  useEffect(() => {
    if (selectedGazers.length == 0) {
      setIsCartOpen(false);
    }
  }, [selectedGazers]);

  return (
    <Modal isOpen={isCartOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontFamily='gatwick'
          textAlign='center'
          fontSize='16px'
          color='#59342B'
        >
          Your cart (2 items)
        </ModalHeader>

        <ModalBody>
          <SimpleGrid columns='2' gap='6'>
            {selectedGazers.map((gazerIndex) => {
              return (
                <Flex
                  key={gazerIndex}
                  direction='column'
                  mb='2rem'
                  pb='5px'
                  borderBottom='2px solid #FF5C00'
                  fontFamily='gatwick'
                >
                  <Flex position='relative' mb='10px'>
                    <ChakraImage src='/placeholder.png' w='100%' />
                    <Button
                      position='absolute'
                      top='-15px'
                      right='-15px'
                      p='0'
                      borderRadius='50%'
                      bg='white'
                      cursor='pointer'
                      onClick={() => {
                        setSelectedGazers(
                          selectedGazers.filter(
                            (_index) => _index !== gazerIndex
                          )
                        );
                      }}
                    >
                      <Icons.Xmark fill='#FF5C00' width='3;0%' />
                    </Button>
                  </Flex>
                  <Flex
                    direction='row'
                    alignItems='baseline'
                    justifyContent='space-between'
                    my='auto'
                  >
                    <Text color='#59342b' fontWeight='bold' fontSize='12px'>
                      # {gazerIndex}
                    </Text>

                    <Text color='#59342b' fontWeight='bold' fontSize='12px'>
                      {nextPrice} ETH
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter display='flex' flexDirection='column' fontFamily='gatwick'>
          <Text color='#59342b' mb='1rem'>
            Total: {nextPrice * selectedGazers.length} ETH
          </Text>
          <Checkbox
            mb='10px'
            onChange={() => {
              setTermsChecked(!termsChecked);
            }}
          >
            <Text color='#59342b' fontSize='12px'>
              {' '}
              I agree to terms and conditions
            </Text>
          </Checkbox>
          <Button
            bg='#5DE2A2'
            color='white'
            w='100%'
            borderRadius='30px'
            fontSize='16px'
            mb='10px'
            _hover={{ opacity: '0.8' }}
            isDisabled={!termsChecked}
          >
            Mint
          </Button>
          <Button
            bg='transparent'
            color='#59342b'
            fontSize='16px'
            onClick={() => setIsCartOpen(false)}
            _hover={{ opacity: '0.8' }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
