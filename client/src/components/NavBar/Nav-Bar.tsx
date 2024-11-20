import { IconArrowRight, IconArrowUp, IconMoon, IconSearch, IconSun } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Group,
  rem,
  TextInput,
  Transition,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { theme } from '@/theme';
import logo from '../../components/Images/Logo_Small@2x.png';
import classes from '../../CSS/HeaderMegaMenu.module.css';

export function NavBar() {
  let navigate = useNavigate();
  const routeToGallery = () => {
    let path = '/gallery';
    navigate(path);
  };
  const routeToAlbums = () => {
    let path = '/albums';
    navigate(path);
  };
  const routeToUserHome = () => {
    let path = '/';
    navigate(path);
  };

  const theme = useMantineTheme();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const [scroll, scrollTo] = useWindowScroll();

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <Affix position={{ top: 0, left: 0 }} zIndex={1000}>
        <header className={classes.header}>
          <div className={classes.logoContainer}>
            <img src={logo} alt="Logo" className={classes.logo} />
          </div>
          <Group h="100%" gap={10} visibleFrom="sm">
            <Button
              className={classes.navButton}
              title="Home"
              onClick={routeToUserHome}
              style={{ fontWeight: 'bold' }}
            >
              Home
            </Button>
            <Button
              className={classes.navButton}
              title="Gallery"
              onClick={routeToGallery}
              style={{ fontWeight: 'bold' }}
            >
              Gallery
            </Button>
            <Button
              className={classes.navButton}
              title="Albums"
              onClick={routeToAlbums}
              style={{ fontWeight: 'bold' }}
            >
              Albums
            </Button>

            <Button
              className={classes.navButton}
              onClick={toggleColorScheme}
              style={{ fontWeight: 'bold' }}
            >
              {computedColorScheme === 'dark' ? <IconSun /> : <IconMoon />}
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
      </Affix>

      {/* Scroll to Top Button */}
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={<IconArrowUp style={{ width: rem(16), height: rem(16) }} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              className={classes.navButton}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
      <Outlet />
    </>
  );
}
