'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Text
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import { useNetwork, useSwitchNetwork } from 'wagmi';

export const NetworkModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { chain } = useNetwork();
  const { isLoading, switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (chain && chain?.id !== 1) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [chain]);

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />

      <ModalContent minH='450px' mx={{ sm: '2rem', lg: '0' }}>
        <ModalBody
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Text
            color='rgba(255, 92, 0, 1)'
            fontFamily='gatwickBold'
            fontSize='24px'
            mb='1rem'
          >
            Wrong Network
          </Text>
          <Text
            color='rgba(89, 52, 43, 1)'
            fontSize='16px'
            fontFamily='gatwick'
            mb='1.5rem'
          >
            Skygazers lives on Mainnet.
          </Text>
          <Text
            color='rgba(89, 52, 43, 1)'
            fontFamily='nunito'
            fontSize='14px'
            mb='20px'
          >
            Please change your network to continue.
          </Text>
          <Button
            bg='white'
            color='rgba(89, 52, 43, 1)'
            border='1px solid rgba(89, 52, 43, 1)'
            w={{ lg: '250px', sm: '200px' }}
            h='60px'
            borderRadius='30px'
            fontSize='16px'
            fontFamily='gatwickBold'
            _hover={{ opacity: '0.8' }}
            isLoading={isLoading}
            onClick={() => {
              switchNetwork?.(1);
            }}
          >
            Change network
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
