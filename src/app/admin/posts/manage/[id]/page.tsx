import { Metadata } from "next";
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

const getCategoryOptions = async (): Promise<
  Array<{ id: string; name: string }>
> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/categories`
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
};
const getPostInfo = async (id: string): Promise<PostFormData> => {
  if (id === "new") return defaultPost;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/posts/${id}`
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
