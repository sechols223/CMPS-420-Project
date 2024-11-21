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
} from '@mantine/core';
import classes from '../../CSS/HeaderMegaMenu.module.css';
import { Dropzone, MIME_TYPES} from '@mantine/dropzone';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { useRef, useState } from 'react';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import '../GalleryPage/Gallery-Page.module.css';
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

export default function GalleryPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();
  /* Filter Function. Does Not Work
  const allTags = [...new Set(userPhotos.flatMap(photo => photo.tags))];
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredPhotos = userPhotos.filter(photo =>
    selectedTags.length === 0 || selectedTags.some(tag => photo.tags.includes(tag))
  );

  const handleSelectTag = (currentTag: string): void => {
    setSelectedTags((prevTags: Array<string>) => 
      prevTags.includes(currentTag)
        ? prevTags.filter(tag => tag !== currentTag)
        : [...prevTags, currentTag]
    );
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
  );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val)
  );

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));  

  const options = userPhotos
    .filter((item) => item.tags.includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item.tags} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));*/

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


  const [scroll, scrollTo] = useWindowScroll();



  return (
    <>
      <NavBar/>
      {' '}
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
                      <Flex justify={"center"}>
                        <Button 
                          className={classes.navButton} 
                          size="md" 
                          radius="xl" 
                          onClick={() => openRef.current?.()}
                          style={{backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold'}}
                        >
                          Select files
                        </Button>
                      </Flex>
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
                <SimpleGrid cols={{ base: 3, sm: 2 }}>{cards}</SimpleGrid>
              </Stack>
            </Center>
          </Group>
        </Center>
      </Box>
    </>
  );
}