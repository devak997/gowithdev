import { getPosts } from "@/api/posts";
import BreadcrumbsComponent from "@/components/breadcrumbs-comp";
import { Container, SimpleGrid, Title } from "@mantine/core";
import { Metadata } from "next";

import PostCard from "./post-card";

export const metadata: Metadata = {
  title: "Posts",
};

const PostsPage = async () => {
  const posts = await getPosts();
  return (
    <Container
      h="calc(100dvh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
      pt="md"
      size="xl"
    >
      <BreadcrumbsComponent />
      <Title mb="sm" order={1} size="h2">
        Posts
      </Title>
      <SimpleGrid
        cols={{
          md: 3,
          xs: 1,
        }}
        pb="xl"
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default PostsPage;
