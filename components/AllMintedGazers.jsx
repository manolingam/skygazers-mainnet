'use client';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';
import { getAccountString } from '@/utils/helpers';
import {
  Flex,
  Text,
  Image as ChakraImage,
  SimpleGrid,
  Link as ChakraLink
} from '@chakra-ui/react';

import { BLOCKEXPLORE_BASE_URL } from '@/utils/constants';
import { Pagination } from '@/shared/Pagination';
import { GetMintedNFTs } from '@/graphql/queries';

const ITEMS_PER_PAGE = 12;

const Gazer = ({ item }) => {
  const { chain } = useNetwork();
  const { address } = useAccount();

  return (
    <Flex key={item} direction='column'>
      <ChakraImage src='/placeholder.png' w='250px' mr='20px' />
      <Flex direction='column'>
        <Text fontSize='10px' color='#59342B' my='10px'>
          # {item.tokenId} | Owned by{' '}
          <ChakraLink
            textDecoration='underline'
            href={`${BLOCKEXPLORE_BASE_URL[chain?.id]}/address/${
              item.owner.address
            }`}
          >
            {getAccountString(item.owner.address || '')}
          </ChakraLink>
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
          </Text> */}
      </Flex>
    </Flex>
  );
};

export const AllMintedGazers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [mintedGazers, setMintedGazers] = useState([]);

  const {} = useQuery(GetMintedNFTs, {
    onCompleted: (data) => {
      setMintedGazers(data?.skyGazers);
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
    cropRecords(mintedGazers);
  }, [currentPage]);

  useEffect(() => {
    if (mintedGazers.length > 0) cropRecords(mintedGazers, 1);
  }, [mintedGazers]);

  return (
    <>
      <Text
        fontFamily='gatwickLight'
        fontSize='8px'
        color='#DDB598'
        mb='1rem'
        textTransform='uppercase'
        letterSpacing='8px'
      >
        All Gazers
      </Text>
      <SimpleGrid columns='4' gap='5' w='100%'>
        {currentItems.length > 0 &&
          currentItems.map((item) => <Gazer item={item} />)}
      </SimpleGrid>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};
