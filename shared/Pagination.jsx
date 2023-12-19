import { Flex, Text, Button } from '@chakra-ui/react';

import Icons from '../Icons';

export const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
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
        <Text
          mx='14px'
          fontWeight='bold'
          color='#59342b'
          textTransform='uppercase'
          fontSize='12px'
        >
          Page {currentPage} of {totalPages}
        </Text>
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
