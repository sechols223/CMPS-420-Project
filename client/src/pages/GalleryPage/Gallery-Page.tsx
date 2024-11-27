import {
  AspectRatio,
  Box,
  Button,
  Card,
  Center,
  Group,
  Image,
  Modal,
  MultiSelect,
  rem,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
  Flex,
  Space,
  Pill,
  useCombobox,
  Combobox,
  TagsInput,
  Slider,
  Container,
} from '@mantine/core';
import { Dropzone, MIME_TYPES} from '@mantine/dropzone';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { useRef, useState } from 'react';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import classes from '../GalleryPage/Gallery-Page.module.css';
import '@mantine/dropzone/styles.css';
import { NavBar } from '@/components/NavBar/Nav-Bar';


const userPhotos = [
  {
    id: 1,
    title: "Chrysler",
    image: 'https://media.istockphoto.com/id/1129615025/photo/street-view-of-the-chrysler-building-at-midtown-manhattan-new-york-city-usa.jpg?s=1024x1024&w=is&k=20&c=lJ7QP6oTp20xcw2NE3Y16GiN6PeA0OJZJCuJKRAgEv4=',
    tags: [
      "Chrysler Building",
      "Skyscraper",
      "NYC",
      "Architecture"
    ],
    isFavorite: true,
  },
  {
    id: 2,
    title: "St. Louis Cathedral",
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/StLouisCath.jpg',
    tags: [
      "New Orleans",
      "Architecture",
      "French Quarter",
      "Religious Building"
    ],
    isFavorite: true,
  },
  {
    id: 3,
    title: "Bonnet Carre Spillway",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Army_Corps_operates_spillway_in_Louisiana.jpg/300px-Army_Corps_operates_spillway_in_Louisiana.jpg',
    tags: [
      "Louisiana",
      "Bonnet Carre",
      "Infrastructure"
    ],
    isFavorite: true,
  },
  {
    id: 4,
    title: "Statue of Unity",
    image: 'https://preview.redd.it/the-statue-of-unity-in-india-it-is-the-tallest-statue-in-v0-db96pekttwda1.jpg?width=640&crop=smart&auto=webp&s=721e51614374f43c40be74d1cef63a2a30233af9',
    tags: [
      "Chrysler Building",
      "Skyscraper",
      "NYC"
    ],
    isFavorite: true,
  },
  {
    id: 5,
    title: "Utah Hoodoos",
    image: 'https://img2.10bestmedia.com/Images/Photos/382106/GettyImages-512495588_55_660x440.jpg',
    tags: [
      "Chrysler Building",
      "Skyscraper",
      "NYC"
    ],
    isFavorite: true,
  }
];

const marks = [
  { value: 0, label: '2' },
  { value: 50, label: '4' },
  { value: 100, label: '6' },
];

export default function GalleryPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();
  const columnNumber = 

  const setColumnNumber = () => {

  }

  const cards = userPhotos.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>

      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
      {article.tags.map((tags)=> (
        <>
          <Flex>
            <Pill>
              {tags}
            </Pill>
          </Flex>
        </>
      ))}
    </Card>
  ));

  

  return (
    <>
      <NavBar/>
      <Container 
        pt={50} 
        display={"flex"} 
        fluid 
        px={"5%"}
        className={classes.Container}
      >
        <Center>
          <Stack>
            <Center>
              <Title> Gallery </Title>
            </Center>

            <Group className={classes.toolbar} display={"flex"}>
                <MultiSelect
                classNames={{pill: classes.pill}}
                  placeholder="Filter by tag(s)"
                  data={[
                    
                  ]}
                  searchable
                  nothingFoundMessage="Nothing Found... :\"
                  
                />
                {/*<TagsInput
                  label="Press Enter to submit a tag"
                  placeholder="Pick tag from list"
                  data={['React', 'Angular', 'Svelte']}
                /> */}
                <Modal opened={opened} onClose={close} centered radius={'lg'}>
                  {
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
                            <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                          </Dropzone.Idle>
                        </Group>
              
                        <Text ta="center" fw={700} fz="lg" mt="xl">
                          <Dropzone.Accept>Drop files here</Dropzone.Accept>
                          <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                          <Dropzone.Idle>Upload Picture(s)</Dropzone.Idle>
                        </Text>
                        <Text ta="center" fz="sm" mt="xs" c="dimmed">
                          Pssss... You can upload up to 8 images at a time!
                        </Text>
                      </div>
                    </Dropzone>
                    <Space h="xs"/>
                    
                      <Button 
                        className={classes.navButton} 
                        size="md" 
                        radius="xl" 
                        onClick={() => openRef.current?.()}
                        style={{backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold'}}
                      >
                        Select files
                      </Button>
                    
                  </div>
                  }
                </Modal>
                <Button 
                  onClick={open}
                  style={{backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold',}}
                  className={classes.navButton}
                >
                  Upload Photo
                </Button>
                
            </Group>
              <div>
                <Slider
                  defaultValue={0}
                  color='#ff914d'
                  className={classes.root}
                  label={(val) => marks.find((mark) => mark.value === val)!.label}
                  step={50}
                  marks={marks}
                  pb={50}
                  
                />
              </div>
            <SimpleGrid cols={{ base: 3, sm: 2 }}>
              {cards}
            </SimpleGrid>

          </Stack>
        </Center>
      </Container>
    </>
  );
}