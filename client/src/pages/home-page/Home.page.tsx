import { useNavigate } from 'react-router-dom';
import { Box, Button, Group } from '@mantine/core';
import classes from '../../CSS/HeaderMegaMenu.module.css';

export function HomePage() {
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
    <Box pb={120}>
      <header className={classes.header}>
        <Group h="100%" gap={15} visibleFrom="sm">
          <Button onClick={routeToHome}>Home</Button>
          <Button onClick={routeToGallery}>Gallery</Button>
          <Button onClick={routeToAlbums}>Albums</Button>
        </Group>
      </header>
    </Box>
  );
}
