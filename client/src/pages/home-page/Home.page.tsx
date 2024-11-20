import { useNavigate } from 'react-router-dom';
import { Box, Paper, rem, useMantineTheme, Text, Title, Container, Button, Center, Flex, AspectRatio, Image, } from '@mantine/core';
import '../../CSS/HeaderMegaMenu.module.css';
import classes from '../home-page/Home.page.module.css'
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import video from '../../components/Images/hero-Vid.mp4';
import { NavBar } from '@/components/NavBar/Nav-Bar';






interface CardProps {
  image: string;
}

function Card({ image }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})`, aspectRatio: 1920/1080 }}
      className={classes.card}
    />
    
  );
}

const userFavorites = [
  {
    id: 1,
    title: "Chrysler Building",
    image: 'https://media.istockphoto.com/id/1129615025/photo/street-view-of-the-chrysler-building-at-midtown-manhattan-new-york-city-usa.jpg?s=1024x1024&w=is&k=20&c=lJ7QP6oTp20xcw2NE3Y16GiN6PeA0OJZJCuJKRAgEv4=',
    tags: [
      "Chrysler Building",
      "Skyscraper",
      "NYC"
    ],
    isFavorite: true,
  },
  {
    id: 2,
    title: "St. Louis Cathedral",
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/StLouisCath.jpg',
    tags: [
      "Chrysler Building",
      "Skyscraper",
      "NYC"
    ],
    isFavorite: true,
  },
  {
    id: 3,
    title: "Bonnet Carre Spillway",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Army_Corps_operates_spillway_in_Louisiana.jpg/300px-Army_Corps_operates_spillway_in_Louisiana.jpg',
    tags: [
      "Louisiana",
      "Bonnet Carre",
      "Infrastructure"
    ],
    isFavorite: true,
  },
  {
    id: 4,
    title: "Statue of Unity",
    image: 'https://preview.redd.it/the-statue-of-unity-in-india-it-is-the-tallest-statue-in-v0-db96pekttwda1.jpg?width=640&crop=smart&auto=webp&s=721e51614374f43c40be74d1cef63a2a30233af9',
    tags: [
      "Chrysler Building",
      "Skyscraper",
      "NYC"
    ],
    isFavorite: true,
  },
  {
    id: 5,
    title: "Utah Hoodoos",
    image: 'https://img2.10bestmedia.com/Images/Photos/382106/GettyImages-512495588_55_660x440.jpg',
    tags: [
      "Chrysler Building",
      "Skyscraper",
      "NYC"
    ],
    isFavorite: true,
  }
];

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
  const routeToUserHome = () => {
    let path = '/home';
    navigate(path);
  };
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = userFavorites.map((item) => (
    <Carousel.Slide key={item.title} onClick={routeToGallery}>
      <Card  
        {...item}
      />
    </Carousel.Slide>
  ));

  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <>
    <NavBar/>
      <div className={classes.hero}>
        <video src={video} autoPlay muted loop className={classes.heroVid}/>
        <div className={classes.root}>
          <Container size="lg">
            <div className={classes.inner}>
              <div className={classes.content}>
                <Title className={classes.title}>
                  Welcome to{' '}
                  <br/>
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: 'pink', to: 'yellow' }}
                    className={classes.titles}
                  >
                    What's That
                  </Text>{' '}
                  <br/>

                </Title>

                <Text className={classes.description} mt={30}>
                Discover What's That, the cutting-edge AI-powered photo organization app that seamlessly categorizes, enhances, and curates your visual memories with unparalleled precision and efficiency.
                </Text>

                <Button
                  variant="gradient"
                  gradient={{ from: 'pink', to: '#ff914d' }}
                  size="xl"
                  className={classes.control}
                  mt={40}
                  onClick={routeToGallery}
                >
                  Gallery
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div> 
      <div>
        
        <Flex
          gap="lg"
          direction={"column"}
          justify={"center"}
          align={"center"}
          py={50}
          
        >
          <Title className={classes.titles}> Favorites</Title>
          <Paper shadow='md' radius="xl" withBorder >
            <Center>
            <Carousel
              className={classes.carousel}
              slideSize="33.333333%"
              slideGap={{ base: rem(8), sm: 'xl' }}
              height="90%"
              align="center"
              slidesToScroll={mobile ? 1 : 2}
              loop
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              py={70}
              style={{ width: '90%', flexShrink:1 }}
            >
              {slides}
            </Carousel>
            </Center>
          </Paper>
        </Flex>
        
      </div>
  </>
)}
