import { MutatingDots } from 'react-loader-spinner';
import { Flex } from '@chakra-ui/react';

export const SkyLoader = ({ color = '#DDB598' }) => (
  <Flex
    direction='column'
    justifyContent='center'
    alignItems='center'
    w='100%'
    h='100%'
    minH='34vh'
  >
    <MutatingDots
      height='100'
      width='100'
      color={color}
      secondaryColor={color}
      radius='12.5'
      ariaLabel='mutating-dots-loading'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
    />
  </Flex>
);
