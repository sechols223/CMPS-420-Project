import { useNavigate } from 'react-router-dom';
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
  useMantineColorScheme,
  useComputedColorScheme,
  TextInput,
  ActionIcon,
} from '@mantine/core';
import classes from '../../CSS/HeaderMegaMenu.module.css';
import logo from '../../components/Images/Logo_Small@2x.png';
import { Dropzone, MIME_TYPES} from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import {useRef} from 'react';
import { IconArrowRight, IconCloudUpload, IconDownload, IconMoon, IconSearch, IconSun, IconX } from '@tabler/icons-react';
import '../GalleryPage/Gallery-Page.module.css';
import '@mantine/dropzone/styles.css';
import {api} from '@/api';
import {ImageGetDto} from '@/types';
import {useAsync} from 'react-use';
import {ImageCards} from '@/pages/GalleryPage/image-cards';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockdata = [
  {
    title: 'Top 10 places to visit in Norway this summer',
    image:
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 18, 2022',
    tags:['funny','family'],
  },
  {
    title: 'Best forests to visit in North America',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 27, 2022',
    tags:['funny','family'],
  },
  {
    title: 'Hawaii beaches review: better than you think',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 9, 2022',
    tags:['funny','family'],
  },
  {
    title: 'Mountains at night: 12 best locations to enjoy the view',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 12, 2022',
    tags:['funny','family'],
  },
];

const Cards = () => {
  const fetchImages = useAsync(async () => {
    const response = await api.get<ImageGetDto[]>('/api/images')
    return response.data
  }, [])
  
  if (fetchImages.loading) {
    return <>Loading...</>
  }
  
  if (!fetchImages.value) {
    return <>No Images Found</>
  }
  
  return (
    fetchImages.value && (
      fetchImages.value?.map((image) => (
        <Card key={image.name} p="md" radius="md" component="a" href="#" className={classes.card}>
          <AspectRatio ratio={1920 / 1080}>
            <Image src={image.imageData} />
          </AspectRatio>
          <Text className={classes.title} mt={5}>
            {image.name}
          </Text>
          <Text className={classes.title} mt={5}>
            {image.tags}
          </Text>
        </Card>
      ))
    )
  )
}

export default function GalleryPage() {
  const navigate = useNavigate();
  const routeToGallery = () => {
    const path = '/gallery';
    navigate(path);
  };
  const routeToAlbums = () => {
    const path = '/albums';
    navigate(path);
  };
  const routeToHome = () => {
    const path = '/home';
    navigate(path);
  };

  const [opened, { open, close }] = useDisclosure(false);
  const openRef = useRef<() => void>(null);
  const theme = useMantineTheme();
  const {setColorScheme} = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

   
  
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? 'light' : 'dark')
  }
  
  
  
  
 
  return (
    <>
      {' '}
      <Box pb={50}>
        <header className={classes.header}>
          <div className={classes.logoContainer}>
            <img src={logo} alt="Logo" className={classes.logo} />
          </div>
          <Group h="100%" gap={10} visibleFrom="sm">
            <Button
              title="Home"
              onClick={routeToHome}
              style={{ backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold' }}
            >
              Home
            </Button>
            <Button
              title="Gallery"
              onClick={routeToGallery}
              style={{ backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold' }}
            >
              Gallery
            </Button>
            <Button
              title="Albums"
              onClick={routeToAlbums}
              style={{ backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold' }}
            >
              Albums
            </Button>
            <Button 
              onClick={toggleColorScheme}
              style={{backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold'}}
            >
              {computedColorScheme === "dark" ? <IconSun /> : <IconMoon/>}  
            </Button>
          </Group>
          <div className={classes.searchBar}>
            <TextInput
              radius="xl"
              size="md"
              placeholder="Search images, albums, and more"
              rightSectionWidth={42}
              leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              rightSection={
                <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                  <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
              }
              style={{ width: '40%' }}
            />
          </div>
        </header>
      </Box>
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
                    'funny','family'
                  ]}
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
                            <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                          </Dropzone.Idle>
                        </Group>
              
                        <Text ta="center" fw={700} fz="lg" mt="xl">
                          <Dropzone.Accept>Drop files here</Dropzone.Accept>
                          <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                          <Dropzone.Idle>Upload resume</Dropzone.Idle>
                        </Text>
                        <Text ta="center" fz="sm" mt="xs" c="dimmed">
                          Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
                          are less than 30mb in size.
                        </Text>
                      </div>
                    </Dropzone>
              
                    <Button 
                      className={classes.control} 
                      size="md" 
                      radius="xl" 
                      onClick={() => openRef.current?.()}
                      style={{backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold'}}
                    >
                      Select files
                    </Button>
                  </div>
                </Modal>
                <Button 
                  onClick={open}
                  style={{backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold'}}
                >
                  Upload Photo
                </Button>
              </Group>
              <SimpleGrid cols={{ base: 3, sm: 2 }}>
                <ImageCards />
              </SimpleGrid>
            </Stack>
          </Center>
        </Group>
      </Center>
    </>
  );
}