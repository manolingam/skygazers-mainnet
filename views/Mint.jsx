'use client';

import {
  Flex,
  Text,
  Image as ChakraImage,
  SimpleGrid,
  Button,
  Link as ChakraLink,
  Stat,
  StatLabel,
  StatNumber,
  Divider
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useContractRead, useNetwork, useAccount } from 'wagmi';

import { Pagination } from '@/shared/Pagination';
import { Cart } from '../components/Cart';

import { useCurveSaleMinter } from '@/hooks/useCurveSaleMinter';
import { SKYGAZERS } from '@/data/traitsMap';
import { getAccountString } from '@/utils/helpers';
import {
  BLOCKEXPLORE_BASE_URL,
  SKYGAZERS_NFT_CONTRACTS
} from '@/utils/constants';

import SKYGAZER_ABI from '../abi/SkyGazer.json';
import Icons from '@/Icons';

const ITEMS_PER_PAGE = 51;

const Gazer = ({ item, selectedGazers, setSelectedGazers }) => {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { data: owner, isError } = useContractRead({
    address: SKYGAZERS_NFT_CONTRACTS[chain?.id],
    abi: SKYGAZER_ABI,
    functionName: 'ownerOf',
    cacheOnBlock: true,
    args: [SKYGAZERS.indexOf(item)]
  });

  return (
    <Flex key={item} direction='column' mb='2rem'>
      <Flex position='relative' mb='10px'>
        <ChakraImage
          src={`${
            process.env.NEXT_PUBLIC_AWS_BASE_URL
          }/images/${SKYGAZERS.indexOf(item)}_660.jpeg`}
          fallbackSrc='/placeholder.png'
          w='100%'
          cursor='pointer'
          onClick={() => {
            if (selectedGazers.includes(SKYGAZERS.indexOf(item))) {
              setSelectedGazers(
                selectedGazers.filter(
                  (_gazer) => _gazer !== SKYGAZERS.indexOf(item)
                )
              );
            } else {
              setSelectedGazers((prev) => [...prev, SKYGAZERS.indexOf(item)]);
            }
          }}
        />
        {owner ? (
          <Text
            position='absolute'
            bottom='0'
            right='0'
            mb='5px'
            mr='5px'
            px='12px'
            py='6px'
            bg='white'
            fontSize='12px'
            fontFamily='gatwickBold'
            color='#59342B'
          >
            SOLD
          </Text>
        ) : (
          <Button
            position='absolute'
            bottom='0'
            right='0'
            mb='5px'
            mr='5px'
            p='12px'
            borderRadius='50%'
            bg='white'
            cursor='default'
            _hover={{
              opacity: `${
                selectedGazers.includes(SKYGAZERS.indexOf(item)) ? 1 : 0.6
              }`
            }}
            opacity={selectedGazers.includes(SKYGAZERS.indexOf(item)) ? 1 : 0.6}
            w='36px'
          >
            <Icons.Vmark />
          </Button>
        )}
      </Flex>
      <Flex
        direction='row'
        alignItems='baseline'
        justifyContent='space-between'
        my='auto'
      >
        <Text color='#59342b' fontSize='12px' fontFamily='gatwickBold'>
          # {SKYGAZERS.indexOf(item)}
        </Text>
        {!isError && address ? (
          <Text fontSize='12px' color='#59342B' fontFamily='gatwick'>
            minted by{' '}
            <ChakraLink
              textDecoration='underline'
              href={`${BLOCKEXPLORE_BASE_URL[chain?.id]}/address/${owner}`}
            >
              {getAccountString(owner || '')}
            </ChakraLink>
          </Text>
        ) : (
          <Button
            w='157px'
            h='36px'
            borderRadius='18px'
            fontFamily='gatwickBold'
            bg={
              selectedGazers.includes(SKYGAZERS.indexOf(item))
                ? 'transparent'
                : '#FFAB7B'
            }
            color='#59342b'
            textDecoration={
              selectedGazers.includes(SKYGAZERS.indexOf(item))
                ? 'underline'
                : 'none'
            }
            py='10px'
            px='25px'
            fontSize='14px'
            _hover={
              selectedGazers.includes(SKYGAZERS.indexOf(item))
                ? { bg: 'transparent' }
                : { opacity: 0.9 }
            }
            onClick={() => {
              if (selectedGazers.includes(SKYGAZERS.indexOf(item))) {
                setSelectedGazers(
                  selectedGazers.filter(
                    (_gazer) => _gazer !== SKYGAZERS.indexOf(item)
                  )
                );
              } else {
                setSelectedGazers((prev) => [...prev, SKYGAZERS.indexOf(item)]);
              }
            }}
            isDisabled={!address}
          >
            {selectedGazers.includes(SKYGAZERS.indexOf(item))
              ? 'remove from cart'
              : '+ add to cart'}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export const Mint = () => {
  const { address } = useAccount();

  const { gazersRemaining, nextPrice } = useCurveSaleMinter();

  const [selectedGazers, setSelectedGazers] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const paginate = (_items, _pageNumber) => {
    _pageNumber ? setCurrentPage(_pageNumber) : null;
    const indexOfLastRecord = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstRecord = indexOfLastRecord - ITEMS_PER_PAGE;
    const currentRecords = _items.slice(indexOfFirstRecord, indexOfLastRecord);
    setCurrentItems(currentRecords);
  };

  const cropRecords = (_items, _page) => {
    setTotalPages(Math.ceil(_items.length / ITEMS_PER_PAGE));
    paginate(_items, _page);
  };

  useEffect(() => {
    cropRecords(SKYGAZERS);
  }, [currentPage]);

  useEffect(() => {
    cropRecords(SKYGAZERS, 1);
  }, []);

  return (
    <Flex minH='100vh' direction='column'>
      <Flex
        direction='row'
        alignItems='baseline'
        pb='4rem'
        px={{ lg: '3rem', sm: '1rem' }}
      >
        <Flex direction='row' w='100%' px='10vw'>
          <Flex
            w='100%'
            direction='column'
            justifyContent='space-between'
            mr='3rem'
          >
            <SimpleGrid columns={{ lg: '3', sm: '1' }} gap='4'>
              {currentItems.length > 0 &&
                currentItems.map((item) => (
                  <Gazer
                    item={item}
                    selectedGazers={selectedGazers}
                    setSelectedGazers={setSelectedGazers}
                  />
                ))}
            </SimpleGrid>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </Flex>
          <Flex direction='column' maxH='300px' position='sticky'>
            {!address && (
              <Flex w='100%' bg='#DDB59866' p='2rem' mb='2rem'>
                <Text
                  fontFamily='nunitoBold'
                  fontSize='14px'
                  textAlign='center'
                  mx='auto'
                >
                  Connect wallet to mint
                </Text>
              </Flex>
            )}
            <Button
              border='1px solid'
              color='#FF5C00'
              py='25px'
              w='250px'
              h='60px'
              borderRadius='30px'
              fontSize='16px'
              fontFamily='gatwickBold'
              _hover={{ opacity: '0.8' }}
              bg='transparent'
              isDisabled={selectedGazers.length == 0}
              onClick={() => {
                setIsCartOpen(true);
              }}
            >
              show cart ({selectedGazers.length})
            </Button>
            <Divider h='1px' w='100%' bg='#59342b' my='2rem' />
            <Stat>
              <StatLabel fontSize='14px' color='#59342B' fontFamily='nunito'>
                current price / gazer
              </StatLabel>
              <StatNumber
                fontSize='20px'
                color='#59342B'
                fontFamily='gatwickBold'
              >
                {nextPrice} ETH
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel fontSize='14px' color='#59342B' fontFamily='nunito'>
                gazers left at current price
              </StatLabel>
              <StatNumber
                fontSize='20px'
                color='#59342B'
                fontFamily='gatwickBold'
              >
                {gazersRemaining}
              </StatNumber>
            </Stat>
            <Divider h='1px' w='100%' bg='#59342b' />
            <Cart
              isCartOpen={isCartOpen}
              selectedGazers={selectedGazers}
              setSelectedGazers={setSelectedGazers}
              setIsCartOpen={setIsCartOpen}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
