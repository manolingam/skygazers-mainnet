import {
  Flex,
  Text,
  Button,
  NumberInput,
  NumberInputField
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import Icons from '../Icons';

export const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const [pageInput, setPageInput] = useState(currentPage);

  useEffect(() => {
    if (pageInput > 0 && pageInput <= totalPages) setCurrentPage(pageInput);
  }, [pageInput]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <Flex
      direction='row'
      alignItems='center'
      justifyContent='center'
      mt='10px'
      fontFamily='gatwick'
    >
      <Button
        isDisabled={currentPage - 1 == 0}
        onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
        bg='transparent'
        _hover={{ bg: 'transparent' }}
      >
        <Icons.Arrowprev width='10px' />
      </Button>
      {totalPages > 0 && (
        <Flex direction='row' alignItems='center'>
          <Text
            mx='14px'
            fontWeight='bold'
            color='#59342b'
            textTransform='uppercase'
            fontSize='12px'
          >
            Page
          </Text>
          <NumberInput
            w='100px'
            border='1px solid rgba(89, 52, 43, 1)'
            borderRadius='5px'
            outline='none'
            value={!pageInput ? '' : currentPage}
            min={1}
            max={totalPages}
            onChange={(e) => {
              setPageInput(Number(e));
            }}
          >
            <NumberInputField />
          </NumberInput>
          <Text
            mx='14px'
            fontWeight='bold'
            color='#59342b'
            textTransform='uppercase'
            fontSize='12px'
          >
            of {totalPages}
          </Text>
        </Flex>
      )}
      <Button
        isDisabled={currentPage + 1 > totalPages}
        onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
        bg='transparent'
        _hover={{ bg: 'transparent' }}
      >
        <Icons.Arrownext width='20px' />
      </Button>
    </Flex>
  );
};
