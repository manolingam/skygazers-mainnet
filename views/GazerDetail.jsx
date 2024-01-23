import {
  Flex,
  Text,
  Divider,
  Image as ChakraImage,
  SimpleGrid,
  Button,
  Box,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import axios from 'axios';

import { MarkdownEditor } from '@/components/MarkdownEditor';
import { ModeSwitcher } from '@/components/ModeSwitcher';
import { MessageNote } from '@/components/MessageNote';
import { StoryEditor } from '@/components/StoryEditor';

import { SKYGAZERS_NFT_CONTRACTS } from '@/utils/constants';
import { getAccountString } from '@/utils/helpers';

import SKYGAZER_ABI from '../abi/SkyGazer.json';
import Icons from '@/Icons';

export const GazerDetail = ({ params }) => {
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

  const { data: owner } = useContractRead({
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
    <Flex direction='column' px='10vw' pb='4rem'>
      <Box cursor='pointer' onClick={() => router.back()}>
        <Icons.ArrowLeftNav />
      </Box>

      <SimpleGrid columns='2' gap='10' mt='2rem'>
        {!address && (
          <MessageNote
            message={
              'Please authenticate with your wallet to gain full access.'
            }
          />
        )}

        {address && (
          <Flex direction='column'>
            <ModeSwitcher
              owner={owner}
              editMode={editMode}
              setEditMode={setEditMode}
              storyLoading={storyLoading}
              storyError={storyError}
            />
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
              <StoryEditor
                editMode={editMode}
                setTitle={setTitle}
                title={title}
                intro={intro}
                setIntro={setIntro}
              />
            ) : (
              <MessageNote
                message={`No story yet. ${
                  owner?.toLowerCase() === address.toLowerCase()
                    ? 'Write your first in edit mode.'
                    : ''
                }`}
              />
            )}
          </Flex>
        )}

        <ChakraImage
          src={`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/images/${params.id}_660.jpeg`}
          w='500px'
          float='right'
        />
      </SimpleGrid>

      {address && !storyLoading && (
        <>
          <MarkdownEditor
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
  );
};
