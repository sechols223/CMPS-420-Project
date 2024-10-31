import { useRef } from 'react';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Group,
  rem,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from './DropzoneButton.module.css';

export default function AlbumPage() {
  let navigate = useNavigate();
  const routeToGallery = () => {
    let path = '/gallery';
    navigate(path);
  };
  const routeToAlbums = () => {
    let path = '/albums ';
    navigate(path);
  };
  const routeToHome = () => {
    let path = '/home';
    navigate(path);
  };
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  return (
    <>
      <Box pb={120}>
        <header className={classes.header}>
          <Group h="100%" gap={15} visibleFrom="sm">
            <Button onClick={routeToHome}>Home</Button>
            <Button onClick={routeToGallery}>Gallery</Button>
            <Button onClick={routeToAlbums}>Albums</Button>
          </Group>
        </header>
      </Box>

      <Group>
        <Center>
          <Stack>
            <Center>
              <Title> Albums </Title>
            </Center>
            <Group>
              <Dropzone
                openRef={openRef}
                onDrop={() => {}}
                className={classes.dropzone}
                radius="md"
                accept={[MIME_TYPES.pdf]}
                maxSize={30 * 1024 ** 2}
              >
                <Group>
                  <Stack>
                    <Group justify="center">
                      <Dropzone.Accept>
                        <IconDownload
                          style={{ width: rem(50), height: rem(50) }}
                          color={theme.colors.blue[6]}
                          stroke={1.5}
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX
                          style={{ width: rem(50), height: rem(50) }}
                          color={theme.colors.red[6]}
                          stroke={1.5}
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                      </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                      <Dropzone.Accept>Drop files here</Dropzone.Accept>
                      <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                      <Dropzone.Idle>Upload files</Dropzone.Idle>
                    </Text>
                  </Stack>
                </Group>
              </Dropzone>
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>{}</SimpleGrid>
          </Stack>
        </Center>
      </Group>
    </>
  );
}
