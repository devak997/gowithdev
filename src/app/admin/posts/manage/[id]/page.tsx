import { Metadata } from "next";
import ManagePostForm from "./form";
import { PostFormData } from "./types";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "New Post",
};

interface Props {
  params: {
    id: string;
  };
}

const getCategoryOptions = async (): Promise<
  Array<{ id: string; name: string }>
> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`,
    {
      headers: {
        cookie: cookies().toString(),
      },
    }
  );

  return response.json();
};

const defaultPost: PostFormData = {
  title: "",
  summary: "",
  category: "",
  tags: [],
  content: "",
  slug: "",
  read_time_millis: 0,
};
const getPostInfo = async (id: string): Promise<PostFormData> => {
  if (id === "new") return defaultPost;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts/${id}`,
    {
      headers: {
        cookie: cookies().toString(),
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch post | ${response.statusText} | ${await response.text()}`
    );
  }

  return response.json();
};

async function ManagePostPage(props: Readonly<Props>) {
  const post = await getPostInfo(props.params.id);
  const categories = await getCategoryOptions();

  return (
    <ManagePostForm
      data={post}
      categories={categories.map((category) => ({
        value: category.id,
        label: category.name,
      }))}
      isNew={props.params.id === "new"}
    />
  );
}

export default ManagePostPage;
