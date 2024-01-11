'use client';

import {
  Flex,
  Text,
  Divider,
  Image as ChakraImage,
  Switch,
  SimpleGrid,
  Textarea,
  Button,
  Box
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Footer } from '@/shared/Footer';
import Icons from '@/Icons';

export default function SkyGazer({ params }) {
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [body, setBody] = useState('');

  const router = useRouter();
  const {
    isLoading: storyLoading,
    isError: storyError,
    data: story,
    refetch: stroyRefetch,
    isFetching
  } = useQuery({
    queryKey: ['story', params.id],
    queryFn: async () => {
      let { data } = await axios.post('/api/story/retrieve', {
        gazer_id: Number(params.id)
      });
      let { message } = data;

      if (message) {
        setTitle(message.story.title);
        setIntro(message.story.intro);
        setBody(message.story.body);
      }

      return message;
    },

    enabled: params.id ? true : false
  });

  const saveStory = async () => {
    let storyData = {
      gazer_id: Number(params.id),
      story: {
        title: title,
        intro: intro,
        body: body,
        status: 'draft'
      },
      ipfs_hash: ''
    };

    let { data } = await axios.post('/api/story/save', { storyData });
  };

  return (
    <Flex direction='column' minH='100vh'>
      <Flex direction='column' py='4rem' px='10vw'>
        <Box cursor='pointer' onClick={() => router.back()}>
          {' '}
          <Icons.ArrowLeftNav />
        </Box>

        <SimpleGrid columns='2' gap='10' mt='2rem'>
          <Flex direction='column'>
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
            <Divider h='3px' w='100%' bg='#DDB598' mb='2rem' mt='10px' />
            <Text
              fontSize='14px'
              fontFamily='gatwickBold'
              color='#59342B'
              mb='10px'
            >
              # {params.id} | Owned by you
            </Text>
            <Textarea
              border={editMode ? '1px solid #59342B' : 'none'}
              borderRadius='2px'
              resize='none'
              h='260px'
              value={title}
              mb='1rem'
              fontSize='42px'
              fontFamily='gatwickBold'
              color='#59342B'
              isReadOnly={!editMode}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              h='400px'
              border={editMode ? '1px solid #59342B' : 'none'}
              borderRadius='2px'
              resize='none'
              value={intro}
              fontSize='24px'
              fontFamily='gatwick'
              color='#59342B'
              isReadOnly={!editMode}
              onChange={(e) => setIntro(e.target.value)}
            />
          </Flex>
          <ChakraImage src='/placeholder.png' w='500px' />
        </SimpleGrid>
        <Textarea
          border={editMode ? '1px solid #59342B' : 'none'}
          borderRadius='2px'
          resize='none'
          w='70%'
          h='700px'
          isReadOnly={!editMode}
          value={body}
          mt='1rem'
          fontSize='18px'
          fontFamily='nunito'
          color='#59342B'
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          bg='#5DE2A2'
          color='white'
          w='250px'
          h='60px'
          borderRadius='30px'
          fontSize='16px'
          fontFamily='gatwickBold'
          _hover={{ opacity: '0.8' }}
          my='2rem'
          isDisabled={!editMode || !title || !intro || !body}
          onClick={() => {
            saveStory();
          }}
        >
          Save draft
        </Button>
      </Flex>
      <Footer />
    </Flex>
  );
}
