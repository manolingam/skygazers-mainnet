'use client';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

import {
  Flex,
  Text,
  Image as ChakraImage,
  SimpleGrid,
  Button
} from '@chakra-ui/react';

import { Pagination } from '@/shared/Pagination';
import { GetMyNFTs } from '@/graphql/queries';

const ITEMS_PER_PAGE = 12;

const Gazer = ({ item }) => {
  return (
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
          # {item.tokenId}| Owned by you
        </Text>
        <Text
          fontSize='12px'
          bg='#D9D9D9'
          color='#59342B'
          mb='10px'
          p='3px 10px 3px 10px'
          mr='auto'
          textAlign='left'
        >
          no draft yet
        </Text>
        {/* <Text
          fontSize='18px'
          textTransform='uppercase'
          color='#59342B'
          mb='10px'
        >
          The day of which they never spoke again
        </Text>
        <Text fontSize='12px' color='#59342B'>
          Not a day goes by without the Skygazers wondering, thinking to
          themself: what could we have done? What could have prevented this
          horrible outcome...
        </Text>
        <Text fontSize='10px' color='#59342B' mt='10px'>
          Edited 4 hours ago
        </Text> */}
      </Flex>
    </Flex>
  );
};

export const MyGazers = () => {
  const { address } = useAccount();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [myGazers, setMyGazers] = useState([]);

  const { refetch, loading } = useQuery(GetMyNFTs, {
    variables: { address },
    onCompleted: (data) => {
      if (data?.skyGazerOwners && data.skyGazerOwners.length > 0) {
        setMyGazers(data.skyGazerOwners[0].skygazers);
      } else {
        setMyGazers([]);
        setCurrentItems([]);
        setTotalPages(0);
        setCurrentPage(1);
      }
    }
  });

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
    cropRecords(myGazers);
  }, [currentPage]);

  useEffect(() => {
    if (myGazers.length > 0) cropRecords(myGazers, 1);
  }, [myGazers]);

  useEffect(() => {
    refetch();
  }, [address]);

  return !address ? (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      h='200px'
      bg='#DDB59866'
      borderBottom='1px solid #FF5C00'
      mb='4rem'
    >
      <Text textTransform='uppercase' color='white' fontSize='34px'>
        Welcome Traveller
      </Text>
      <Text fontSize='16px' color='#59342B' fontFamily='nunitoBold'>
        Please connect you wallet for identification.
      </Text>
    </Flex>
  ) : (
    <Flex direction='column' mb='4rem'>
      <Text
        fontFamily='gatwickLight'
        fontSize='8px'
        color='#DDB598'
        mb='1rem'
        textTransform='uppercase'
        letterSpacing='8px'
      >
        Your Gazers
      </Text>
      {!loading && myGazers.length == 0 ? (
        <Flex
          direction='column'
          alignItems='center'
          justifyContent='center'
          h='200px'
          bg='#white'
          borderTop='1px solid #DDB59866'
          borderLeft='1px solid #DDB59866'
          borderRight='1px solid #DDB59866'
          borderBottom='5px solid #DDB59866'
          mb='4rem'
        >
          <Text color='#59342B' fontFamily='nunito' fontSize='18px' mb='1rem'>
            You don't own any gazers..yet
          </Text>
          <Button
            color='#FF5C00'
            fontFamily='gatwickBold'
            border='1px solid #FF5C00'
            borderRadius='18px'
            px='25px'
            py='10px'
            bg='white'
            _hover={{
              bg: 'transparent'
            }}
            onClick={() => router.push('/mint')}
          >
            Mint gazers
          </Button>
        </Flex>
      ) : (
        <SimpleGrid columns='2' w='100%'>
          {currentItems.length > 0 &&
            currentItems.map((item) => <Gazer item={item} />)}
        </SimpleGrid>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Flex>
  );
};
