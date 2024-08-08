"use client";
import { Post } from "@/types";
import {
  Button,
  Center,
  Container,
  Group,
  Image,
  Stack,
  Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import GridView from "./grid-view";
import TableView from "./list-view";
import ViewToggle from "./view-toggle";

interface PostsViewProps {
  posts: Post[];
}

const getPostsView = (view: "grid" | "list", posts: Post[]) => {
  if (posts.length === 0) {
    return (
      <Center flex="1">
        <Image
          alt="No Posts"
          height={400}
          src="/undraw_void_-3-ggu.svg"
          width={400}
        />
      </Center>
    );
  }

  if (view === "grid") {
    return <GridView posts={posts} />;
  }

  return <TableView posts={posts} />;
};

const PostsView = ({ posts }: Readonly<PostsViewProps>) => {
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState<"grid" | "list">(isMobile ? "grid" : "list");

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 600px)").matches);
  }, []);

  return (
    <Container
      h="calc(100dvh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
      pt="md"
      size="xl"
    >
      <Stack gap="md" h="100%">
        <Group justify="space-between">
          <Title order={1} size="h2">
            Manage Posts
          </Title>
          <Group>
            <Button
              component={Link}
              href="/admin/posts/manage/new"
              leftSection={<IconPlus size={14} />}
              variant="light"
            >
              New Post
            </Button>
            <ViewToggle onChange={setView} value={view} />
          </Group>
        </Group>
        {getPostsView(view, posts)}
      </Stack>
    </Container>
  );
};

export default PostsView;
