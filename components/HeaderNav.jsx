import {
  Flex,
  Button,
  Image as ChakraImage,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent
} from '@chakra-ui/react';
import { useState } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';

export const HeaderNav = ({ windowWidth }) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {(!params?.id || windowWidth < 700) && (
        <Flex
          h={{ sm: '64px', lg: 'auto' }}
          direction='row'
          alignItems={{ lg: 'flex-start', sm: 'flex-end' }}
          justifyContent='space-between'
          pb={{ lg: '3rem', sm: '0' }}
          px={{ lg: '7.5vw', sm: '1rem' }}
        >
          <Flex direction='row' w='80%'>
            {windowWidth > 740 ? (
              <ChakraImage
                src='/logo.svg'
                w='275px'
                h='175px'
                mr='2rem'
                mb='10px'
              />
            ) : (
              <ChakraImage src='/logo_mobile.png' w='50px' h='19px' mr='15px' />
            )}

            {windowWidth > 700 ? (
              <Flex direction='column' alignItems='flex-start'>
                <Button
                  textTransform='uppercase'
                  mt='auto'
                  bg='transparent'
                  color={pathname === '/' ? '#FF5C00' : '#DDB598'}
                  fontFamily='gatwickBold'
                  fontSize='24px'
                  _hover={{
                    bg: 'transparent',
                    color: '#FF5C00'
                  }}
                  onClick={() => {
                    pathname !== '/' && router.push('/');
                  }}
                >
                  Home
                </Button>
                <Flex direction='row'>
                  <Button
                    textTransform='uppercase'
                    fontSize='24px'
                    mt='auto'
                    fontFamily='gatwickBold'
                    color={pathname === '/mint' ? '#FF5C00' : '#DDB598'}
                    bg='transparent'
                    _hover={{
                      bg: 'transparent',
                      color: '#FF5C00'
                    }}
                    onClick={() => {
                      pathname !== '/mint' && router.push('/mint');
                    }}
                  >
                    Mint
                  </Button>
                  <Button
                    textTransform='uppercase'
                    mt='auto'
                    bg='transparent'
                    color='#DDB598'
                    fontFamily='gatwickBold'
                    fontSize='24px'
                    _hover={{
                      bg: 'transparent'
                    }}
                    isDisabled
                  >
                    Lore
                  </Button>
                  <Button
                    textTransform='uppercase'
                    mt='auto'
                    bg='transparent'
                    color='#DDB598'
                    fontFamily='gatwickBold'
                    fontSize='24px'
                    _hover={{
                      bg: 'transparent'
                    }}
                    isDisabled
                  >
                    Proposals
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <ChakraImage
                src='/ham_icon.png'
                w='26px'
                h='19px'
                mt='auto'
                onClick={() => setMenuOpen(!menuOpen)}
              />
            )}
          </Flex>

          <Drawer
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            placement='left'
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerBody>
                <Flex direction='column' alignItems='start' mt='3rem'>
                  <Button
                    textTransform='uppercase'
                    mt='auto'
                    bg='transparent'
                    color={pathname === '/' ? '#FF5C00' : '#DDB598'}
                    fontFamily='gatwickBold'
                    fontSize='20px'
                    _hover={{
                      bg: 'transparent',
                      color: '#FF5C00'
                    }}
                    onClick={() => {
                      pathname !== '/' && router.push('/');
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    textTransform='uppercase'
                    fontSize='20px'
                    mt='auto'
                    fontFamily='gatwickBold'
                    color={pathname === '/mint' ? '#FF5C00' : '#DDB598'}
                    bg='transparent'
                    _hover={{
                      bg: 'transparent',
                      color: '#FF5C00'
                    }}
                    onClick={() => {
                      pathname !== '/mint' && router.push('/mint');
                    }}
                  >
                    Mint
                  </Button>
                  <Button
                    textTransform='uppercase'
                    mt='auto'
                    bg='transparent'
                    color='#DDB598'
                    fontFamily='gatwickBold'
                    fontSize='20px'
                    _hover={{
                      bg: 'transparent'
                    }}
                    isDisabled
                  >
                    Lore
                  </Button>
                  <Button
                    textTransform='uppercase'
                    mt='auto'
                    bg='transparent'
                    color='#DDB598'
                    fontFamily='gatwickBold'
                    fontSize='20px'
                    _hover={{
                      bg: 'transparent'
                    }}
                    isDisabled
                  >
                    Proposals
                  </Button>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      )}
    </>
  );
};
