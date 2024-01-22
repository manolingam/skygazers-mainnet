'use client';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';
import { useQuery as useQueryTanstack } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  Flex,
  Text,
  Image as ChakraImage,
  SimpleGrid,
  Link as ChakraLink
} from '@chakra-ui/react';
import axios from 'axios';

import { Pagination } from '@/shared/Pagination';

import { BLOCKEXPLORE_BASE_URL } from '@/utils/constants';
import { getAccountString, formatHoursBefore } from '@/utils/helpers';
import { GetMintedNFTs } from '@/graphql/queries';

const ITEMS_PER_PAGE = 12;

const Gazer = ({ item, router }) => {
  const { chain } = useNetwork();

  return (
    <Flex
      key={item}
      direction='column'
      onClick={() => router.push(`/skygazer/${item.tokenId}`)}
      cursor='pointer'
    >
      <ChakraImage
        src={`https://skygazersimages.s3.eu-north-1.amazonaws.com/images/${item.tokenId}_660.jpeg`}
        w='250px'
        mr='20px'
      />
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
          bg={item.status === 'draft' ? 'rgba(255, 171, 123, 0.5)' : '#D9D9D9'}
          color='#59342B'
          mb='10px'
          p='3px 10px 3px 10px'
          mr='auto'
          textAlign='left'
        >
          {item.status}
        </Text>
        <Text
          fontSize='18px'
          textTransform='uppercase'
          color='#59342B'
          mb='10px'
          fontFamily='gatwickBold'
        >
          {item.title}
        </Text>
      </Flex>
    </Flex>
  );
};

export const MintedGazers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [mintedGazers, setMintedGazers] = useState([]);

  const router = useRouter();

  // const {
  //   isLoading: storiesLoading,
  //   isError: storiesError,
  //   data: stories,
  //   refetch: storiesRefetch,
  //   isFetching
  // } = useQueryTanstack({
  //   queryKey: ['stories'],
  //   queryFn: async () => {
  //     let { data } = await axios.post('/api/stories/retrieve');
  //     let { message } = data;

  //     return message;
  //   },

  //   enabled: true
  // });

  const {} = useQuery(GetMintedNFTs, {
    onCompleted: async (data) => {
      if (data.skyGazers) {
        let { data: dbData } = await axios.post('/api/stories/retrieve', {
          address: ''
        });
        let subgraphData = data?.skyGazers;
        dbData = dbData.message;

        let skygazers = [];

        subgraphData.forEach((itemB) => {
          let matchingElement = dbData.find(
            (itemA) => Number(itemA.gazer_id) === Number(itemB.tokenId)
          );

          if (matchingElement) {
            skygazers.push({
              tokenId: itemB.tokenId,
              owner: itemB.owner.address,
              status: 'draft',
              title: matchingElement.story.title,
              intro: matchingElement.story.intro,
              lastEdited: formatHoursBefore(matchingElement.updatedAt)
            });
          } else {
            skygazers.push({
              tokenId: itemB.tokenId,
              owner: itemB.owner.address,
              status: 'no draft yet',
              title: '',
              intro: '',
              lastEdited: ''
            });
          }
        });

        setMintedGazers(skygazers);
      } else {
        setMintedGazers(data?.skyGazers);
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
      <SimpleGrid columns='4' gap='5' w='80%'>
        {currentItems.length > 0 &&
          currentItems.map((item) => <Gazer item={item} router={router} />)}
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
