"use client";
import {
  Button,
  Title,
  Group,
  Image,
  Container,
  Center,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import { Post } from "./types";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import GridView from "./grid-view";
import ViewToggle from "./view-toggle";
import TableView from "./list-view";

interface PostsViewProps {
  posts: Post[];
}

const getPostsView = (view: "grid" | "list", posts: Post[]) => {
  if (posts.length === 0) {
    return (
      <Center flex="1">
        <Image
          width={400}
          height={400}
          src="/undraw_void_-3-ggu.svg"
          alt="No Posts"
        />
      </Center>
    );
  }

  if (view === "grid") {
    return <GridView posts={posts} />;
  }

  return <TableView posts={posts} />;
};

function PostsView({ posts }: Readonly<PostsViewProps>) {
  const [view, setView] = useState<"grid" | "list">("list");
  return (
    <Container
      size="xl"
      pt="md"
      h="calc(100dvh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
    >
      <Stack h="100%" gap="md">
        <Group justify="space-between">
          <Title order={1} size="h2">
            Manage Posts
          </Title>
          <Group>
            <Button
              component={Link}
              href="/admin/posts/manage/new"
              variant="light"
              leftSection={<IconPlus size={14} />}
            >
              New Post
            </Button>
            <ViewToggle value={view} onChange={setView} />
          </Group>
        </Group>
        {getPostsView(view, posts)}
      </Stack>
    </Container>
  );
}

export default PostsView;
