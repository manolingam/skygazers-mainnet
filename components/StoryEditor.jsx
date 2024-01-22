'use client';

import { Flex, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import StarterKit from '@tiptap/starter-kit';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';

export const StoryEditor = ({ setBody, body, editMode, ipfsHash }) => {
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [Document, StarterKit, Text, Underline],
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setBody(json);
    }
  });

  const fetchStory = async () => {
    setLoading(true);
    let ipfsData = await axios.get(
      `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/${ipfsHash}`
    );
    setBody(ipfsData.data.body);
    editor?.commands?.setContent(ipfsData.data.body);
    setLoading(false);
  };

  useEffect(() => {
    editor?.setOptions({ editable: editMode });
    editor?.view.update(editor?.view.props);
  }, [editMode, editor]);

  return (
    <>
      {body ? (
        <Flex
          direction='column'
          border={editMode ? '2px solid #59342B' : '2px solid transparent'}
          bg={!editMode ? 'rgba(221, 181, 152, 0.2)' : 'transparent'}
          borderRadius='2px'
          resize='none'
          w='70%'
          h='700px'
          mt='1rem'
          p='1rem'
          fontSize='18px'
          fontFamily='nunito'
          color='#59342B'
        >
          {editMode && (
            <Flex direction='row' mb='2rem' fontFamily='gatwick'>
              <Button
                bg={
                  editor?.isActive('bold')
                    ? 'rgba(221, 181, 152, 0.4)'
                    : 'transparent'
                }
                _hover={{ opacity: '0.8' }}
                onClick={() => {
                  editor.chain().focus().toggleBold().run();
                }}
              >
                B
              </Button>
              <Button
                bg={
                  editor?.isActive('italic')
                    ? 'rgba(221, 181, 152, 0.4)'
                    : 'transparent'
                }
                _hover={{ opacity: '0.8' }}
                onClick={() => {
                  editor.chain().focus().toggleItalic().run();
                }}
              >
                I
              </Button>
              <Button
                bg={
                  editor?.isActive('underline')
                    ? 'rgba(221, 181, 152, 0.4)'
                    : 'transparent'
                }
                _hover={{ opacity: '0.8' }}
                onClick={() => {
                  editor.chain().focus().toggleUnderline().run();
                }}
              >
                U
              </Button>
              {/* <Button
            bg='transparent'
            _hover={{ bg: 'transparent' }}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            Title
          </Button> */}
            </Flex>
          )}
          <EditorContent editor={editor} />
        </Flex>
      ) : ipfsHash ? (
        <Button
          border='1px solid'
          color='#FF5C00'
          py='25px'
          w='250px'
          h='60px'
          mt='2rem'
          borderRadius='30px'
          fontSize='16px'
          fontFamily='gatwickBold'
          _hover={{ opacity: '0.8' }}
          bg='transparent'
          onClick={() => fetchStory()}
          isLoading={loading}
        >
          Fetch Story
        </Button>
      ) : (
        <Flex
          direction='column'
          border={editMode ? '2px solid #59342B' : '2px solid transparent'}
          bg='transparent'
          borderRadius='2px'
          resize='none'
          w='70%'
          h='700px'
          mt='1rem'
          p='1rem'
          fontSize='18px'
          fontFamily='nunito'
          color='#59342B'
        >
          {editMode && (
            <Flex direction='row' mb='2rem' fontFamily='gatwick'>
              <Button
                bg={
                  editor?.isActive('bold')
                    ? 'rgba(221, 181, 152, 0.4)'
                    : 'transparent'
                }
                _hover={{ opacity: '0.8' }}
                onClick={() => {
                  editor.chain().focus().toggleBold().run();
                }}
              >
                B
              </Button>
              <Button
                bg={
                  editor?.isActive('italic')
                    ? 'rgba(221, 181, 152, 0.4)'
                    : 'transparent'
                }
                _hover={{ opacity: '0.8' }}
                onClick={() => {
                  editor.chain().focus().toggleItalic().run();
                }}
              >
                I
              </Button>
              <Button
                bg={
                  editor?.isActive('underline')
                    ? 'rgba(221, 181, 152, 0.4)'
                    : 'transparent'
                }
                _hover={{ opacity: '0.8' }}
                onClick={() => {
                  editor.chain().focus().toggleUnderline().run();
                }}
              >
                U
              </Button>
            </Flex>
          )}
          <EditorContent editor={editor} />
        </Flex>
      )}
    </>
  );
};
