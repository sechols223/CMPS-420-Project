import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from '@tabler/icons-react';
import {
  Box,
  Burger,
  Button,
  Group,
  Modal,
  rem,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import classes from '../CSS/HeaderMegaMenu.module.css';

export function HomePage() {
  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group h="100%" gap={0} visibleFrom="sm">
          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Gallery
          </a>
          <a href="#" className={classes.link}>
            Albums
          </a>
        </Group>
      </header>
    </Box>
  );
}
