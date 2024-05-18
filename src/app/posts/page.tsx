import { Container, SimpleGrid, Title } from "@mantine/core";
import { Metadata } from "next";
import { Post } from "./types";
import PostCard from "./post-card";

export const metadata: Metadata = {
  title: "Posts",
};

const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  return response.json();
};

async function PostsPage() {
  const posts = await getPosts();
  return (
    <Container
      size="xl"
      pt="md"
      h="calc(100dvh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
    >
      <Title order={1} size="h2" mb="sm">
        Posts
      </Title>
      <SimpleGrid cols={3} pb="xl">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default PostsPage;
