import { ImageGetDto, ImageUpdateDto } from '@/types';
import {
  ActionIcon,
  AspectRatio,
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  LoadingOverlay,
  Menu,
  Modal,
  Stack,
  TagsInput,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import React, { CSSProperties, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/CSS/HeaderMegaMenu.module.css';
import { Controller, useForm } from 'react-hook-form';
import { api } from '@/api';
import { useAsyncFn, useAsyncRetry } from 'react-use';
import { FaEllipsis, FaPencil, FaTrashCan } from 'react-icons/fa6';
import { toast } from 'react-toastify';

type ImageModalProps = {
  image: ImageGetDto;
};

export const ImageCard: React.FC<ImageModalProps> = ({ image }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card
        key={image.name}
        p="md"
        radius="md"
        component="a"
        href="#"
        className={classes.card}
        onClick={open}
        h={'100%'}
        w={'100%'}
      >
        <AspectRatio ratio={1920 / 1080}>
          <Image src={image.imageData} />
        </AspectRatio>
        <Text className={classes.title} mt={5}>
          {image.name}
        </Text>
        <Text className={classes.title} mt={5}>
          <Group>
            {image.tags.map((tag) => (
              <Badge>{tag}</Badge>
            ))}
          </Group>
        </Text>
      </Card>
      <ImageModal imageId={image._id} opened={opened} close={close} />
    </>
  );
};

export const ImageModal: React.FC<{
  imageId: string;
  opened: boolean;
  close: () => void;
}> = ({ imageId, opened, close }) => {
  const fetchImage = useAsyncRetry(async () => {
    const response = await api.get<ImageGetDto>(`/api/images/${imageId}`);

    reset({
      ...fetchImage.value,
    });

    return response.data;
  }, [imageId]);

  const [editMode, editModeMethods] = useDisclosure(false);

  const { register, handleSubmit, control, reset } = useForm<ImageUpdateDto>({
    defaultValues: {
      description: fetchImage.value?.description,
      name: fetchImage.value?.name,
      tags: fetchImage.value?.tags,
      location: fetchImage.value?.location,
    },
  });

  const [submitState, submit] = useAsyncFn(async (values: ImageUpdateDto) => {
    const response = await api.put(
      `/api/images/${fetchImage.value?._id}`,
      values
    );

    if (response.status >= 200) {
      toast('Image Updated');
      editModeMethods.close();
      fetchImage.retry();
    }
  });

  useEffect(() => {
    fetchImage.retry();
    reset({
      ...fetchImage.value,
    });
  }, []);

  return (
    <Modal opened={opened} onClose={close} withCloseButton={false}>
      <LoadingOverlay
        visible={submitState.loading || fetchImage.loading}
        loaderProps={{ children: 'Loading...' }}
      />
      {fetchImage.value && (
        <>
          <Modal.Title>
            <Flex justify="space-between" align="center">
              {!editMode ? (
                <Title>{fetchImage.value?.name}</Title>
              ) : (
                <TextInput {...register('name')} label={'Name'} />
              )}
              {editMode ? (
                <Button onClick={editModeMethods.close} color={'gray'}>
                  Cancel
                </Button>
              ) : (
                <Menu>
                  <Menu.Target>
                    <ActionIcon size={'lg'} variant={'transparent'}>
                      <FaEllipsis />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {!editMode && (
                      <Menu.Item
                        leftSection={<FaPencil />}
                        onClick={editModeMethods.open}
                      >
                        Edit
                      </Menu.Item>
                    )}
                    <Menu.Item
                      leftSection={<FaTrashCan color="red" />}
                      color={'red'}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Flex>
          </Modal.Title>
          {!editMode ? (
            <Stack h={'100%'} pt={10}>
              <AspectRatio ratio={1080 / 720}>
                <Image src={fetchImage.value?.imageData} />
              </AspectRatio>
              <Text fs={'italic'}>{fetchImage.value?.category}</Text>
              <Group>
                {fetchImage.value?.tags.map((tag) => <Badge>{tag}</Badge>)}
              </Group>
              <Text>{fetchImage.value?.description}</Text>
            </Stack>
          ) : (
            <>
              <form onSubmit={handleSubmit(submit)}>
                <Stack h={'100%'} pt={10}>
                  <AspectRatio ratio={1080 / 720}>
                    <Image src={fetchImage.value?.imageData} />
                  </AspectRatio>
                  <Controller
                    control={control}
                    render={({ field }) => {
                      console.log(field);
                      return (
                        <TagsInput
                          label="Tags"
                          value={field.value || []}
                          onChange={(value) => field.onChange(value)}
                        />
                      );
                    }}
                    name={'tags'}
                  />
                  <Textarea
                    {...register('description')}
                    label={'Description'}
                    style={textAreaStyle}
                    autosize
                  />
                  <Group justify={'end'}>
                    <Button type={'submit'}>Save</Button>
                  </Group>
                </Stack>
              </form>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

const textAreaStyle: CSSProperties = {
  overflowY: 'auto',
  height: 'fit-content',
};
