import {
  Flex,
  Text,
  Divider,
  Image as ChakraImage,
  Link as ChakraLink,
  SimpleGrid,
  Button,
  Box,
  useToast
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAccount, useContractRead, useNetwork, useSignMessage } from 'wagmi';
import axios from 'axios';

import { MarkdownEditor } from '@/components/MarkdownEditor';
import { ModeSwitcher } from '@/components/ModeSwitcher';
import { MessageNote } from '@/components/MessageNote';
import { StoryEditor } from '@/components/StoryEditor';

import {
  SKYGAZERS_NFT_CONTRACT,
  BLOCKEXPLORE_BASE_URL
} from '@/utils/constants';
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

  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const { signMessage, isLoading: signaturePending } = useSignMessage({
    message: `I authorize my wallet ${address} to save my story for Gazer #${params.id}.`,
    onSuccess(signature) {
      saveStory(signature);
    }
  });

  const { data: owner } = useContractRead({
    address: SKYGAZERS_NFT_CONTRACT,
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

  const saveStory = async (signature) => {
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

    let { data } = await axios.post('/api/story/save', {
      storyData,
      signature,
      address,
      tokenId: params.id
    });

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
    <Flex
      direction='column'
      px={{ lg: '7.5vw', sm: '1rem' }}
      pb='4rem'
      pt={{ sm: '1rem' }}
    >
      {windowWidth > 700 && (
        <Box cursor='pointer' onClick={() => router.back()}>
          <Icons.ArrowLeftNav />
        </Box>
      )}

      <SimpleGrid columns={{ lg: 2, sm: 1 }} mt={{ lg: '2rem', sm: '1rem' }}>
        {!address && (
          <MessageNote
            message={
              'Please authenticate with your wallet to gain full access.'
            }
          />
        )}

        {address && (
          <Flex direction='column'>
            {owner?.toLowerCase() === address.toLowerCase() && (
              <>
                <ModeSwitcher
                  editMode={editMode}
                  setEditMode={setEditMode}
                  storyLoading={storyLoading}
                  storyError={storyError}
                  windowWidth={windowWidth}
                />
                <Divider
                  h='3px'
                  w='100%'
                  bg='rgba(221, 181, 152, 0.5)'
                  mb='2rem'
                  mt='10px'
                />
              </>
            )}

            {windowWidth < 700 && (
              <ChakraImage
                src={`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/images/${params.id}_660.jpeg`}
                w='350px'
              />
            )}

            <Text
              fontSize={{ lg: '14px', sm: '10px' }}
              fontFamily='gatwickBold'
              color='#59342B'
              my='10px'
            >
              # {params.id} | Owned by{' '}
              <ChakraLink
                href={`${BLOCKEXPLORE_BASE_URL}/address/${owner}`}
                isExternal
                textDecoration='underline'
              >
                {owner?.toLowerCase() === address.toLowerCase()
                  ? 'you'
                  : getAccountString(owner || '')}
              </ChakraLink>
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

        {windowWidth > 700 && (
          <ChakraImage
            src={`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/images/${params.id}_660.jpeg`}
            w='600px'
            ml='80px'
          />
        )}
      </SimpleGrid>

      {address && !storyLoading && (
        <>
          <MarkdownEditor
            ipfsHash={ipfsHash}
            editMode={editMode}
            setBody={setBody}
            body={body}
            windowWidth={windowWidth}
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
              mx={{ sm: 'auto', lg: '0' }}
              isDisabled={
                !editMode ||
                !title ||
                !intro ||
                !body ||
                savingDraft ||
                owner?.toLowerCase() !== address.toLowerCase()
              }
              isLoading={savingDraft || signaturePending}
              loadingText={
                signaturePending ? 'Signature pending..' : 'Saving draft..'
              }
              onClick={() => {
                signMessage();
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
