"use client";

import { getPreSignedUrl, uploadFile } from "@/api/media";
import { createPost, updatePost } from "@/api/posts";
import EditorComponent from "@/components/editor";
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Image,
  InputWrapper,
  Select,
  SimpleGrid,
  Stack,
  TagsInput,
  Text,
  TextInput,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconChevronLeft,
  IconPhoto,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { Editor } from "@tiptap/react";
import React from "react";

import styles from "./styles.module.css";
import { PostFormData } from "./types";

type Category = {
  label: string;
  value: string;
};

interface Props {
  categories: Category[];
  data: PostFormData;
  postId: string;
}

const ManagePostForm = (props: Readonly<Props>) => {
  const [editorReference, setEditorReference] = React.useState<Editor>();
  const [coverImageLoading, setCoverImageLoading] = React.useState(false);
  const [editCoverImage, setEditCoverImage] = React.useState(false);
  const form = useForm<PostFormData>({
    initialValues: props.data,
  });

  const handleSubmit = async (values: PostFormData) => {
    const noOfWords = editorReference?.storage.characterCount as number;
    const readTimeMillis = Math.ceil(noOfWords / 200) * 60_000;

    const data = {
      ...values,
      read_time_millis: readTimeMillis,
    };

    try {
      props.postId === "new"
        ? await createPost(data)
        : await updatePost(props.postId, data);

      notifications.show({
        color: "teal",
        message: "Post saved successfully",
        title: "Saved",
      });
    } catch (error) {
      notifications.show({
        color: "red",
        message: (error as Error).message,
        title: "Failed to save post",
      });

      return;
    }
  };

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setCoverImageLoading(true);
      const data = await getPreSignedUrl();
      await uploadFile(file, data.url);
      form.setFieldValue("cover_image", data.path);
    } catch (error) {
      notifications.show({
        color: "red",
        message: (error as Error).message,
        title: "Failed to upload file",
      });
    } finally {
      setCoverImageLoading(false);
    }
  };

  const renderCoverImage = () => {
    if (editCoverImage || !form.values.cover_image) {
      return (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          key={form.key("cover_image")}
          loading={coverImageLoading}
          onDrop={handleFileUpload}
        >
          <Group
            gap="xl"
            justify="center"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                stroke={1.5}
                style={{
                  color: "var(--mantine-color-blue-6)",
                  height: rem(52),
                  width: rem(52),
                }}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                stroke={1.5}
                style={{
                  color: "var(--mantine-color-red-6)",
                  height: rem(52),
                  width: rem(52),
                }}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                stroke={1.5}
                style={{
                  color: "var(--mantine-color-dimmed)",
                  height: rem(52),
                  width: rem(52),
                }}
              />
            </Dropzone.Idle>

            <Text inline size="xl">
              Drag image here or click to select file
            </Text>
          </Group>
        </Dropzone>
      );
    }

    return (
      <Box pos="relative">
        <Image
          alt="Cover Image"
          radius="md"
          src={
            (process.env.NEXT_PUBLIC_MEDIA_URL as string) +
            "/" +
            form.values.cover_image
          }
          style={{ objectFit: "contain" }}
        />
        <Button
          onClick={() => {
            setEditCoverImage(true);
          }}
          size="xs"
          style={{ position: "absolute", right: rem(8), top: rem(8) }}
          variant="light"
        >
          Change
        </Button>
      </Box>
    );
  };

  return (
    <Container
      fluid
      h="calc(100dvh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
      py="sm"
    >
      <form onSubmit={form.onSubmit(handleSubmit)} style={{ height: "100%" }}>
        <Stack h="100%">
          <Group align="center" justify="space-between">
            <Group align="center" gap="xs">
              <Anchor href="/admin/posts/manage" size="xs">
                <IconChevronLeft />
              </Anchor>
              <Title order={1} size="h4">
                {props.postId === "new" ? "New Post" : "Edit Post"}
              </Title>
            </Group>
            <Button size="xs" type="submit" variant="light">
              Save
            </Button>
          </Group>
          <SimpleGrid className={styles.section} cols={{ md: 2 }} spacing="xl">
            <Stack gap="lg" mih={0} style={{ overflow: "auto" }}>
              <TextInput
                key={form.key("title")}
                label="Title"
                placeholder="Enter title"
                withAsterisk
                {...form.getInputProps("title")}
              />
              <Textarea
                key={form.key("summary")}
                label="Summary"
                maxLength={250}
                placeholder="Enter summary"
                rows={4}
                withAsterisk
                {...form.getInputProps("summary")}
              />
              <SimpleGrid cols={{ md: 2 }}>
                <Select
                  data={props.categories}
                  key={form.key("category")}
                  label="Category"
                  placeholder="Select Category"
                  withAsterisk
                  {...form.getInputProps("category")}
                />
                <TagsInput
                  data={form.values.tags}
                  key={form.key("tags")}
                  label="Tags"
                  placeholder="Enter tags"
                  {...form.getInputProps("tags")}
                />
              </SimpleGrid>
              <TextInput
                key={form.key("slug")}
                label="Slug"
                placeholder="Enter slug"
                withAsterisk
                {...form.getInputProps("slug")}
              />
              <InputWrapper label="Cover Image" withAsterisk>
                {renderCoverImage()}
              </InputWrapper>
            </Stack>
            <InputWrapper
              className={styles["content-input-wrapper"]}
              label="Content"
              mih={0}
              withAsterisk
            >
              <EditorComponent
                editorClass={styles["content-input"]}
                handleMount={setEditorReference}
                key={form.key("content")}
                placeholder="Type content here"
                {...form.getInputProps("content")}
              />
            </InputWrapper>
          </SimpleGrid>
        </Stack>
      </form>
    </Container>
  );
};

export default ManagePostForm;
