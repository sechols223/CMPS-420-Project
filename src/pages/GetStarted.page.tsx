import { useNavigate } from 'react-router-dom';
import { Burger, Button, Container, Group, Modal, Overlay, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RegistrationForm } from './RegistrationForm';
import otherclasses from '../CSS/HeaderMegaMenu.module.css';
import classes from '../CSS/HeroImageBackground.module.css';

export function GetStartedPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/home';
    navigate(path);
  };
  return (
    <>
      <header className={otherclasses.header}>
        <Container>
          <Group justify="flex-end" visibleFrom="sm">
            <Button variant="default">Log in</Button>
            <Modal opened={opened} onClose={close} title="Sign up">
              <RegistrationForm />
            </Modal>
            <Button onClick={open}>Sign up</Button>
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Container>
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
            <Button className={classes.control} variant="white" size="lg" onClick={routeChange}>
              Get started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
