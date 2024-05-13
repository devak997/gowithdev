"use client";

import EditorComponent from "@/components/Editor";
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Group,
  Text,
  Input,
  InputWrapper,
  Select,
  SimpleGrid,
  Stack,
  TagsInput,
  TextInput,
  Textarea,
  Title,
  rem,
  Image,
} from "@mantine/core";
import React from "react";

import {
  IconChevronRight,
  IconPhoto,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { PostFormData } from "./types";
import { notifications } from "@mantine/notifications";
import { Editor } from "@tiptap/react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { set } from "date-fns";
import { se } from "date-fns/locale";

type Category = {
  value: string;
  label: string;
};

interface Props {
  data: PostFormData;
  categories: Category[];
  isNew: boolean;
}

function ManagePostForm(props: Readonly<Props>) {
  const [editorRef, setEditorRef] = React.useState<Editor>();
  const [coverImageLoading, setCoverImageLoading] = React.useState(false);
  const [editCoverImage, setEditCoverImage] = React.useState(false);
  const form = useForm<PostFormData>({
    initialValues: props.data ?? {},
  });

  const handleSubmit = async (values: PostFormData) => {
    const noOfWords = editorRef!.storage.characterCount.words();
    const readTimeMillis = Math.ceil(noOfWords / 200) * 60000;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          read_time_millis: readTimeMillis,
        }),
      }
    );

    if (!response.ok) {
      notifications.show({
        title: "Failed to save post",
        message: await response.text(),
        color: "red",
      });

      return;
    }

    notifications.show({
      title: "Saved",
      message: "Post saved successfully",
      color: "teal",
    });
  };

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setCoverImageLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/media/pre-signed-url`
      );

      if (!response.ok) {
        notifications.show({
          title: "Failed to upload file",
          message: await response.text(),
          color: "red",
        });

        return;
      }

      const data = await response.json();

      await fetch(data.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      form.setFieldValue("cover_image", data.path);
    } catch (error) {
      notifications.show({
        title: "Failed to upload file",
        message: (error as Error).message,
        color: "red",
      });
    } finally {
      setCoverImageLoading(false);
    }
  };

  const renderCoverImage = () => {
    if (editCoverImage || !form.values.cover_image) {
      return (
        <Dropzone
          loading={coverImageLoading}
          key={form.key("cover_image")}
          accept={IMAGE_MIME_TYPE}
          onDrop={handleFileUpload}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <Text size="xl" inline>
              Drag image here or click to select file
            </Text>
          </Group>
        </Dropzone>
      );
    }

    return (
      <Box pos="relative">
        <Image
          src={process.env.NEXT_PUBLIC_MEDIA_URL + form.values.cover_image}
          alt="Cover Image"
          radius="md"
          style={{ objectFit: "contain" }}
        />
        <Button
          size="xs"
          variant="light"
          onClick={() => setEditCoverImage(true)}
          style={{ position: "absolute", top: rem(8), right: rem(8) }}
        >
          Change
        </Button>
      </Box>
    );
  };

  return (
    <Container size="xl" py="sm">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group justify="space-between" align="center">
          <Box>
            <Breadcrumbs separator={<IconChevronRight size={16} />}>
              <Anchor size="sm" href="/admin/posts/manage">
                Manage Posts
              </Anchor>
            </Breadcrumbs>
            <Title order={1} size="h2">
              {props.isNew ? "New Post" : "Edit Post"}
            </Title>
          </Box>
          <Button size="xs" type="submit">
            Save
          </Button>
        </Group>
        <Box my="lg" />
        <Stack gap="lg">
          <TextInput
            placeholder="Enter title"
            label="Title"
            withAsterisk
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
          <Textarea
            placeholder="Enter summary"
            label="Summary"
            withAsterisk
            rows={4}
            maxLength={250}
            key={form.key("summary")}
            {...form.getInputProps("summary")}
          />
          <SimpleGrid cols={{ xs: 1, md: 3 }}>
            <Select
              label="Category"
              withAsterisk
              placeholder="Select Category"
              key={form.key("category")}
              data={props.categories}
              {...form.getInputProps("category")}
            />
            <TagsInput
              key={form.key("tags")}
              label="Tags"
              placeholder="Enter tags"
              data={form.values.tags}
              {...form.getInputProps("tags")}
            />
            <TextInput
              key={form.key("slug")}
              label="Slug"
              placeholder="Enter slug"
              withAsterisk
              {...form.getInputProps("slug")}
            />
          </SimpleGrid>
          <InputWrapper label="Cover Image" withAsterisk>
            {renderCoverImage()}
          </InputWrapper>
          <InputWrapper label="Content" withAsterisk>
            <Input
              key={form.key("content")}
              component={EditorComponent}
              handleMount={setEditorRef}
              placeholder="Type content here"
              {...form.getInputProps("content")}
            />
          </InputWrapper>
        </Stack>
      </form>
    </Container>
  );
}

export default ManagePostForm;
