import {
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  CheckboxGroup,
  Stack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { SKYGAZERS } from '@/data/traitsMap';
import { traitFilterMap } from '@/utils/constants';

export const Filter = ({ setFilteredGazers, windowWidth }) => {
  const [faceTops, setFaceTops] = useState([]);
  const [faceBottom, setFaceBottom] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [situation, setSituation] = useState([]);
  const [location, setLocation] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const replaceArrayValues = (array, map) => {
      return array.map((item) => (map[item] !== undefined ? map[item] : item));
    };

    const filterSubarrays = (array, index, values) => {
      return array.filter((subarray) =>
        values.some((value) => subarray[index] === value)
      );
    };

    let faceTopIndex = traitFilterMap.faceTop.index;
    let faceBottomIndex = traitFilterMap.faceBottom.index;
    let clothingIndex = traitFilterMap.clothing.index;
    let situationIndex = traitFilterMap.situation.index;
    let locationIndex = traitFilterMap.location.index;

    const updatedFaceTops = replaceArrayValues(
      faceTops,
      traitFilterMap.faceTop.map
    );
    const updatedFaceBottom = replaceArrayValues(
      faceBottom,
      traitFilterMap.faceBottom.map
    );
    const updatedClothing = replaceArrayValues(
      clothing,
      traitFilterMap.clothing.map
    );
    const updatedSituation = replaceArrayValues(
      situation,
      traitFilterMap.situation.map
    );
    const updatedLocation = replaceArrayValues(
      location,
      traitFilterMap.location.map
    );

    let filteredResults = SKYGAZERS;

    if (updatedFaceTops.length > 0) {
      filteredResults = filterSubarrays(
        SKYGAZERS,
        faceTopIndex,
        updatedFaceTops
      );
    }

    if (updatedFaceBottom.length > 0) {
      filteredResults = filterSubarrays(
        filteredResults.length > 0 ? filteredResults : SKYGAZERS,
        faceBottomIndex,
        updatedFaceBottom
      );
    }

    if (updatedClothing.length > 0) {
      filteredResults = filterSubarrays(
        filteredResults.length > 0 ? filteredResults : SKYGAZERS,
        clothingIndex,
        updatedClothing
      );
    }

    if (updatedSituation.length > 0) {
      filteredResults = filterSubarrays(
        filteredResults.length > 0 ? filteredResults : SKYGAZERS,
        situationIndex,
        updatedSituation
      );
    }

    if (updatedLocation.length > 0) {
      filteredResults = filterSubarrays(
        filteredResults.length > 0 ? filteredResults : SKYGAZERS,
        locationIndex,
        updatedLocation
      );
    }
    setFilteredGazers(filteredResults);
  }, [faceTops, faceBottom, clothing, situation, location]);

  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      mt={{ lg: '1rem', sm: '0' }}
      mx='auto'
    >
      {windowWidth > 700 && (
        <Accordion w='100%' allowToggle>
          <AccordionItem outline='none' border='none'>
            <Stack direction='column' alignItems='end'>
              <AccordionButton
                fontFamily='nunito'
                justifyContent='center'
                _hover={{ bg: 'transparent' }}
                pb='0'
              >
                <AccordionIcon />
                <Text
                  color='rgba(89, 52, 43, 1)'
                  fontFamily='nunito'
                  fontSize='16px'
                  textDecoration='underline'
                  ml='5px'
                >
                  filter & sort
                </Text>
              </AccordionButton>
              <Text
                fontFamily='nunito'
                fontSize='12px'
                cursor='pointer'
                mx='auto'
                onClick={() => {
                  setFilteredGazers(SKYGAZERS);
                  setFaceTops([]);
                  setFaceBottom([]);
                  setClothing([]);
                  setSituation([]);
                  setLocation([]);
                }}
              >
                reset filter
              </Text>
            </Stack>

            <AccordionPanel pb={4}>
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <AccordionButton fontFamily='nunitoBold'>
                    Face top
                    <AccordionIcon ml='auto' />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <CheckboxGroup
                      onChange={(e) => setFaceTops(e)}
                      value={faceTops}
                    >
                      <Stack direction='column'>
                        <Checkbox value='1.1'>1.1</Checkbox>
                        <Checkbox value='1.2'>1.2</Checkbox>
                        <Checkbox value='1.3'>1.3</Checkbox>
                        <Checkbox value='1.4'>1.4</Checkbox>
                        <Checkbox value='1.5'>1.5</Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton fontFamily='nunitoBold'>
                    Face bottom
                    <AccordionIcon ml='auto' />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <CheckboxGroup
                      onChange={(e) => setFaceBottom(e)}
                      value={faceBottom}
                    >
                      <Stack direction='column'>
                        <Checkbox value='2.1'>2.1</Checkbox>
                        <Checkbox value='2.2'>2.2</Checkbox>
                        <Checkbox value='2.3'>2.3</Checkbox>
                        <Checkbox value='2.4'>2.4</Checkbox>
                        <Checkbox value='2.5'>2.5</Checkbox>
                        <Checkbox value='2.6'>2.6</Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton fontFamily='nunitoBold'>
                    Clothing
                    <AccordionIcon ml='auto' />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <CheckboxGroup
                      onChange={(e) => setClothing(e)}
                      value={clothing}
                    >
                      <Stack direction='column'>
                        <Checkbox value='3.1'>3.1</Checkbox>
                        <Checkbox value='3.2'>3.2</Checkbox>
                        <Checkbox value='3.3'>3.3</Checkbox>
                        <Checkbox value='3.4'>3.4</Checkbox>
                        <Checkbox value='3.5'>3.5</Checkbox>
                        <Checkbox value='3.6'>3.6</Checkbox>
                        <Checkbox value='3.7'>3.7</Checkbox>
                        <Checkbox value='3.9'>3.9</Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton fontFamily='nunitoBold'>
                    Situation
                    <AccordionIcon ml='auto' />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <CheckboxGroup
                      onChange={(e) => setSituation(e)}
                      value={situation}
                    >
                      <Stack direction='column'>
                        <Checkbox value='5.1'>5.1</Checkbox>
                        <Checkbox value='5.2'>5.2</Checkbox>
                        <Checkbox value='5.3'>5.3</Checkbox>
                        <Checkbox value='5.4'>5.4</Checkbox>
                        <Checkbox value='5.5'>5.5</Checkbox>
                        <Checkbox value='5.6'>5.6</Checkbox>
                        <Checkbox value='5.7'>5.7</Checkbox>
                        <Checkbox value='5.8'>5.8</Checkbox>
                        <Checkbox value='5.9'>5.9</Checkbox>
                        <Checkbox value='5.10'>5.10</Checkbox>
                        <Checkbox value='5.11'>5.11</Checkbox>
                        <Checkbox value='5.12'>5.12</Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton fontFamily='nunitoBold'>
                    Location
                    <AccordionIcon ml='auto' />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <CheckboxGroup
                      onChange={(e) => setLocation(e)}
                      value={location}
                    >
                      <Stack direction='column'>
                        <Checkbox value='6.1'>6.1</Checkbox>
                        <Checkbox value='6.2'>6.2</Checkbox>
                        <Checkbox value='6.3'>6.3</Checkbox>
                        <Checkbox value='6.4'>6.4</Checkbox>
                        <Checkbox value='6.5'>6.5</Checkbox>
                        <Checkbox value='6.6'>6.6</Checkbox>
                        <Checkbox value='6.7'>6.7</Checkbox>
                        <Checkbox value='6.8'>6.8</Checkbox>
                        <Checkbox value='6.9'>6.9</Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}

      {windowWidth < 700 && (
        <>
          <Text
            fontFamily='nunito'
            textDecoration='underline'
            cursor='pointer'
            mr='10px'
            onClick={() => setIsModalOpen(true)}
          >
            filter & sort
          </Text>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent minH='450px' mx='2rem'>
              <ModalBody
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
              >
                <Accordion w='100%' allowToggle>
                  <AccordionItem>
                    <AccordionButton fontFamily='nunitoBold'>
                      Face top
                      <AccordionIcon ml='auto' />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <CheckboxGroup
                        onChange={(e) => setFaceTops(e)}
                        value={faceTops}
                      >
                        <Stack direction='column'>
                          <Checkbox value='1.1'>1.1</Checkbox>
                          <Checkbox value='1.2'>1.2</Checkbox>
                          <Checkbox value='1.3'>1.3</Checkbox>
                          <Checkbox value='1.4'>1.4</Checkbox>
                          <Checkbox value='1.5'>1.5</Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionButton fontFamily='nunitoBold'>
                      Face bottom
                      <AccordionIcon ml='auto' />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <CheckboxGroup
                        onChange={(e) => setFaceBottom(e)}
                        value={faceBottom}
                      >
                        <Stack direction='column'>
                          <Checkbox value='2.1'>2.1</Checkbox>
                          <Checkbox value='2.2'>2.2</Checkbox>
                          <Checkbox value='2.3'>2.3</Checkbox>
                          <Checkbox value='2.4'>2.4</Checkbox>
                          <Checkbox value='2.5'>2.5</Checkbox>
                          <Checkbox value='2.6'>2.6</Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionButton fontFamily='nunitoBold'>
                      Clothing
                      <AccordionIcon ml='auto' />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <CheckboxGroup
                        onChange={(e) => setClothing(e)}
                        value={clothing}
                      >
                        <Stack direction='column'>
                          <Checkbox value='3.1'>3.1</Checkbox>
                          <Checkbox value='3.2'>3.2</Checkbox>
                          <Checkbox value='3.3'>3.3</Checkbox>
                          <Checkbox value='3.4'>3.4</Checkbox>
                          <Checkbox value='3.5'>3.5</Checkbox>
                          <Checkbox value='3.6'>3.6</Checkbox>
                          <Checkbox value='3.7'>3.7</Checkbox>
                          <Checkbox value='3.9'>3.9</Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionButton fontFamily='nunitoBold'>
                      Situation
                      <AccordionIcon ml='auto' />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <CheckboxGroup
                        onChange={(e) => setSituation(e)}
                        value={situation}
                      >
                        <Stack direction='column'>
                          <Checkbox value='5.1'>5.1</Checkbox>
                          <Checkbox value='5.2'>5.2</Checkbox>
                          <Checkbox value='5.3'>5.3</Checkbox>
                          <Checkbox value='5.4'>5.4</Checkbox>
                          <Checkbox value='5.5'>5.5</Checkbox>
                          <Checkbox value='5.6'>5.6</Checkbox>
                          <Checkbox value='5.7'>5.7</Checkbox>
                          <Checkbox value='5.8'>5.8</Checkbox>
                          <Checkbox value='5.9'>5.9</Checkbox>
                          <Checkbox value='5.10'>5.10</Checkbox>
                          <Checkbox value='5.11'>5.11</Checkbox>
                          <Checkbox value='5.12'>5.12</Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionButton fontFamily='nunitoBold'>
                      Location
                      <AccordionIcon ml='auto' />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <CheckboxGroup
                        onChange={(e) => setLocation(e)}
                        value={location}
                      >
                        <Stack direction='column'>
                          <Checkbox value='6.1'>6.1</Checkbox>
                          <Checkbox value='6.2'>6.2</Checkbox>
                          <Checkbox value='6.3'>6.3</Checkbox>
                          <Checkbox value='6.4'>6.4</Checkbox>
                          <Checkbox value='6.5'>6.5</Checkbox>
                          <Checkbox value='6.6'>6.6</Checkbox>
                          <Checkbox value='6.7'>6.7</Checkbox>
                          <Checkbox value='6.8'>6.8</Checkbox>
                          <Checkbox value='6.9'>6.9</Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </Flex>
  );
};
