import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
  Text,
  Badge,
  Button,
} from "@mantine/core";
import { Post } from "./types";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  posts: Post[];
}

function TableView({ posts }: Readonly<Props>) {
  return (
    <Table verticalSpacing="md">
      <TableThead>
        <TableTr>
          <TableTh>Title</TableTh>
          <TableTh>Published At</TableTh>
          <TableTh>Tags</TableTh>
          <TableTh>Actions</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {posts.map((post) => (
          <TableTr key={post.id}>
            <TableTd>
              <Title size="h6" order={2}>
                {post.title}
              </Title>
              <Text size="xs" opacity={0.6}>
                {post.summary.slice(0, 100)}
                {post.summary.length > 100 ? "..." : ""}
              </Text>
            </TableTd>
            <TableTd>{format(post.updated_at, "yyyy-MM-dd")}</TableTd>
            <TableTd>
              {post.tags.map((tag) => (
                <Badge
                  variant="light"
                  key={tag}
                  size="xs"
                  style={{ marginRight: 5 }}
                >
                  {tag}
                </Badge>
              ))}
            </TableTd>
            <TableTd>
              <Button
                component={Link}
                href={`/admin/posts/manage/${post.id}`}
                variant="subtle"
              >
                Edit
              </Button>
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}

export default TableView;
