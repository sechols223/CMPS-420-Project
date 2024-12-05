import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  rem,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import classes from '../../CSS/HeaderMegaMenu.module.css';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import React, { useRef } from 'react';
import {
  IconCloudUpload,
  IconDownload,
  IconHeart,
  IconX,
} from '@tabler/icons-react';
import '../GalleryPage/Gallery-Page.module.css';
import '@mantine/dropzone/styles.css';
import { NavBar } from '@/components/NavBar/Nav-Bar';
import { useAsync } from 'react-use';
import { api } from '@/api';
import { ImageGetDto, PaginatedResponse } from '@/types';
import { ImageCard } from '@/components/image-card';

const userPhotos = [
  {
    id: 1,
    title: 'Chrysler',
    image:
      'https://media.istockphoto.com/id/1129615025/photo/street-view-of-the-chrysler-building-at-midtown-manhattan-new-york-city-usa.jpg?s=1024x1024&w=is&k=20&c=lJ7QP6oTp20xcw2NE3Y16GiN6PeA0OJZJCuJKRAgEv4=',
    tags: ['Chrysler Building', 'Skyscraper', 'NYC', 'Architecture'],
    isFavorite: true,
  },
  {
    id: 2,
    title: 'St. Louis Cathedral',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/19/StLouisCath.jpg',
    tags: [
      'New Orleans',
      'Architecture',
      'French Quarter',
      'Religious Building',
    ],
    isFavorite: true,
  },
  {
    id: 3,
    title: 'Bonnet Carre Spillway',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Army_Corps_operates_spillway_in_Louisiana.jpg/300px-Army_Corps_operates_spillway_in_Louisiana.jpg',
    tags: ['Louisiana', 'Bonnet Carre', 'Infrastructure'],
    isFavorite: true,
  },
  {
    id: 4,
    title: 'Statue of Unity',
    image:
      'https://preview.redd.it/the-statue-of-unity-in-india-it-is-the-tallest-statue-in-v0-db96pekttwda1.jpg?width=640&crop=smart&auto=webp&s=721e51614374f43c40be74d1cef63a2a30233af9',
    tags: ['Chrysler Building', 'Skyscraper', 'NYC'],
    isFavorite: true,
  },
  {
    id: 5,
    title: 'Utah Hoodoos',
    image:
      'https://img2.10bestmedia.com/Images/Photos/382106/GettyImages-512495588_55_660x440.jpg',
    tags: ['Chrysler Building', 'Skyscraper', 'NYC'],
    isFavorite: true,
  },
];

export default function GalleryPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();

  const fetchImages = useAsync(async () => {
    const response =
      await api.get<PaginatedResponse<ImageGetDto>>('/api/images');
    return response.data;
  }, []);

  return (
    <>
      <LoadingOverlay
        visible={fetchImages.loading}
        loaderProps={{ children: 'Loading...' }}
      />
      <Box pt={50}>
        <Center>
          <Group>
            <Center>
              <Stack>
                <Center>
                  <Title> Gallery </Title>
                </Center>
                <Group>
                  <MultiSelect
                    p={15}
                    classNames={{ pill: classes.pill }}
                    placeholder="Filter by tag(s)"
                    data={[]}
                    searchable
                    nothingFoundMessage="Nothing Found... :\"
                  />
                  <Modal opened={opened} onClose={close} centered radius="lg">
                    <div className={classes.wrapper}>
                      <Dropzone
                        openRef={openRef}
                        onDrop={() => {}}
                        className={classes.dropzone}
                        radius="md"
                        accept={[MIME_TYPES.pdf]}
                        maxSize={30 * 1024 ** 2}
                      >
                        <div style={{ pointerEvents: 'none' }}>
                          <Group justify="center">
                            <Dropzone.Accept>
                              <IconDownload
                                style={{ width: rem(50), height: rem(50) }}
                                color={theme.colors.blue[6]}
                                stroke={1.5}
                              />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                              <IconX
                                style={{ width: rem(50), height: rem(50) }}
                                color={theme.colors.red[6]}
                                stroke={1.5}
                              />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                              <IconCloudUpload
                                style={{ width: rem(50), height: rem(50) }}
                                stroke={1.5}
                              />
                            </Dropzone.Idle>
                          </Group>

                          <Text ta="center" fw={700} fz="lg" mt="xl">
                            <Dropzone.Accept>Drop files here</Dropzone.Accept>
                            <Dropzone.Reject>
                              Pdf file less than 30mb
                            </Dropzone.Reject>
                            <Dropzone.Idle>Upload Picture(s)</Dropzone.Idle>
                          </Text>
                          <Text ta="center" fz="sm" mt="xs" c="dimmed">
                            Pssss... You can upload up to 8 images at a time!
                          </Text>
                        </div>
                      </Dropzone>
                      <Space h="xs" />
                      <Flex justify="center">
                        <Button
                          className={classes.navButton}
                          size="md"
                          radius="xl"
                          onClick={() => openRef.current?.()}
                          style={{
                            backgroundColor: '#ff914d',
                            color: '#39445a',
                            fontWeight: 'bold',
                          }}
                        >
                          Select files
                        </Button>
                      </Flex>
                    </div>
                  </Modal>
                  <Button
                    onClick={open}
                    style={{
                      backgroundColor: '#ff914d',
                      color: '#39445a',
                      fontWeight: 'bold',
                    }}
                    className={classes.navButton}
                  >
                    Upload Photo
                  </Button>
                </Group>
                <SimpleGrid cols={{ base: 3, sm: 2 }}>
                  {fetchImages.value?.items.map((image) => (
                    <div style={{ position: 'relative' }}>
                      <ImageCard image={image} />
                      <ActionIcon
                        variant="filled"
                        size="lg"
                        radius="xl"
                        style={{
                          position: 'absolute',
                          bottom: '25px',
                          right: '25px',
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          zIndex: 2,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <IconHeart
                          style={{ width: '70%', height: '70%' }}
                          color="gray"
                        />
                      </ActionIcon>
                    </div>
                  ))}
                </SimpleGrid>
              </Stack>
            </Center>
          </Group>
        </Center>
      </Box>
    </>
  );
}
