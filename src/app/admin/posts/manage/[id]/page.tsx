import { getApiUrl } from "@/api/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";

import ManagePostForm from "./form";
import { PostFormData } from "./types";

export const metadata: Metadata = {
  title: "New Post",
};

interface Props {
  params: {
    id: string;
  };
}

type Category = {
  id: string;
  name: string;
};

const getCategoryOptions = async (): Promise<Category[]> => {
  const response = await fetch(getApiUrl("/api/admin/categories"), {
    headers: {
      cookie: cookies().toString(),
    },
  });

  return response.json() as Promise<Category[]>;
};

const defaultPost: PostFormData = {
  category: "",
  content: "",
  cover_image: "",
  read_time_millis: 0,
  slug: "",
  summary: "",
  tags: [],
  title: "",
};
const getPostInfo = async (id: string): Promise<PostFormData> => {
  if (id === "new") return defaultPost;

  const response = await fetch(getApiUrl(`/api/admin/posts/${id}`), {
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch post | ${response.statusText} | ${await response.text()}`
    );
  }

  return response.json() as Promise<PostFormData>;
};

const ManagePostPage = async (props: Readonly<Props>) => {
  const post = await getPostInfo(props.params.id);
  const categories = await getCategoryOptions();

  return (
    <ManagePostForm
      categories={categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))}
      data={post}
      postId={props.params.id}
    />
  );
};

export default ManagePostPage;
