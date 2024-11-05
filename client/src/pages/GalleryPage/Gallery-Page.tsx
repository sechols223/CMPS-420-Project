import { useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Card,
  Center,
  Container,
  Group,
  Image,
  rem,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from '../../CSS/HeaderMegaMenu.module.css';
import logo from '../../components/Images/Logo_Small@2x.png'; // Adjust the path as needed
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { theme } from '@/theme';

const mockdata = [
  {
    title: 'Top 10 places to visit in Norway this summer',
    image:
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 18, 2022',
  },
  {
    title: 'Best forests to visit in North America',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 27, 2022',
  },
  {
    title: 'Hawaii beaches review: better than you think',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 9, 2022',
  },
  {
    title: 'Mountains at night: 12 best locations to enjoy the view',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 12, 2022',
  },
];

export default function GalleryPage() {
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
  const cards = mockdata.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

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

      <Group>
        <Center>
          <Stack>
            <Center>
              <Title> Gallery </Title>
            </Center>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
          </Stack>
        </Center>
      </Group>
    </>
  );
}
