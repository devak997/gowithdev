import {
  SimpleGrid,
  Card,
  CardSection,
  Title,
  Box,
  Group,
  Button,
  Image,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { Post } from "./types";

interface Props {
  posts: Post[];
}

function GridView({ posts }: Readonly<Props>) {
  return (
    <SimpleGrid cols={3} pb="xl">
      {posts.map((post) => (
        <Card shadow="sm" padding="lg" radius="md" withBorder key={post.id}>
          <CardSection>
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${post.cover_image}`}
              height={140}
              alt={post.title}
            />
          </CardSection>

          <Title order={3} mt="sm" mb="xs" h="56px">
            {post.title}
          </Title>
          <Box style={{ flex: 1 }}>
            <Text fz="sm" c="dimmed" lineClamp={4}>
              {post.summary}
            </Text>
          </Box>

          <Group align="center" mt="md">
            <Button
              style={{ flex: 1 }}
              component={Link}
              href={`/admin/posts/manage/${post.id}`}
              variant="light"
              color="blue"
              radius="md"
              fullWidth
            >
              Edit
            </Button>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default GridView;
