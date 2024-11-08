import { useNavigate } from 'react-router-dom';
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Center,
  Container,
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
import logo from '../../components/Images/Logo_Small@2x.png'; // Adjust the path as needed
import { Dropzone, MIME_TYPES} from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { useRef } from 'react';
import { IconArrowRight, IconCloudUpload, IconDownload, IconMoon, IconSearch, IconSun, IconX } from '@tabler/icons-react';
import '../GalleryPage/Gallery-Page.module.css';
import '@mantine/dropzone/styles.css';

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

export default function GalleryPage() {
  let navigate = useNavigate();
  const routeToGallery = () => {
    let path = '/gallery';
    navigate(path);
  };
  const routeToAlbums = () => {
    let path = '/albums';
    navigate(path);
  };
  const routeToHome = () => {
    let path = '/home';
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

  const cards = mockdata.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.tags}
      </Text>
    </Card>
  ));

  const tags = mockdata.map((article) =>(
    <Text></Text>
  ));



  return (
    <>
      {' '}
      
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
                  }
                </Modal>
                <Button 
                  onClick={open}
                  style={{backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold'}}
                >
                  Upload Photo
                </Button>
              </Group>
              <SimpleGrid cols={{ base: 3, sm: 2 }}>{cards}</SimpleGrid>
            </Stack>
          </Center>
        </Group>
      </Center>
    </>
  );
}