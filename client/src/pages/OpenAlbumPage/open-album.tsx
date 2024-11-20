import React, { useState } from 'react';
import { IconArrowRight, IconMoon, IconPlus, IconSearch, IconSun } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Image,
  Modal,
  Paper,
  rem,
  Stack,
  Text,
  TextInput,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
//import logo from '../../components/Images/Logo_Small@2x.png'; // Adjust the path as needed
import { NavBar } from '@/components/NavBar/Nav-Bar';

//import carouselClasses from '../../CSS/CardCarousel.module.css';
//import classes from '../../CSS/HeaderMegaMenu.module.css';

type CardProps = {
  image: string;
  title: string;
  category: string;
};

const CardComponent: React.FC<CardProps> = ({ image, title, category }) => {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      //className={classes.card}
    >
      <div>
        <Title order={3} /* className={classes.title} */>{title}</Title>
      </div>
    </Paper>
  );
};

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best forests to visit in North America',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Hawaii beaches review: better than you think',
    category: 'beach',
  },
  {
    image:
      'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Mountains at night: 12 best locations to enjoy the view',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Aurora in Norway: when to visit for best experience',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best places to visit this winter',
    category: 'tourism',
  },
  {
    image:
      'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Active volcanos reviews: travel at your own risk',
    category: 'nature',
  },
];

const imageThumbnails = [
  'https://images.unsplash.com/photo-1511135570219-bbad9a02f103?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjAzfHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1661589618168-232634f788cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU0fHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUzfHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1501700072703-15ee3d019f07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM3fHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1726313836390-8b1e86742c98?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1556276797-5086e6b45ff9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIyfHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1505069446780-4ef442b5207f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1722680738736-66a4cdc08923?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1475688621402-4257c812d6db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1699566448055-671c8dbcc7ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1523568129082-a8d6c095638e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1683121054777-acb80e8c5dc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1487622750296-6360190669a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1683141079772-acf46d5e2ebb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
  'https://cdn.pixabay.com/photo/2023/02/04/16/29/boat-7767575_640.jpg',
  'https://cdn.pixabay.com/photo/2024/11/05/07/09/elephants-9175178_640.jpg',
  'https://cdn.pixabay.com/photo/2024/01/29/19/38/forest-8540698_640.jpg',
  'https://cdn.pixabay.com/photo/2023/09/25/20/38/lisbon-8275994_640.jpg',
];

export function OpenAlbumPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const theme = useMantineTheme(); // Get the theme object
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [modalOpened, setModalOpened] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleThumbnailClick = (url: string) => {
    setCurrentImage(url);
    setModalOpened(true);
  };

  const routeToUserHome = () => {
    const path = '/home';
    navigate(path);
  };
  const routeToGallery = () => {
    const path = '/gallery';
    navigate(path);
  };
  const routeToAlbums = () => {
    const path = '/albums';
    navigate(path);
  };

  {
    /* Light/Dark Mode variables */
  }
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <CardComponent {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
      <div>
        <h1>Open Album Page</h1>
        <p>Album ID: {albumId}</p>
      </div>
      <Box
        pb={10}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: computedColorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        }}
      ></Box>

      {/* Carousel */}
      <Box
        pb={50}
        px="md"
        style={{
          marginTop: '20px',
          margin: '50px',
          padding: '20px',
          marginLeft: '110px',
          marginRight: '110px',
        }}
      >
        <div /*className={classes.carousel} */>
          <Stack>
            <Center>
              <Title order={2} style={{ paddingBottom: '10px' }}>
                Album Title
              </Title>
            </Center>
            <Center>
              <Carousel
                slideSize={mobile ? '100%' : '33.3333%'}
                slideGap="md"
                align="start"
                slidesToScroll={mobile ? 1 : 3}
              >
                {slides}
              </Carousel>
            </Center>
          </Stack>
        </div>
      </Box>

      {/* Modal for displaying full image */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="auto"
        centered
        withCloseButton
        zIndex={1000}
      >
        {currentImage && (
          <Image
            src={currentImage}
            alt="Full-size image"
            style={{
              maxWidth: '100%',
              maxHeight: '80vh', // Ensures the image fits within the viewport
            }}
          />
        )}
      </Modal>

      {/*Thumnails*/}
      <Box style={{ marginLeft: '30px', marginRight: '30px' }}>
        <Group align="center" justify="center" gap="xs" style={{ flexWrap: 'wrap' }}>
          {imageThumbnails.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`Thumbnail ${index + 1}`}
              width={50}
              height={50}
              style={{
                margin: '5px',
                borderRadius: '8px',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
              onClick={() => handleThumbnailClick(url)} // Set image and open modal
            />
          ))}
        </Group>
      </Box>
    </>
  );
}
