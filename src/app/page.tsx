import { getPosts } from "@/api/posts";
import {
  Anchor,
  Box,
  Center,
  Container,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

import styles from "./page.module.css";
import PostCard from "./posts/post-card";

export default async function Home() {
  const posts = await getPosts();
  return (
    <Box>
      <Box className={styles.hero} mb="lg" p={48}>
        <Center>
          <Title ff="monospace" mb="md" order={1} size={62}>
            gowithdev
          </Title>
        </Center>
        <Text size="xl" ta="center">
          Explore. Learn. Innovate
        </Text>
      </Box>

      <Container fluid>
        <Title mb="sm" order={1} size="h2">
          Recent Posts
          <Anchor component={Link} href="/posts" ml="xs" size="sm">
            See more
          </Anchor>
        </Title>
        <SimpleGrid
          cols={{
            lg: 4,
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
    </Box>
  );
}
