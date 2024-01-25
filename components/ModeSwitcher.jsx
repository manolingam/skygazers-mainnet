import { Flex, Text, Switch } from '@chakra-ui/react';

export const ModeSwitcher = ({
  editMode,
  setEditMode,
  storyLoading,
  storyError
}) => {
  return (
    <Flex direction='row' alignItems='center'>
      <Text
        fontSize='14px'
        fontFamily='gatwickBold'
        color='#59342B'
        textTransform='uppercase'
      >
        Preview
      </Text>
      <Switch
        mx='10px'
        isChecked={editMode}
        isDisabled={storyLoading || storyError}
        onChange={() => setEditMode(!editMode)}
      />
      <Text
        fontSize='14px'
        fontFamily='gatwickBold'
        color='#FF5C00'
        textTransform='uppercase'
      >
        Edit mode
      </Text>
    </Flex>
  );
};
