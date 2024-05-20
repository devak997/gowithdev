import { getPosts } from "@/api/posts";
import { Metadata } from "next";

import PostsView from "./posts-view";

export const metadata: Metadata = {
  title: "Manage Posts",
};

const ManagePostsPage = async () => {
  const posts = await getPosts();
  return <PostsView posts={posts} />;
};

export default ManagePostsPage;
