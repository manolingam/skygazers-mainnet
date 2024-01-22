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
  Box,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import axios from 'axios';

import { Header } from '@/shared/Header';
import { Footer } from '@/shared/Footer';
import { StoryEditor } from '@/components/StoryEditor';
import Icons from '@/Icons';

import { SKYGAZERS_NFT_CONTRACTS } from '@/utils/constants';
import { getAccountString } from '@/utils/helpers';

import SKYGAZER_ABI from '../../../abi/SkyGazer.json';

export default function SkyGazerPage({ params }) {
  const [editMode, setEditMode] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);

  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [body, setBody] = useState('');

  const router = useRouter();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const toast = useToast();

  const { data: owner, isError } = useContractRead({
    address: SKYGAZERS_NFT_CONTRACTS[chain?.id],
    abi: SKYGAZER_ABI,
    functionName: 'ownerOf',
    cacheOnBlock: true,
    args: [params.id]
  });

  const { isLoading: storyLoading, isError: storyError } = useQuery({
    queryKey: ['story', params.id],
    queryFn: async () => {
      let dbData = await axios.post('/api/story/retrieve', {
        gazer_id: Number(params.id)
      });
      let { message } = dbData.data;

      if (message) {
        setTitle(message.story.title);
        setIntro(message.story.intro);

        setIpfsHash(
          message.ipfs_hash_history[message.ipfs_hash_history.length - 1]
        );
      }

      return message;
    },

    enabled: params.id ? true : false
  });

  const saveStory = async () => {
    setSavingDraft(true);

    let storyData = {
      gazer_id: Number(params.id),
      owner: address,
      story: {
        title: title,
        intro: intro,
        body: body,
        status: 'draft'
      }
    };

    let { data } = await axios.post('/api/story/save', { storyData });

    setSavingDraft(false);

    if (data.message !== 'error') {
      toast({
        title: 'Draft saved.',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } else {
      toast({
        title: 'Error saving draft.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <Flex direction='column' minH='100vh'>
      <Header />
      <Flex direction='column' px='10vw' pb='4rem'>
        <Box cursor='pointer' onClick={() => router.back()}>
          <Icons.ArrowLeftNav />
        </Box>

        <SimpleGrid columns='2' gap='10' mt='2rem'>
          {!address ? (
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
                Please authenticate with your wallet to gain full access.
              </Text>
            </Flex>
          ) : (
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
              </Flex>
              <Divider h='3px' w='100%' bg='#DDB598' mb='2rem' mt='10px' />
              <Text
                fontSize='14px'
                fontFamily='gatwickBold'
                color='#59342B'
                mb='10px'
              >
                # {params.id} | Owned by{' '}
                {owner?.toLowerCase() === address.toLowerCase()
                  ? 'you'
                  : getAccountString(owner || '')}
              </Text>
              {!storyLoading && (intro || editMode) ? (
                <>
                  <Textarea
                    border={
                      editMode ? '2px solid #59342B' : '2px solid transparent'
                    }
                    bg={!editMode ? 'rgba(221, 181, 152, 0.2)' : 'transparent'}
                    _hover={{ outline: 'none' }}
                    _focus={{
                      outline: 'none',
                      border: editMode
                        ? '2px solid rgba(89, 52, 43, 1)'
                        : '2px solid transparent'
                    }}
                    borderRadius='2px'
                    resize='none'
                    h='260px'
                    value={title}
                    placeholder='Story title here..'
                    mb='1rem'
                    fontSize='42px'
                    fontFamily='gatwickBold'
                    color='#59342B'
                    isReadOnly={!editMode}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    h='400px'
                    border={
                      editMode
                        ? '2px solid rgba(89, 52, 43, 1)'
                        : '2px solid transparent'
                    }
                    _hover={{ outline: 'none' }}
                    _focus={{
                      outline: 'none',
                      border: editMode
                        ? '2px solid rgba(89, 52, 43, 1)'
                        : '2px solid transparent'
                    }}
                    bg={!editMode ? 'rgba(221, 181, 152, 0.2)' : 'transparent'}
                    borderRadius='2px'
                    resize='none'
                    value={intro}
                    placeholder='Story intro here..'
                    fontSize='24px'
                    fontFamily='gatwick'
                    color='#59342B'
                    isReadOnly={!editMode}
                    onChange={(e) => setIntro(e.target.value)}
                  />
                </>
              ) : (
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
                    No story yet. Write your first in edit mode.
                  </Text>
                </Flex>
              )}
            </Flex>
          )}
          <ChakraImage src='/placeholder.png' w='500px' float='right' />
        </SimpleGrid>
        {address && !storyLoading && (
          <>
            <StoryEditor
              ipfsHash={ipfsHash}
              editMode={editMode}
              setBody={setBody}
              body={body}
            />

            {(editMode || body) && (
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
                isDisabled={
                  !editMode ||
                  !title ||
                  !intro ||
                  !body ||
                  savingDraft ||
                  owner?.toLowerCase() !== address.toLowerCase()
                }
                isLoading={savingDraft}
                loadingText='Saving draft..'
                onClick={() => {
                  saveStory();
                }}
              >
                Save draft
              </Button>
            )}
          </>
        )}
      </Flex>
      <Footer />
    </Flex>
  );
}
