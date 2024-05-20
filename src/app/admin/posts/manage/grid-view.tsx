import { Post } from "@/types";
import {
  Box,
  Button,
  Card,
  CardSection,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

interface Props {
  posts: Post[];
}

const GridView = ({ posts }: Readonly<Props>) => {
  return (
    <SimpleGrid cols={3} pb="xl">
      {posts.map((post) => (
        <Card key={post.id} padding="lg" radius="md" shadow="sm" withBorder>
          <CardSection>
            <Image
              alt={post.title}
              height={140}
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL as string}/${
                post.cover_image
              }`}
            />
          </CardSection>

          <Title h="56px" mb="xs" mt="sm" order={3}>
            {post.title}
          </Title>
          <Box style={{ flex: 1 }}>
            <Text c="dimmed" fz="sm" lineClamp={4}>
              {post.summary}
            </Text>
          </Box>

          <Group align="center" mt="md">
            <Button
              color="blue"
              component={Link}
              fullWidth
              href={`/admin/posts/manage/${post.id}`}
              radius="md"
              style={{ flex: 1 }}
              variant="light"
            >
              Edit
            </Button>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default GridView;
