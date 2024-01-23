import { useAccount } from 'wagmi';
import { Flex, Text, Switch } from '@chakra-ui/react';

export const ModeSwitcher = ({
  owner,
  editMode,
  setEditMode,
  storyLoading,
  storyError
}) => {
  const { address } = useAccount();

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
      {owner?.toLowerCase() === address.toLowerCase() && (
        <>
          <Switch
            mx='10px'
            isChecked={editMode}
            isDisabled={
              storyLoading ||
              storyError ||
              owner?.toLowerCase() !== address.toLowerCase()
            }
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
        </>
      )}
    </Flex>
  );
};
