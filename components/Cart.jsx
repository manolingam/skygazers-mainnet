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
  Link as ChakraLink,
  Text,
  Checkbox
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
  useAccount,
  useBalance
} from 'wagmi';
import { BigNumber, utils } from 'ethers';

import Icons from '@/Icons';

import CURVE_SALE_MINTER_ABI from '../abi/CurveSaleMinter.json';
import {
  BLOCKEXPLORE_BASE_URL,
  CURVE_SALE_MINTER_CONTRACTS
} from '@/utils/constants';
import { getAccountString, getPrices } from '@/utils/helpers';
import { useCurveSaleMinter } from '@/hooks/useCurveSaleMinter';
import { SkyLoader } from '@/components/Skyloader';

export const Cart = ({
  isCartOpen,
  setIsCartOpen,
  selectedGazers,
  setSelectedGazers
}) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { currentIndex } = useCurveSaleMinter();
  const router = useRouter();

  const [termsChecked, setTermsChecked] = useState(false);
  const [cartItemPrices, setCartItemPrices] = useState([]);
  const [cartTotal, setCartTotal] = useState(BigNumber.from(0));

  const [txReceipt, setTxReceipt] = useState('');
  const [txStateLevel, setTxStateLevel] = useState(1);
  const [walletBalance, setWalletBalance] = useState(0);

  const { write } = useContractWrite({
    address: CURVE_SALE_MINTER_CONTRACTS[chain?.id],
    abi: CURVE_SALE_MINTER_ABI,
    functionName: 'mintItems',
    onError(err) {
      console.log(err);
      setTxStateLevel(1);
    },
    onMutate(res) {
      setTxStateLevel(2);
    },
    onSuccess(res) {
      setTxReceipt(res.hash);
      setTxStateLevel(3);
    }
  });

  const {} = useWaitForTransaction({
    hash: txReceipt,
    enabled: txReceipt !== '' ? true : false,
    confirmations: 2,
    onSuccess() {
      setTxReceipt('');
      setTxStateLevel(4);
      setSelectedGazers([]);
    }
  });

  const {} = useBalance({
    address,
    enabled: address ? true : false,

    onSuccess(data) {
      setWalletBalance(Number(utils.formatEther(data.value)));
    }
  });

  useEffect(() => {
    if (selectedGazers.length == 0) {
      setIsCartOpen(false);
    }
    if (selectedGazers.length > 0 && currentIndex !== null) {
      const { total, itemPrices } = getPrices(
        Number(currentIndex),
        selectedGazers.length
      );
      setCartTotal(total);
      setCartItemPrices(itemPrices);
    }
  }, [selectedGazers, currentIndex]);

  return (
    <>
      <Modal isOpen={isCartOpen}>
        <ModalOverlay />

        {txStateLevel == 1 && (
          <ModalContent minH='450px' mx={{ sm: '2rem', lg: '0' }}>
            <ModalHeader
              fontFamily='gatwick'
              textAlign='center'
              fontSize='16px'
              color='#59342B'
            >
              Your cart ({selectedGazers.length} items)
            </ModalHeader>

            <ModalBody>
              <SimpleGrid
                columns={{ lg: '2', sm: '1' }}
                gap={{ lg: '6', sm: '0' }}
                placeItems='center'
              >
                {selectedGazers.map((gazerIndex, i) => {
                  return (
                    <Flex
                      key={gazerIndex}
                      direction='column'
                      alignItems='center'
                      mb='2rem'
                      pb='5px'
                      borderBottom='2px solid #FF5C00'
                      fontFamily='gatwick'
                    >
                      <Flex position='relative' mb='10px'>
                        <ChakraImage
                          src={`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/images/${gazerIndex}_660.jpeg`}
                          w={{ lg: '100%', sm: '200px' }}
                        />
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
                        w='100%'
                        direction='row'
                        alignItems='baseline'
                        justifyContent='space-between'
                        my='auto'
                      >
                        <Text
                          color='#59342b'
                          fontSize='12px'
                          fontFamily='gatwickBold'
                        >
                          # {gazerIndex}
                        </Text>

                        <Text color='#59342b' fontSize='12px'>
                          {cartItemPrices.length &&
                            utils.formatEther(cartItemPrices[i] || '0')}{' '}
                          ETH
                        </Text>
                      </Flex>
                    </Flex>
                  );
                })}
              </SimpleGrid>
            </ModalBody>

            <ModalFooter
              display='flex'
              flexDirection='column'
              mx='auto'
              fontFamily='gatwick'
              p='0'
              mb='2rem'
              w={{ lg: '100%', sm: '200px' }}
            >
              <Text
                color='#59342b'
                mb='1rem'
                fontFamily='gatwickBold'
                fontSize={{ lg: '20px', sm: '16px' }}
              >
                Total: {cartTotal && utils.formatEther(cartTotal)} ETH
              </Text>

              {walletBalance < Number(utils.formatEther(cartTotal)) && (
                <Flex w='100%' bg='#ffab7b78' p='2rem' mb='2rem'>
                  <Text
                    fontFamily='nunitoBold'
                    fontSize='14px'
                    textAlign='center'
                    mx='auto'
                    color='
                  #FF5C00'
                  >
                    It seems the connected wallet doesn't hold enough ETH to
                    mint
                  </Text>
                </Flex>
              )}

              <Checkbox
                mb='2rem'
                isChecked={termsChecked}
                onChange={() => {
                  setTermsChecked(!termsChecked);
                }}
              >
                <Text color='#59342b' fontSize={{ lg: '14px', sm: '8px' }}>
                  {' '}
                  I agree to terms and conditions
                </Text>
              </Checkbox>

              <Button
                bg='#5DE2A2'
                color='white'
                w={{ lg: '250px', sm: '200px' }}
                h='60px'
                borderRadius='30px'
                fontSize='16px'
                fontFamily='gatwickBold'
                _hover={{ opacity: '0.8' }}
                mb='10px'
                isDisabled={
                  !termsChecked ||
                  walletBalance < Number(utils.formatEther(cartTotal))
                }
                onClick={() => {
                  write({
                    args: [selectedGazers],
                    value: cartTotal
                  });
                }}
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
        )}

        {txStateLevel == 2 && (
          <ModalContent minH='550px' py='4rem' mx={{ sm: '2rem', lg: '0' }}>
            <ModalBody
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='space-between'
            >
              <Flex direction='column'>
                <Text
                  fontSize='16px'
                  color='#59342B'
                  textAlign='center'
                  fontFamily='gatwick'
                  w='250px'
                >
                  Please confirm the transaction in wallet
                </Text>
                <SkyLoader />
              </Flex>
            </ModalBody>
          </ModalContent>
        )}

        {txStateLevel == 3 && (
          <ModalContent minH='550px' py='4rem' mx={{ sm: '2rem', lg: '0' }}>
            <ModalBody
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='space-between'
            >
              <Flex direction='column'>
                <Text
                  fontSize='16px'
                  color='#59342B'
                  textAlign='center'
                  fontFamily='gatwick'
                  w='250px'
                >
                  Your NFT's are being minted as we speak
                </Text>
                <ChakraLink
                  href={`${BLOCKEXPLORE_BASE_URL[chain?.id]}/tx/${txReceipt}`}
                  isExternal
                  mt='2rem'
                  fontSize='14px'
                  textAlign='center'
                  textDecoration='underline'
                  color='#59342B'
                  fontWeight='bold'
                  fontFamily='nunito'
                >
                  {getAccountString(txReceipt)}
                </ChakraLink>
                <SkyLoader />
              </Flex>
            </ModalBody>
          </ModalContent>
        )}

        {txStateLevel == 4 && (
          <ModalContent minH='550px' mx={{ sm: '2rem', lg: '0' }} py='4rem'>
            <ModalBody
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='space-between'
            >
              <Flex direction='column'>
                <Text
                  fontSize='24px'
                  color='#5DE2A2'
                  textAlign='center'
                  fontFamily='gatwick'
                  mb='1rem'
                >
                  All yours!
                </Text>
                <Text
                  fontSize='16px'
                  color='#59342B'
                  textAlign='center'
                  fontFamily='gatwick'
                  w='250px'
                  mb='1rem'
                >
                  Your transaction was successful!
                </Text>
                <Text fontSize='14px' color='#59342B' fontFamily='nunito'>
                  Visit home to see your brand new gazers, or keep going now and
                  mint some more!
                </Text>
              </Flex>
              <Flex direction='column'>
                <Button
                  w='250px'
                  h='60px'
                  border='2px solid#59342B'
                  color='#59342B'
                  borderRadius='30px'
                  fontSize='16px'
                  fontFamily='gatwickBold'
                  _hover={{ opacity: '0.8' }}
                  bg='transparent'
                  onClick={() => {
                    setSelectedGazers([]);
                    setTxStateLevel(1);
                    router.push('/');
                  }}
                >
                  Visit home
                </Button>
                <Button
                  w='250px'
                  h='60px'
                  color='#59342B'
                  fontSize='16px'
                  fontFamily='gatwickBold'
                  _hover={{ opacity: '0.8' }}
                  mt='.5rem'
                  bg='transparent'
                  onClick={() => {
                    setSelectedGazers([]);
                    setTxStateLevel(1);
                    router.push('/mint');
                  }}
                >
                  Mint more NFTs
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};
