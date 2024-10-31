import { Box, Group } from '@mantine/core';
import classes from '../../CSS/HeaderMegaMenu.module.css';

export function HomePage() {
  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group h="100%" gap={0} visibleFrom="sm">
          <a
            className={classes.link}
            href="#"
          >
            Home
          </a>
          <a 
            className={classes.link} 
            href="/gallery"
          >
            Gallery
          </a>
          <a 
            className={classes.link}
            href="/albums"
          >
            Albums
          </a>
        </Group>
      </header>
    </Box>
  );
}
