import { NavBar } from '@/components/NavBar/Nav-Bar';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ActionIcon, Center, SimpleGrid, Stack, Title } from '@mantine/core';
import { useAsync } from 'react-use';
import { api } from '@/api';
import { AlbumGetDto } from '@/types';
import { ImageCard } from '@/components/image-card';
import { IconHeart } from '@tabler/icons-react';

export const AlbumDetails: React.FC = () => {
  const { id } = useParams();

  const fetchAlbum = useAsync(async () => {
    const response = await api.get<AlbumGetDto>(`/api/albums/${id}`);
    return response.data;
  }, [id]);

  const album = useMemo(() => fetchAlbum.value, [fetchAlbum.value]);

  return (
    <>
      <Stack h={'100%'}>
        <Center>
          <Title>{album?.name}</Title>
        </Center>
        <SimpleGrid cols={3} h={'100%'}>
          {album?.images.map((image) => (
            <div style={{ position: 'relative' }} key={image._id}>
              <ImageCard image={image} />
              <ActionIcon
                variant="filled"
                size="lg"
                radius="xl"
                style={{
                  position: 'absolute',
                  bottom: '25px',
                  right: '25px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  zIndex: 2,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <IconHeart
                  style={{ width: '70%', height: '70%' }}
                  color="gray"
                />
              </ActionIcon>
            </div>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};
