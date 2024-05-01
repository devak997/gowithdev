"use client";

import Editor from "@/components/Editor";
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Group,
  Select,
  SimpleGrid,
  Stack,
  TagsInput,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React from "react";

import { IconChevronRight } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { PostFormData } from "./types";
import { notifications } from "@mantine/notifications";

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
  const form = useForm<PostFormData>({
    initialValues: props.data ?? {},
  });

  const handleSubmit = async (values: PostFormData) => {
    console.log(form.values);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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

    return;
  };

  return (
    <Container size="xl" py="sm">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group justify="space-between" align="center">
          <Box>
            <Breadcrumbs separator={<IconChevronRight size={16} />}>
              <Anchor size="sm" href="/posts/manage">
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
          <TextInput
            key={form.key("content")}
            component={Editor}
            label="Content"
            withAsterisk
            {...form.getInputProps("content")}
          />
        </Stack>
      </form>
    </Container>
  );
}

export default ManagePostForm;
