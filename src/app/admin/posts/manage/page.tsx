import { Metadata } from "next";
import { Post } from "./types";
import PostsView from "./posts-view";

export const metadata: Metadata = {
  title: "Manage Posts",
};

const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  return response.json();
};

async function ManagePostsPage() {
  const posts = await getPosts();
  return <PostsView posts={posts} />;
}

export default ManagePostsPage;
