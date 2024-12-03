import { NavBar } from '@/components/NavBar/Nav-Bar';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import {
  ActionIcon,
  Burger,
  Button,
  Center,
  Group,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { useAsync, useAsyncFn } from 'react-use';
import { api } from '@/api';
import { AlbumGetDto } from '@/types';
import { ImageCard } from '@/components/image-card';
import { useDisclosure } from '@mantine/hooks';

export const AlbumDetails: React.FC = () => {
  const { id } = useParams();
  const [modalOpened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const fetchAlbum = useAsync(async () => {
    const response = await api.get<AlbumGetDto>(`/api/albums/${id}`);
    return response.data;
  }, [id]);
  const [deleteState, deleteAlbum] = useAsyncFn(async (id: string) => {
    try {
      const response = await api.delete(`/api/albums/${id}`);
      close();
      navigate(-1);
      console.log('album deleted successfully: ', response.data);
    } catch (error) {
      console.error('could not delete album: ', error);
    }
  });
  const album = useMemo(() => fetchAlbum.value, [fetchAlbum.value]);

  return (
    <>
      <NavBar />
      <LoadingOverlay visible={fetchAlbum.loading || deleteState.loading} />
      <Stack h={'100%'}>
        <Center>
          <Group>
            <Title>{album?.name}</Title>
            <Modal opened={modalOpened} onClose={close} title="Delete?">
              {<p>Are you sure you want to delete this?</p>}
              <Center>
                <Group>
                  <Button
                    color="red"
                    variant="filled"
                    onClick={() => album?._id && deleteAlbum(album._id)}
                  >
                    Delete
                  </Button>
                  <Button color="Gray" variant="filled">
                    Cancel
                  </Button>
                </Group>
              </Center>
            </Modal>
            <ActionIcon onClick={open} color="red" variant="filled" size="lg">
              <FaRegTrashAlt />
            </ActionIcon>
          </Group>
        </Center>
        <SimpleGrid cols={3} h={'100%'}>
          {album?.images.map((image) => (
            <ImageCard image={image} key={image._id} />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};
