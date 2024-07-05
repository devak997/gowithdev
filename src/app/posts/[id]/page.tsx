import { getPost } from "@/api/posts";
import BreadcrumbsComponent, {
  BreadcrumbItem,
} from "@/components/breadcrumbs-comp";
import CodeBlock from "@/components/code-block";
import { Container, Title, TypographyStylesProvider } from "@mantine/core";
import React from "react";
import * as prod from "react/jsx-runtime";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

type Props = {
  params: {
    id: string;
  };
};

const breadcrumbs: BreadcrumbItem[] = [{ href: "/posts", title: "Posts" }];

const getProcessedPostContent = async (content: string) => {
  const { result } = await unified()
    .use(rehypeParse, { fragment: true })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .use(rehypeReact, {
      ...production,
      components: {
        pre: CodeBlock,
      },
    })
    .process(content);

  return result as React.ReactElement;
};

const PostPage: React.FC<Props> = async ({ params: { id } }) => {
  const post = await getPost(id);

  return (
    <Container pt="md" >
      <BreadcrumbsComponent items={breadcrumbs} />
      <Title mb="md" order={1}>
        {post.title}
      </Title>
      <TypographyStylesProvider>
        {getProcessedPostContent(post.content)}
      </TypographyStylesProvider>
    </Container>
  );
};

export default PostPage;
