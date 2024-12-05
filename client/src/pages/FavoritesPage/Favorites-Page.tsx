import React, { useState } from 'react';
import {
  Box,
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Badge,
  ActionIcon,
  Modal,
  Center,
} from '@mantine/core';
import { mockFavorites } from './Favorites-Mock-Data/favorites-mock-data';
import classes from '../GalleryPage/Gallery-Page.module.css';
import { IconHeart } from '@tabler/icons-react';

export function FavoritesPage() {
  const [selectedImage, setSelectedImage] = useState<
    null | (typeof mockFavorites)[0]
  >(null);

  return (
    <Box pt={50}>
      <Stack>
        <Center>
          <Title order={1}>My Favorites</Title>
        </Center>

        <SimpleGrid cols={3} spacing="lg" p="md">
          {mockFavorites.map((favorite) => (
            <Card
              key={favorite.id}
              withBorder
              padding="lg"
              radius="md"
              className={classes.card}
              style={{
                position: 'relative',
                cursor: 'pointer', // Add pointer cursor
                transition: 'transform 0.2s ease', // Smooth transition for hover effect
                '&:hover': {
                  transform: 'scale(1.02)', // Subtle scale effect on hover
                },
              }}
              onClick={() => setSelectedImage(favorite)}
            >
              <Card.Section>
                <Image
                  src={favorite.imageUrl}
                  height={200}
                  alt={favorite.title}
                />
              </Card.Section>

              <Stack mt="md" gap="sm">
                <Text fw={500} size="lg">
                  {favorite.title}
                </Text>

                <Group gap={5}>
                  {favorite.tags.map((tag) => (
                    <Badge key={tag} variant="filled" color="blue">
                      {tag}
                    </Badge>
                  ))}
                </Group>

                {favorite.description && (
                  <Text size="sm" c="dimmed">
                    {favorite.description}
                  </Text>
                )}

                <Text size="xs" c="dimmed">
                  Added: {new Date(favorite.dateAdded).toLocaleDateString()}
                </Text>
              </Stack>

              <ActionIcon
                variant="filled"
                color="red"
                size="lg"
                radius="xl"
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  backgroundColor: 'black',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click when clicking heart
                }}
              >
                <IconHeart
                  style={{ width: '60%', height: '60%' }}
                  fill="red"
                  color="red"
                />
              </ActionIcon>
            </Card>
          ))}
        </SimpleGrid>

        {mockFavorites.length === 0 && (
          <Text ta="center" size="lg" mt="xl">
            No favorites yet. Start adding some!
          </Text>
        )}
      </Stack>

      {/* Image Modal */}
      <Modal
        opened={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        size="xl"
        title={selectedImage?.title}
        centered
      >
        {selectedImage && (
          <Stack>
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              fit="contain"
            />
            <Group gap={5}>
              {selectedImage.tags.map((tag) => (
                <Badge key={tag} variant="filled" color="blue">
                  {tag}
                </Badge>
              ))}
            </Group>
            {selectedImage.description && (
              <Text size="sm">{selectedImage.description}</Text>
            )}
          </Stack>
        )}
      </Modal>
    </Box>
  );
}
