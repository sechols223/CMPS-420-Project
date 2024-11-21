import React, { useState } from 'react';
import { IconArrowRight, IconPlus, IconSearch } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Group,
  Image,
  Modal,
  rem,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import logo from '../../components/Images/Logo_Small@2x.png'; // Adjust the path as needed
import classes from '../../CSS/HeaderMegaMenu.module.css';
import { NavBar } from '@/components/NavBar/Nav-Bar';

export function AlbumPage() {
  let navigate = useNavigate();
  const theme = useMantineTheme(); // Get the theme object
  const [modalOpened, setModalOpened] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumCover, setNewAlbumCover] = useState('');

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

  const routeToAlbum = (albumId: number) => {
    let path = `/OpenAlbum/${albumId}`;
    navigate(path);
  };

  const addNewAlbum = () => {
    setModalOpened(true);
  };

  const handleCreateAlbum = () => {
    console.log('New album created:', newAlbumTitle, newAlbumCover);
    setModalOpened(false);
  };

  return (
    <>
      <NavBar/>
      <Stack>
        <Center>
          <Title style={{ marginBottom: '20px' }}> Albums </Title>
        </Center>
        <Center>
          <Group style={{ display: 'flex', alignContent: 'center' }}>
            <SimpleGrid cols={3} spacing="lg">
              <Link to={`/OpenAlbum/${albums[0].id}`} style={{ textDecoration: 'none' }}>
                <Card
                  key={albums[0].id}
                  withBorder
                  shadow="sm"
                  radius="md"
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                  <Card.Section>
                    <Image src={albums[0].cover} height={160} alt={albums[0].title} />
                  </Card.Section>
                  <Text mt="sm" fw={500}>
                    {albums[0].title}
                  </Text>
                </Card>
              </Link>
              {albums.slice(1).map((album) => (
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
          </Group>
        </Center>
      </Stack>
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Create New Album">
        <Stack>
          <TextInput
            label="Album Title"
            placeholder="Enter album title"
            value={newAlbumTitle}
            onChange={(event) => setNewAlbumTitle(event.currentTarget.value)}
          />
          <TextInput
            label="Album Cover URL"
            placeholder="Enter album cover URL"
            value={newAlbumCover}
            onChange={(event) => setNewAlbumCover(event.currentTarget.value)}
          />
          <Button onClick={handleCreateAlbum}>Create Album</Button>
        </Stack>
      </Modal>
    </>
  );
}
