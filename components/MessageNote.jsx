import { Flex, Text } from '@chakra-ui/react';

export const MessageNote = ({ message }) => {
  return (
    <Flex
      w='100%'
      h='180px'
      bg='rgba(100, 162, 220, 0.15)'
      p='2rem'
      mb='2rem'
      alignItems='center'
    >
      <Text
        w='70%'
        fontFamily='nunitoBold'
        fontSize='16px'
        textAlign='center'
        mx='auto'
        color='#3676D6'
      >
        {message}
      </Text>
    </Flex>
  );
};
