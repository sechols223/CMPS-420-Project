import { NavBar } from '@/components/NavBar/Nav-Bar';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Center, SimpleGrid, Stack, Title } from '@mantine/core';
import { useAsync } from 'react-use';
import { api } from '@/api';
import { AlbumGetDto } from '@/types';
import { ImageCard } from '@/components/image-card';

export const AlbumDetails: React.FC = () => {
  const { id } = useParams();

  const fetchAlbum = useAsync(async () => {
    const response = await api.get<AlbumGetDto>(`/api/albums/${id}`);
    return response.data;
  }, [id]);

  const album = useMemo(() => fetchAlbum.value, [fetchAlbum.value]);

  return (
    <>
      <NavBar />
      <Stack h={'100%'}>
        <Center>
          <Title>{album?.name}</Title>
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
