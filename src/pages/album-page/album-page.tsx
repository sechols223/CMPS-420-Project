// Stuff I added
import { IconDots, IconEye, IconFileZip, IconPlus, IconTrash } from '@tabler/icons-react'; // Stuff I added
import { Link, useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Group,
  Image,
  Menu,
  rem,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import classes from '../../CSS/HeaderMegaMenu.module.css';

export function AlbumPage() {
  let navigate = useNavigate();
  const routeToUserHome = () => {
    let path = '/home';
    navigate(path);
  };
  const routeToGallery = () => {
    let path = '/gallery';
    navigate(path);
  };
  const routeToAlbums = () => {
    let path = '/albums';
    navigate(path);
  };

  const albums = [
    {
      id: 1,
      title: 'Vacation',
      cover: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
    },
    {
      id: 2,
      title: 'Family',
      cover: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
    },
    {
      id: 3,
      title: 'Friends',
      cover: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
    },
  ];
  // Stuff I added
  const routeToAlbum = (albumId: number) => {
    let path = `/albums/${albumId}`;
    navigate(path);
  };

  const addNewAlbum = () => {
    // Logic to add a new album
    console.log('Add new album');
  };

  return (
    <>
      {' '}
      <Box pb={50}>
        <header className={classes.header}>
          <Group h="100%" gap={10} visibleFrom="sm">
            <Button title="Home" onClick={routeToUserHome}>
              Home
            </Button>
            <Button title="Gallery" onClick={routeToGallery}>
              Gallery
            </Button>
            <Button title="Alubms" onClick={routeToAlbums}>
              Albums
            </Button>
          </Group>
        </header>
      </Box>
      <Stack>
        <Center>
          <Title style={{ marginBottom: '20px' }}> Albums </Title>
        </Center>
        <Center>
          <Group style={{ display: 'flex', alignContent: 'center' }}>
            {/* Vanna, put all your stuff in here. */}
            <SimpleGrid cols={3} spacing="lg">
              {albums.map((album) => (
                <Card
                  key={album.id}
                  withBorder
                  shadow="sm"
                  radius="md"
                  onClick={() => routeToAlbum(album.id)}
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                  <Card.Section>
                    <Image src={album.cover} height={160} alt={album.title} />
                  </Card.Section>
                  <Text mt="sm" fw={500}>
                    {album.title}
                  </Text>
                </Card>
              ))}
              <Card
                withBorder
                shadow="sm"
                radius="md"
                onClick={addNewAlbum}
                style={{ cursor: 'pointer', textAlign: 'center' }}
              >
                <Card.Section>
                  <Center style={{ height: 160 }}>
                    <IconPlus size={48} />
                  </Center>
                </Card.Section>
                <Text mt="sm" fw={500}>
                  Add New Album
                </Text>
              </Card>
            </SimpleGrid>
            {/* End of my stuff */}
          </Group>
        </Center>
      </Stack>
    </>
  );
}
