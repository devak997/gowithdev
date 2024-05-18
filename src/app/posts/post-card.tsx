import {
  Card,
  CardSection,
  Title,
  Box,
  Group,
  Button,
  Text,
  Image,
  Badge,
} from "@mantine/core";
import Link from "next/link";
import { Post } from "./types";
import React from "react";
import { format } from "date-fns";
import { IconArrowRight, IconBookmark, IconClock } from "@tabler/icons-react";

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Card shadow="md" padding="md" radius="md" withBorder key={post.id}>
      <CardSection>
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${post.cover_image}`}
          height={140}
          alt={post.title}
        />
      </CardSection>

      <Group justify="space-between" my="xs">
        <Text fz="sm" c="dimmed" component={Group} align="center" gap={1}>
          <IconBookmark size={14} />
          {format(new Date(post.updated_at), "MMMM dd, yyyy")}
        </Text>
        <Badge size="sm" leftSection={<IconClock size={12} />} variant="light">
          {Math.floor(post.read_time_millis / 60000)} min read
        </Badge>
      </Group>
      <Title order={3}>{post.title}</Title>
      <Group my="xs">
        {post.tags.map((tag, idx) => (
          <Badge key={idx} size="xs" variant="dot">
            {tag}
          </Badge>
        ))}
      </Group>
      <Box style={{ flex: 1 }}>
        <Text fz="sm" c="dimmed" lineClamp={4}>
          {post.summary}
        </Text>
      </Box>

      <Group align="center" mt="md">
        <Button
          style={{ flex: 1 }}
          component={Link}
          href={`/posts/${post.id}`}
          variant="light"
          color="blue"
          radius="md"
          fullWidth
          rightSection={<IconArrowRight size={14} />}
        >
          Read
        </Button>
      </Group>
    </Card>
  );
};

export default PostCard;
