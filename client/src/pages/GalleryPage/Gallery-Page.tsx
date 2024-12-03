import {
  Box,
  Button,
  Center,
  CheckIcon,
  Combobox,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Pill,
  PillsInput,
  rem,
  SimpleGrid,
  Slider,
  Space,
  Stack,
  TagsInput,
  Text,
  Title,
  useCombobox,
  useMantineTheme,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import React, { useRef, useState } from 'react';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import classes from '../GalleryPage/Gallery-Page.module.css';
import '@mantine/dropzone/styles.css';
import { NavBar } from '@/components/NavBar/Nav-Bar';
import { useAsync } from 'react-use';
import { api } from '@/api';
import { ImageGetDto, PaginatedResponse, TagGetDto } from '@/types';
import { ImageCard } from '@/components/image-card';
import axios from 'axios';
import { TagFilter } from '@/components/filter-by-tags/filter-by-tags';



const marks = [
  { value: 0, label: '2' },
  { value: 50, label: '4' },
  { value: 100, label: '6' },
];

export default function GalleryPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();
  const [columns, setColumns] = useState(3);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);

  const fetchImages = useAsync(async () => {
    const response =
      await api.get<PaginatedResponse<ImageGetDto>>('/api/images');
    return response.data;
  }, []);

  
 








  

  return (
    <>
      <NavBar />
      <LoadingOverlay
        visible={fetchImages.loading}
        loaderProps={{ children: 'Loading...' }}
      />
 
      <Container 
        pt={50} 
        display={"flex"} 
        fluid 
        px={"5%"}
        className={classes.Container}
      >
        <Center>
            <Center>
              <Stack>
                <Center>
                  <Title> Gallery </Title>
                </Center>
                <Group className={classes.toolbar} display={"flex"}>

                  <TagFilter/>

                  <Modal opened={opened} onClose={close} centered radius="lg">
                    <div className={classes.wrapper}>
                      <Dropzone
                        openRef={openRef}
                        onDrop={() => {}}
                        className={classes.dropzone}
                        radius="md"
                        accept={[MIME_TYPES.pdf, MIME_TYPES.png, MIME_TYPES.jpeg]}
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
                <div>
                  <Slider
                    defaultValue={2}
                    min={2}
                    max={6}
                    value={columns}
                    onChange={setColumns}
                    color='#ff914d'
                    className={classes.root}
                    step={1}
                    marks={[
                      { value: 2, label: '2' },
                      { value: 3, label: '3' },
                      { value: 4, label: '4' },
                      { value: 5, label: '5' },
                      { value: 6, label: '6' },
                    ]}
                    label={(label) => `${label} columns`}
                    pb={50}
                    
                  />
                </div>
                <SimpleGrid cols={columns}>
                  {fetchImages.value?.items.map((image) => (
                    <ImageCard image={image} />
                  ))}
                </SimpleGrid>
              </Stack>
            </Center>
        </Center>
      </Container>
    </>
  );
}
