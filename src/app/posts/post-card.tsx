import { Post } from "@/types";
import {
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowRight, IconBookmark, IconClock } from "@tabler/icons-react";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Card key={post.id} padding="md" radius="md" shadow="md" withBorder>
      <CardSection>
        <Image
          alt={post.title}
          height={140}
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL as string}/${
            post.cover_image
          }`}
        />
      </CardSection>

      <Group justify="space-between" my="xs">
        <Text align="center" c="dimmed" component={Group} fz="sm" gap={1}>
          <IconBookmark size={14} />
          {format(new Date(post.updated_at), "MMMM dd, yyyy")}
        </Text>
        <Badge leftSection={<IconClock size={12} />} size="sm" variant="light">
          {Math.floor(post.read_time_millis / 60_000)} min read
        </Badge>
      </Group>
      <Title order={3}>{post.title}</Title>
      <Group my="xs">
        {post.tags.map((tag) => (
          <Badge key={tag} size="xs" variant="dot">
            {tag}
          </Badge>
        ))}
      </Group>
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
          href={`/posts/${post.id}`}
          radius="md"
          rightSection={<IconArrowRight size={14} />}
          style={{ flex: 1 }}
          variant="light"
        >
          Read
        </Button>
      </Group>
    </Card>
  );
};

export default PostCard;
