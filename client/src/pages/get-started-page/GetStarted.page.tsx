import { useNavigate } from 'react-router-dom';
import { Burger, Button, Container, Group, Modal, Overlay, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import otherclasses from '../../CSS/HeaderMegaMenu.module.css';
import classes from '../../CSS/HeroImageBackground.module.css';

export function GetStartedPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  let navigate = useNavigate();
  const routeToLogin = () => {
    let path = '/loginform';
    navigate(path);
  };
  const routeToSignup = () => {
    let path = '/signupform';
    navigate(path);
  };
  {
    /* This is temporary remove when not needed anymore */
  }
  const routeToUserPage = () => {
    let path = '/home';
    navigate(path);
  };

  return (
    <>
      <header
        className={otherclasses.header}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        <Group visibleFrom="sm">
          <Button title="Log in" onClick={routeToLogin}>
            Log in
          </Button>
          <Button onClick={routeToSignup}>Sign up</Button>
          <Button onClick={routeToUserPage}> Goto user</Button>
        </Group>
        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
      </header>
      <div className={classes.wrapper}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>Welcome to What's that!</Title>

          <Container size={640}>
            <Text size="lg" className={classes.description}>
              Your personal photo organizer and contextualizer.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button className={classes.control} variant="white" size="lg" onClick={routeToLogin}>
              Get started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
