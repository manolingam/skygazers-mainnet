import { Textarea } from '@chakra-ui/react';

export const StoryEditor = ({ editMode, setTitle, title, setIntro, intro }) => {
  return (
    <>
      <Textarea
        border={editMode ? '2px solid #59342B' : '2px solid transparent'}
        _hover={{ outline: 'none' }}
        _focus={{
          outline: 'none',
          border: editMode
            ? '2px solid rgba(89, 52, 43, 1)'
            : '2px solid transparent'
        }}
        borderRadius='2px'
        resize='none'
        maxH='260px'
        h={editMode ? '260px' : 'auto'}
        value={title}
        placeholder='Story title here..'
        mb='1rem'
        fontSize={{ lg: '42px', sm: '26px' }}
        fontFamily='gatwickBold'
        color='#59342B'
        isReadOnly={!editMode}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        maxH='400px'
        h={editMode ? '400px' : '196px'}
        border={
          editMode ? '2px solid rgba(89, 52, 43, 1)' : '2px solid transparent'
        }
        _hover={{ outline: 'none' }}
        _focus={{
          outline: 'none',
          border: editMode
            ? '2px solid rgba(89, 52, 43, 1)'
            : '2px solid transparent'
        }}
        borderRadius='2px'
        resize='none'
        value={intro}
        placeholder='Story intro here..'
        fontSize={{ lg: '24px', sm: '18px' }}
        fontFamily='gatwick'
        color='#59342B'
        isReadOnly={!editMode}
        onChange={(e) => setIntro(e.target.value)}
      />
    </>
  );
};
