import { useNavigate } from 'react-router-dom';
import { ActionIcon, Box, Button, Group, rem, TextInput } from '@mantine/core';
import classes from '../../CSS/HeaderMegaMenu.module.css';
import logo from '../../components/Images/Logo_Small@2x.png'; // Adjust the path as needed
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { theme } from '@/theme';
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
  const routeToUserHome = () => {
    let path = '/home';
    navigate(path);
  };
  return (
    <>
    {' '}
      <Box pb={50}>
        <header className={classes.header}>
          <div className={classes.logoContainer}>
            <img src={logo} alt="Logo" className={classes.logo} />
          </div>
          <Group h="100%" gap={10} visibleFrom="sm">
            <Button
              title="Home"
              onClick={routeToUserHome}
              style={{ backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold' }}
            >
              Home
            </Button>
            <Button
              title="Gallery"
              onClick={routeToGallery}
              style={{ backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold' }}
            >
              Gallery
            </Button>
            <Button
              title="Albums"
              onClick={routeToAlbums}
              style={{ backgroundColor: '#ff914d', color: '#39445a', fontWeight: 'bold' }}
            >
              Albums
            </Button>
          </Group>
          <div className={classes.searchBar}>
            <TextInput
              radius="xl"
              size="md"
              placeholder="Search images, albums, and more"
              rightSectionWidth={42}
              leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              rightSection={
                <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                  <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
              }
              style={{ width: '40%' }}
            />
          </div>
        </header>
      </Box>
      </>
)}
