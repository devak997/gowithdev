import { Post } from "@/types";
import {
  Badge,
  Button,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Title,
} from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  posts: Post[];
}

const TableView = ({ posts }: Readonly<Props>) => {
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
              <Title order={2} size="h6">
                {post.title}
              </Title>
              <Text opacity={0.6} size="xs">
                {post.summary.slice(0, 100)}
                {post.summary.length > 100 ? "..." : ""}
              </Text>
            </TableTd>
            <TableTd>{format(post.updated_at, "yyyy-MM-dd")}</TableTd>
            <TableTd>
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  size="xs"
                  style={{ marginRight: 5 }}
                  variant="light"
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
};

export default TableView;
