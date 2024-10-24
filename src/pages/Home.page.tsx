import React from 'react';
import {
  AppShell,
  Card,
  Container,
  Flex,
  Group,
  Image,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';

export function HomePage() {
  const theme = useMantineTheme();

  return (
    <AppShell
      padding="md"
      header={
        <div
          style={{
            height: 60,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text size="lg">What's That?</Text>
          <Text>☰</Text>
        </div>
      }
      styles={{
        main: {
          backgroundImage: `url('/path/to/your/image.png')`, // Update with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        },
      }}
    >
      <Container style={{ textAlign: 'center', paddingTop: '10%' }}>
        <Title style={{ color: 'white', fontSize: '3rem' }}>Welcome to What’s That? !</Title>
        <Text size="lg" color="white" mt="md">
          Your AI photo contextualizer and Automatic album curator!
        </Text>
      </Container>

      <Flex justify="center" mt="lg">
        <Card
          shadow="sm"
          padding="lg"
          style={{
            backgroundColor: theme.colors.teal[6],
            width: 300,
            height: 300,
            opacity: 0.9,
          }}
        >
          <Text size="lg" color="gray">
            {/* Placeholder for content */}
            Content goes here
          </Text>
        </Card>
      </Flex>
    </AppShell>
  );
}
