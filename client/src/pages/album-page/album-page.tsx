import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Group, SimpleGrid, Stack, Title } from '@mantine/core';
import classes from '../GalleryPage/Gallery-Page.module.css';

export default function AlbumPage() {
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
  return (
    <>
      <Box pb={120}>
        <header className={classes.header}>
          <Group h="100%" gap={15} visibleFrom="sm">
            <Button onClick={routeToHome}>Home</Button>
            <Button onClick={routeToGallery}>Gallery</Button>
            <Button onClick={routeToAlbums}>Albums</Button>
          </Group>
        </header>
      </Box>

      <Group>
        <Center>
          <Stack>
            <Center>
              <Title> Albums </Title>
            </Center>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>{}</SimpleGrid>
          </Stack>
        </Center>
      </Group>
    </>
  );
}
