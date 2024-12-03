import React, { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { data, Form, Outlet, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Center,
  Group,
  Image,
  Input,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { NavBar } from '@/components/NavBar/Nav-Bar';
import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use';
import { api } from '@/api';
import { AlbumGetDto, AlbumCreateDto } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';

export function AlbumPage() {
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumCover, setNewAlbumCover] = useState('');

  const fetchAlbums = useAsyncRetry(async () => {
    const response = await api.get<AlbumGetDto[]>('/api/albums');
    return response.data;
  });

  const [, createAlbum] = useAsyncFn(async (values: AlbumCreateDto) => {
    try {
      const response = await api.post<AlbumCreateDto[]>('/api/albums', {
        ...values,
      });
      console.log('album created', response.data);
      fetchAlbums.retry();
      setModalOpened(false);
    } catch (error) {
      console.error('error creating album: ', error);
    }
  });

  const routeToAlbum = (id: string) => {
    const path = `/albums/${id}`;
    navigate(path, { replace: false });
  };

  const addNewAlbum = () => {
    setModalOpened(true);
  };

  //Trying shit out. I have no clue what the fuck is going on.
  type createAlbumData = {
    albumName: string;
  };
  const { register, handleSubmit } = useForm<AlbumCreateDto>({
    defaultValues: {
      name: 'newAlbumName',
      imageIds: [],
    },
  });

  useEffect(() => {
    fetchAlbums.retry();
  }, []);
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
          <form onSubmit={handleSubmit(createAlbum)}>
            <TextInput
              withAsterisk
              label="Album Name"
              placeholder="Your new album"
              {...register('name')}
            />

            <br></br>
            <center>
              <Button type="submit">Submit</Button>
            </center>
          </form>
        </Stack>
      </Modal>
      <Outlet />
    </>
  );
}
