import { Flex, Text, Switch } from '@chakra-ui/react';

export const ModeSwitcher = ({
  editMode,
  setEditMode,
  storyLoading,
  storyError,
  windowWidth
}) => {
  return (
    <Flex direction='row' alignItems='center'>
      <Text
        fontSize={{ lg: '14px', sm: '10px' }}
        fontFamily='gatwickBold'
        color='#59342B'
        textTransform='uppercase'
      >
        Preview
      </Text>

      {windowWidth < 700 ? (
        <Switch
          mx='10px'
          size='sm'
          isChecked={editMode}
          isDisabled={storyLoading || storyError}
          onChange={() => setEditMode(!editMode)}
        />
      ) : (
        <Switch
          mx='10px'
          isChecked={editMode}
          isDisabled={storyLoading || storyError}
          onChange={() => setEditMode(!editMode)}
        />
      )}
      <Text
        fontSize={{ lg: '14px', sm: '10px' }}
        fontFamily='gatwickBold'
        color='#FF5C00'
        textTransform='uppercase'
      >
        Edit mode
      </Text>
    </Flex>
  );
};
