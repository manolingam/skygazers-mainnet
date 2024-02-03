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
  SKYGAZERS_NFT_CONTRACT,
  ITEMS_PER_PAGE_MINT
} from '@/utils/constants';

import SKYGAZER_ABI from '../abi/SkyGazer.json';
import Icons from '@/Icons';
import { Filter } from '@/components/Filter';

const Gazer = ({ item, selectedGazers, setSelectedGazers }) => {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { data: owner, isError } = useContractRead({
    address: SKYGAZERS_NFT_CONTRACT,
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
            if (address) {
              if (selectedGazers.includes(SKYGAZERS.indexOf(item))) {
                setSelectedGazers(
                  selectedGazers.filter(
                    (_gazer) => _gazer !== SKYGAZERS.indexOf(item)
                  )
                );
              } else {
                setSelectedGazers((prev) => [...prev, SKYGAZERS.indexOf(item)]);
              }
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
              href={`${BLOCKEXPLORE_BASE_URL}/address/${owner}`}
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

  const [filteredGazers, setFilteredGazers] = useState(SKYGAZERS);
  const [selectedGazers, setSelectedGazers] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const paginate = (_items, _pageNumber) => {
    _pageNumber ? setCurrentPage(_pageNumber) : null;
    const indexOfLastRecord = currentPage * ITEMS_PER_PAGE_MINT;
    const indexOfFirstRecord = indexOfLastRecord - ITEMS_PER_PAGE_MINT;
    const currentRecords = _items.slice(indexOfFirstRecord, indexOfLastRecord);
    setCurrentItems(currentRecords);
  };

  const cropRecords = (_items, _page) => {
    setTotalPages(Math.ceil(_items.length / ITEMS_PER_PAGE_MINT));
    paginate(_items, _page);
  };

  useEffect(() => {
    cropRecords(filteredGazers);
  }, [currentPage, filteredGazers]);

  useEffect(() => {
    cropRecords(filteredGazers, 1);
  }, []);

  return (
    <Flex
      minH='100vh'
      direction={{ lg: 'row', sm: 'column-reverse' }}
      alignItems='flex-start'
      pb='4rem'
      px={{ lg: '7.5vw', sm: '1rem' }}
    >
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

      <Flex
        w={{ lg: 'auto', sm: '100%' }}
        direction={{ lg: 'column', sm: 'row-reverse' }}
        alignItems={{ sm: 'center', lg: 'start' }}
        justifyContent='space-between'
        my={{ sm: '1rem', lg: '0' }}
        position='sticky'
        top='0'
      >
        {!address && windowWidth > 700 && (
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
          py={{ lg: '25px', sm: '10px' }}
          px='25px'
          w={{ lg: '250px', sm: '75px' }}
          h={{ lg: '60px', sm: '36px' }}
          borderRadius='30px'
          fontSize={{ lg: '16px', sm: '14px' }}
          fontFamily='gatwickBold'
          _hover={{ opacity: '0.8' }}
          bg='transparent'
          isDisabled={selectedGazers.length == 0}
          onClick={() => {
            setIsCartOpen(true);
          }}
        >
          {windowWidth > 700 && 'show cart'} {selectedGazers.length}{' '}
          {windowWidth < 700 && (
            <ChakraImage src='/cart_icon.png' w='17px' h='14px' ml='5px' />
          )}
        </Button>

        <Filter
          setFilteredGazers={setFilteredGazers}
          windowWidth={windowWidth}
        />

        {windowWidth > 700 && (
          <Divider h='1px' w='100%' bg='#59342b' my='1rem' />
        )}

        <Stat>
          <StatLabel
            fontSize={{ lg: '14px', sm: '10px' }}
            color='#59342B'
            fontFamily='nunito'
          >
            current price / gazer
          </StatLabel>
          <StatNumber
            fontSize={{ lg: '20px', sm: '16px' }}
            color='#59342B'
            fontFamily='gatwickBold'
          >
            {nextPrice} ETH
          </StatNumber>
        </Stat>

        {windowWidth > 700 && (
          <Stat my='1rem'>
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
        )}

        {windowWidth > 700 && <Divider h='1px' w='100%' bg='#59342b' />}

        <Cart
          isCartOpen={isCartOpen}
          selectedGazers={selectedGazers}
          setSelectedGazers={setSelectedGazers}
          setIsCartOpen={setIsCartOpen}
        />
      </Flex>
    </Flex>
  );
};
