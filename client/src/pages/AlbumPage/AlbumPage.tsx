import React, { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Center,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { NavBar } from '@/components/NavBar/Nav-Bar';
import { useAsync } from 'react-use';
import { api } from '@/api';
import { AlbumGetDto } from '@/types';

export function AlbumPage() {
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumCover, setNewAlbumCover] = useState('');

  const fetchAlbums = useAsync(async () => {
    const response = await api.get<AlbumGetDto[]>('/api/albums');
    return response.data;
  });

  const routeToAlbum = (id: string) => {
    const path = `/albums/${id}`;
    navigate(path, { replace: false });
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
      <NavBar />
      <LoadingOverlay
        visible={fetchAlbums.loading}
        loaderProps={{ children: 'Loading...' }}
      />
      <Stack>
        <Center>
          <Title style={{ marginBottom: '20px' }}> Albums </Title>
        </Center>
        <Center>
          <Group style={{ display: 'flex', alignContent: 'center' }}>
            <SimpleGrid cols={3} spacing="lg">
              {fetchAlbums.value?.map((album) => (
                <Card
                  key={album._id}
                  withBorder
                  shadow="sm"
                  radius="md"
                  onClick={() => routeToAlbum(album._id)}
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                  <Card.Section>
                    <Image
                      src={
                        album.images[0]?.imageData ??
                        'https://placehold.co/600x400?text=Placeholder'
                      }
                      height={160}
                      alt={album.name}
                    />
                  </Card.Section>
                  <Text mt="sm" fw={500}>
                    {album.name}
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
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Create New Album"
      >
        <Stack>
          <TextInput
            label="Album Title"
            placeholder="Enter album title"
            value={newAlbumTitle}
            onChange={(event) => setNewAlbumTitle(event.currentTarget.value)}
          />
          <Button onClick={handleCreateAlbum}>Create Album</Button>
        </Stack>
      </Modal>
      <Outlet />
    </>
  );
}
