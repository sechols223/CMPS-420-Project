import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Group, Space } from '@mantine/core';
import classes from '../../CSS/HeaderMegaMenu.module.css';

export function HomePage() {
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

  return (
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
  );
}
